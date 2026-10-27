import LoadingState from "./LoadingState.jsx";
import ErrorMessage from "./ErrorMessage.jsx";

export default function JobDescriptionSelect({ jobs, loading, error, selectedId, onChange, onRetry, disabled }) {
  if (loading) return <LoadingState message="Loading job descriptions..." />;
  if (error) return <ErrorMessage message={error} onRetry={onRetry} />;
  if (jobs.length === 0) {
    return <p className="rounded-xl bg-amber-500/10 p-4 text-sm text-ink/80">No job descriptions are available yet. Add some in the Django admin, then reload this page.</p>;
  }
  const selected = jobs.find((j) => String(j.id) === String(selectedId));
  return (
    <div>
      <label htmlFor="job" className="mb-2 block text-sm font-semibold">Target job role</label>
      <select
        id="job" value={selectedId} disabled={disabled} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-pine-100 bg-white px-4 py-3 focus:border-pine-600 focus:outline-none focus:ring-4 focus:ring-pine-600/20 disabled:opacity-60"
      >
        <option value="">Select a job role</option>
        {jobs.map((j) => <option key={j.id} value={j.id}>{j.job_title}</option>)}
      </select>
      {selected?.job_descriptions && (
        <p className="mt-3 text-sm text-ink/65">{selected.job_descriptions.length > 240 ? selected.job_descriptions.slice(0, 240) + "..." : selected.job_descriptions}</p>
      )}
    </div>
  );
}
