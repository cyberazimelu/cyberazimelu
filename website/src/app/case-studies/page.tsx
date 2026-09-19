import Link from "next/link";

const caseStudies = [
  {
    number: "CASE STUDY 001",
    title: "MySQL Access Control Exposure",
    category: "Network VAPT",
    description:
      "An authorized network security assessment identified externally reachable MySQL service exposure and an overly broad firewall access control rule.",
    details: [
      "Assessment type: Authorized Network VAPT",
      "Primary area: Network access control",
      "Service assessed: MySQL",
      "Assessment period: May 2026",
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[#06111f] text-white">
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-28 sm:px-10 lg:px-12">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#00b3a6]">
            CASE STUDIES
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Security findings grounded in real assessments.
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            A selection of authorized security assessment work demonstrating
            how weaknesses can be identified, documented, and validated in
            real digital environments.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12">
          {caseStudies.map((study) => (
            <article
              key={study.number}
              className="rounded-3xl border border-white/10 bg-[#081727] p-8 sm:p-10 lg:p-12"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#00b3a6]">
                    {study.number}
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                    {study.title}
                  </h2>
                </div>

                <span className="w-fit rounded-full border border-[#00b3a6]/30 bg-[#00b3a6]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#00b3a6]">
                  {study.category}
                </span>
              </div>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
                {study.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {study.details.map((detail) => (
                  <div
                    key={detail}
                    className="border-t border-white/10 pt-4 text-sm leading-6 text-slate-400"
                  >
                    {detail}
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-white/10 bg-[#06111f] p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#00b3a6]">
                  Finding
                </p>

                <h3 className="mt-3 text-xl font-semibold">
                  Broad network access to a database service
                </h3>

                <p className="mt-4 max-w-3xl leading-7 text-slate-400">
                  The assessment identified a MySQL service exposed through
                  TCP port 3306 with a firewall access control rule allowing
                  traffic from 0.0.0.0/0. This represented an unnecessarily
                  broad network exposure for a database service.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#00b3a6] px-6 py-3 text-sm font-semibold text-[#06111f] transition hover:opacity-90"
                >
                  DISCUSS AN ASSESSMENT
                </Link>

                <Link
                  href="/secure"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#00b3a6]/60 hover:text-[#00b3a6]"
                >
                  EXPLORE SECURITY SERVICES
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
        <div className="rounded-3xl border border-[#00b3a6]/20 bg-[#081727] p-8 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#00b3a6]">
            RESPONSIBLE DISCLOSURE
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Security work should be conducted with authorization and care.
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
            Case studies are presented at a level appropriate for demonstrating
            security experience without exposing confidential client
            information or unnecessary technical details.
          </p>
        </div>
      </section>
    </main>
  );
}