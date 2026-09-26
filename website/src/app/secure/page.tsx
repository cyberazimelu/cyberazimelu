import Link from "next/link";

const securityServices = [
  {
    title: "Vulnerability Assessment & Penetration Testing",
    description:
      "Authorized security assessments designed to identify weaknesses across networks, applications, systems, and digital infrastructure.",
  },
  {
    title: "Web Application Security",
    description:
      "Security testing for web applications to identify weaknesses in authentication, authorization, input handling, business logic, and other attack surfaces.",
  },
  {
    title: "Network Security",
    description:
      "Assessment of network exposure, services, access controls, segmentation, configurations, and externally reachable attack surfaces.",
  },
  {
    title: "API & Backend Security",
    description:
      "Security testing of APIs and backend services, including authentication, authorization, input validation, access control, and business logic.",
  },
  {
    title: "Infrastructure Security",
    description:
      "Security assessment of servers, infrastructure components, configurations, access controls, and supporting digital environments.",
  },
  {
    title: "Cybersecurity Training",
    description:
      "Practical cybersecurity training designed to strengthen security awareness, technical understanding, and defensive capability.",
  },
];

export default function SecurePage() {
  return (
    <main className="min-h-screen bg-[#050d19] text-white">
      {/* INTRO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="page-grid-bg pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute -right-32 top-16 h-96 w-96 rounded-full bg-[#00b3a6]/10 blur-3xl" />

        <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full border border-[#39d1c1]/10" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-28 sm:px-10 lg:px-12 lg:pb-28">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#39d1c1]" />

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#39d1c1]">
                SECURE
              </p>
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.03em] text-[#f0f4f4] sm:text-5xl lg:text-6xl">
              Understand your exposure. Strengthen your security.
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[#91a1a7] sm:text-lg">
              We help organizations identify weaknesses across their digital
              environments through authorized security assessments, penetration
              testing, application security, network security, and practical
              cybersecurity services.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#39d1c1] px-7 py-3.5 text-sm font-semibold text-[#050d19] transition hover:bg-[#74e2d4]"
              >
                SECURE YOUR BUSINESS
              </Link>

              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.02] px-7 py-3.5 text-sm font-semibold text-white transition hover:border-[#39d1c1]/60 hover:text-[#74e2d4]"
              >
                VIEW CASE STUDIES
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY SERVICES */}
      <section className="relative border-b border-white/10 bg-[#071526]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#39d1c1]">
              SECURITY SERVICES
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#f0f4f4] sm:text-4xl">
              Identify weaknesses. Understand exposure. Improve resilience.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {securityServices.map((service, index) => (
              <article
                key={service.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a1c31] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#39d1c1]/40 hover:bg-[#0d243b]"
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#39d1c1]/[0.04] blur-2xl transition group-hover:bg-[#39d1c1]/[0.09]" />

                <div className="relative">
                  <div className="mb-7 flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-[0.2em] text-[#71838a]">
                      0{index + 1}
                    </span>

                    <span className="relative flex h-4 w-4 items-center justify-center">
                      <span className="absolute h-4 w-4 rounded-full border border-[#39d1c1]/30" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#39d1c1]" />
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-[#f0f4f4]">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#91a1a7]">
                    {service.description}
                  </p>

                  <div className="mt-7 h-px w-full bg-white/10 transition group-hover:bg-[#39d1c1]/30" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY WITH PURPOSE */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-[#39d1c1]/20 bg-[#071526] p-8 sm:p-12 lg:p-14">
          <div
            className="page-grid-bg-secondary pointer-events-none absolute inset-0 opacity-30"
            aria-hidden="true"
          />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#39d1c1]">
              SECURITY WITH PURPOSE
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-[#f0f4f4] sm:text-4xl">
              Security starts with understanding what is exposed.
            </h2>

            <p className="mt-5 max-w-3xl leading-8 text-[#91a1a7]">
              Our security work focuses on authorized testing, evidence-based
              findings, and practical understanding of the systems being
              assessed. The goal is to help organizations make informed
              security decisions about their digital environments.
            </p>

            <div className="mt-9">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#39d1c1] transition hover:text-white"
              >
                DISCUSS A SECURITY ASSESSMENT
                <span aria-hidden="true">в†’</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}