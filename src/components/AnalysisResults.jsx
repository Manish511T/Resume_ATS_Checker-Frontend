import { Briefcase, Layers } from "lucide-react";

function parseRank(rank) {
  const n = parseFloat(String(rank ?? "").replace("%", ""));
  return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : null;
}
const toList = (v) => (Array.isArray(v) ? v.filter(Boolean) : []);
const Missing = () => <p className="text-sm text-ink/55">Not provided in the analysis.</p>;

function Card({ title, icon: Icon, children }) {
  return (
    <section className="rounded-2xl border border-pine-100 bg-white p-6">
      <h3 className="mb-4 flex items-center gap-2 font-semibold">{Icon && <Icon className="h-5 w-5 text-pine-600" />}{title}</h3>
      {children}
    </section>
  );
}

export default function AnalysisResults({ result }) {
  const rank = parseRank(result.rank);
  const skills = toList(result.skills);
  const categories = toList(result.project_category);
  const experience = result.total_experience;
  const hasExp = experience !== undefined && experience !== null && String(experience).trim() !== "";

  return (
    <div id="results" className="mt-10 space-y-5">
      <h2 className="font-display text-2xl font-bold text-pine-900">Your analysis</h2>

      <Card title="Resume relevance score">
        {rank === null ? <Missing /> : (
          <>
            <p className="font-display text-5xl font-bold text-pine-700">{rank}<span className="text-2xl text-ink/50"> / 100</span></p>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-pine-50" role="progressbar" aria-valuenow={rank} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full rounded-full bg-pine-600" style={{ width: `${rank}%` }} />
            </div>
          </>
        )}
        <p className="mt-4 text-xs text-ink/55">
          This score is an estimate written by an AI model. It is not a guaranteed ATS score, and real applicant tracking systems may rate your resume differently.
        </p>
      </Card>

      <div className="grid gap-5 sm:grid-cols-2">
        <Card title="Total experience" icon={Briefcase}>
          {hasExp ? <p className="text-2xl font-semibold">{String(experience)}{/^\d+(\.\d+)?$/.test(String(experience)) ? " years" : ""}</p> : <Missing />}
        </Card>
        <Card title="Project categories" icon={Layers}>
          {categories.length ? (
            <ul className="flex flex-wrap gap-2">
              {categories.map((c, i) => <li key={i} className="rounded-lg bg-amber-500/15 px-3 py-1.5 text-sm font-medium">{String(c)}</li>)}
            </ul>
          ) : <Missing />}
        </Card>
      </div>

      <Card title="Skills found in your resume">
        {skills.length ? (
          <ul className="flex flex-wrap gap-2">
            {skills.map((s, i) => <li key={i} className="rounded-full bg-pine-50 px-3 py-1 text-sm font-medium text-pine-700">{String(s)}</li>)}
          </ul>
        ) : <Missing />}
      </Card>
    </div>
  );
}
