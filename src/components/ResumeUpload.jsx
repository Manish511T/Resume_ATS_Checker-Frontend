import { useRef, useState } from "react";
import { FileText, UploadCloud, X } from "lucide-react";

export const MAX_SIZE_MB = 5;

export function validatePdf(file) {
  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) return "Only PDF files are supported.";
  if (file.size > MAX_SIZE_MB * 1024 * 1024) return `The file is larger than ${MAX_SIZE_MB} MB.`;
  if (file.size === 0) return "The file is empty.";
  return "";
}

const formatSize = (b) => (b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 / 1024).toFixed(2)} MB`);

export default function ResumeUpload({ file, onSelect, onRemove, error, disabled }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const pick = (f) => { if (f) onSelect(f); };

  return (
    <div>
      <span className="mb-2 block text-sm font-semibold">Resume (PDF)</span>
      {file ? (
        <div className="flex items-center gap-3 rounded-xl border border-pine-100 bg-white p-4">
          <FileText className="h-8 w-8 shrink-0 text-pine-700" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{file.name}</p>
            <p className="text-sm text-ink/60">{formatSize(file.size)}</p>
          </div>
          <button type="button" onClick={onRemove} disabled={disabled} aria-label="Remove file" className="rounded-lg p-2 hover:bg-pine-50 disabled:opacity-50">
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); if (!disabled) pick(e.dataTransfer.files?.[0]); }}
          className={`flex flex-col items-center rounded-xl border-2 border-dashed p-8 text-center transition-colors ${dragging ? "border-pine-600 bg-pine-50" : "border-pine-100 bg-white"}`}
        >
          <UploadCloud className="h-10 w-10 text-pine-600" />
          <p className="mt-3 font-medium">Drag and drop your resume here</p>
          <p className="text-sm text-ink/60">PDF only, up to {MAX_SIZE_MB} MB</p>
          <button type="button" disabled={disabled} onClick={() => inputRef.current?.click()} className="mt-4 rounded-lg border border-pine-700 px-4 py-2 text-sm font-semibold text-pine-700 hover:bg-pine-50 disabled:opacity-50">
            Choose PDF
          </button>
        </div>
      )}
      <input ref={inputRef} type="file" accept="application/pdf,.pdf" className="hidden"
        onChange={(e) => { pick(e.target.files?.[0]); e.target.value = ""; }} />
      {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
      <p className="mt-2 text-xs text-ink/55">
        These checks only make uploading smoother. The backend must still enforce file type, size, and safety rules.
      </p>
    </div>
  );
}
