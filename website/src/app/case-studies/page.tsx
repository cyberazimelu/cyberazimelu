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
    <main className="min-h-screen bg-[#050d19] text-white">
      {/* INTRO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(57,209,193,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(57,209,193,0.035) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="pointer-events-none absolute -right-32 top-16 h-96 w-96 rounded-full bg-[#00b3a6]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-28 sm:px-10 lg:px-12 lg:pb-28">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#39d1c1]" />

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#39d1c1]">
                CASE STUDIES
              </p>
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.03em] text-[#f0f4f4] sm:text-5xl lg:text-6xl">
              Security findings grounded in real assessments.
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[#91a1a7] sm:text-lg">
              A selection of authorized security assessment work demonstrating
              how weaknesses can be identified, documented, and validated in
              real digital environments.
            </p>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="border-b border-white/10 bg-[#071526]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
          {caseStudies.map((study) => (
            <article
              key={study.number}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a1c31] p-8 sm:p-10 lg:p-12"
            >
              <div
                className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#39d1c1]/[0.04] blur-3xl"
                aria-hidden="true"
              />

              <div className="relative">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#39d1c1]" />

                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#39d1c1]">
                        {study.number}
                      </p>
                    </div>

                    <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#f0f4f4] sm:text-4xl">
                      {study.title}
                    </h2>
                  </div>

                  <span className="w-fit rounded-full border border-[#39d1c1]/30 bg-[#39d1c1]/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#39d1c1]">
                    {study.category}
                  </span>
                </div>

                <p className="mt-8 max-w-3xl text-base leading-8 text-[#d5dfe1] sm:text-lg">
                  {study.description}
                </p>

                <div className="mt-10 grid overflow-hidden rounded-2xl border border-white/10 bg-[#071526] sm:grid-cols-2 lg:grid-cols-4">
                  {study.details.map((detail, index) => (
                    <div
                      key={detail}
                      className={`p-5 text-sm leading-6 text-[#91a1a7] ${
                        index !== 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""
                      }`}
                    >
                      {detail}
                    </div>
                  ))}
                </div>

                {/* FINDING */}
                <div className="mt-8 rounded-2xl border border-[#39d1c1]/15 bg-[#050d19] p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#39d1c1]" />

                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#39d1c1]">
                      FINDING
                    </p>
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-[#f0f4f4]">
                    Broad network access to a database service
                  </h3>

                  <p className="mt-4 max-w-3xl text-base leading-8 text-[#91a1a7]">
                    The assessment identified a MySQL service exposed through
                    TCP port 3306 with a firewall access control rule allowing
                    traffic from 0.0.0.0/0. This represented an unnecessarily
                    broad network exposure for a database service.
                  </p>
                </div>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-[#39d1c1] px-7 py-3.5 text-sm font-semibold text-[#050d19] transition hover:bg-[#74e2d4]"
                  >
                    DISCUSS AN ASSESSMENT
                  </Link>

                  <Link
                    href="/secure"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.02] px-7 py-3.5 text-sm font-semibold text-white transition hover:border-[#39d1c1]/60 hover:text-[#74e2d4]"
                  >
                    EXPLORE SECURITY SERVICES
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* RESPONSIBLE DISCLOSURE */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-[#39d1c1]/20 bg-[#071526] p-8 sm:p-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(57,209,193,0.06) 1px, transparent 1px), linear-gradient(45deg, rgba(57,209,193,0.025) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#39d1c1]">
              RESPONSIBLE DISCLOSURE
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-[#f0f4f4] sm:text-4xl">
              Security work should be conducted with authorization and care.
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-[#91a1a7] sm:text-lg">
              Case studies are presented at a level appropriate for
              demonstrating security experience without exposing confidential
              client information or unnecessary technical details.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}