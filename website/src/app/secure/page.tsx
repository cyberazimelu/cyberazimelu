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
    <main className="min-h-screen bg-[#06111f] text-white">
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-28 sm:px-10 lg:px-12">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#00b3a6]">
            SECURE
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Understand your exposure. Strengthen your security.
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            We help organizations identify weaknesses across their digital
            environments through authorized security assessments, penetration
            testing, application security, network security, and practical
            cybersecurity services.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#00b3a6] px-6 py-3 text-sm font-semibold text-[#06111f] transition hover:opacity-90"
            >
              SECURE YOUR BUSINESS
            </Link>

            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#00b3a6]/60 hover:text-[#00b3a6]"
            >
              VIEW CASE STUDIES
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-px px-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-3 lg:px-12">
          {securityServices.map((service) => (
            <article
              key={service.title}
              className="border border-white/10 bg-[#081727] p-7 transition hover:border-[#00b3a6]/40 hover:bg-[#0a1c2f]"
            >
              <div className="mb-6 h-1 w-12 rounded-full bg-[#00b3a6]" />

              <h2 className="text-xl font-semibold text-white">
                {service.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
        <div className="rounded-3xl border border-[#00b3a6]/20 bg-[#081727] p-8 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#00b3a6]">
            SECURITY WITH PURPOSE
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Security starts with understanding what is exposed.
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
            Our security work focuses on authorized testing, evidence-based
            findings, and practical understanding of the systems being
            assessed. The goal is to help organizations make informed security
            decisions about their digital environments.
          </p>

          <div className="mt-8">
            <Link
              href="/contact"
              className="text-sm font-semibold text-[#00b3a6] transition hover:text-white"
            >
              DISCUSS A SECURITY ASSESSMENT →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}