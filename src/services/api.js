import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000",
  timeout: 120000, // LLM analysis can be slow
});

// Turn DRF validation errors ({field: ["msg"]}) into readable text.
function formatErrors(data) {
  if (!data || typeof data !== "object") return "";
  return Object.entries(data)
    .map(([field, msgs]) => `${field}: ${[].concat(msgs).join(" ")}`)
    .join(" | ");
}

function toFriendlyError(err) {
  if (err.code === "ECONNABORTED") return "The analysis took too long. Please try again.";
  if (!err.response) return "Cannot reach the server. Check that the backend is running and CORS is configured.";
  const body = err.response.data;
  if (body && typeof body === "object" && body.message) return body.message;
  return `The server returned an error (HTTP ${err.response.status}).`;
}

const isAxiosErr = (e) => e && (e.isAxiosError || e.response || e.code);

export async function fetchJobs() {
  try {
    const { data } = await api.get("/api/jobs/");
    if (!data || data.status !== true || !Array.isArray(data.data)) {
      throw new Error("The server returned an unexpected response.");
    }
    return data.data;
  } catch (err) {
    throw new Error(isAxiosErr(err) ? toFriendlyError(err) : err.message);
  }
}

export async function analyzeResume(file, jobId) {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("job_description", jobId);
  try {
    // Axios sets the multipart boundary itself.
    const { data } = await api.post("/api/resume/", formData);
    // Backend can return HTTP 200 with status:false, so check the body too.
    if (!data || data.status !== true) {
      const detail = formatErrors(data?.data);
      throw new Error(
        data?.message === "errors" && detail ? detail : data?.message || "The analysis was unsuccessful."
      );
    }
    if (!data.data || typeof data.data !== "object" || Object.keys(data.data).length === 0) {
      throw new Error("The analysis returned no results. The PDF may not contain readable text, or the AI service failed.");
    }
    return data.data;
  } catch (err) {
    throw new Error(isAxiosErr(err) ? toFriendlyError(err) : err.message);
  }
}
