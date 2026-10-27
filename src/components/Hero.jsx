export default function Hero() {
  return (
    <section id="home" className="bg-gradient-to-b from-pine-50 to-paper">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:py-28">
        <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight text-pine-900 sm:text-6xl">
          Make Your Resume Job-Ready
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
          Pick the role you want, upload your resume as a PDF, and see how it lines up with that job description:
          the skills it shows, your estimated experience, and the kinds of projects you have done.
        </p>
        <a href="#analyze" className="mt-9 inline-block rounded-xl bg-pine-700 px-6 py-3 font-semibold text-white shadow-sm hover:bg-pine-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-pine-600/30">
          Analyze My Resume
        </a>
      </div>
    </section>
  );
}
