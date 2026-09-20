import Link from "next/link";
import ContactForm from "./contact-form";

const enquiryTypes = [
  {
    title: "BUILD",
    description:
      "Website development, web applications, mobile applications, UI/UX, or custom digital solutions.",
  },
  {
    title: "SECURE",
    description:
      "VAPT, penetration testing, web/API security, network security, infrastructure security, or cybersecurity training.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#06111f] text-white">
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-28 sm:px-10 lg:px-12">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#00b3a6]">
            CONTACT
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s build something secure.
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            Whether you need a digital product built or your existing
            environment assessed, tell us what you are working on and we&apos;ll
            take it from there.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-px px-6 sm:grid-cols-2 sm:px-10 lg:px-12">
          {enquiryTypes.map((type) => (
            <article
              key={type.title}
              className="border border-white/10 bg-[#081727] p-8 sm:p-10"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#00b3a6]">
                {type.title}
              </p>

              <p className="mt-5 max-w-xl leading-8 text-slate-400">
                {type.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#00b3a6]">
              START A CONVERSATION
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Tell us what you need.
            </h2>

            <p className="mt-5 max-w-lg leading-8 text-slate-400">
              Share a few details about your project, security requirement, or
              business challenge. We can then understand the scope and discuss
              the appropriate next step.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#081727] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#00b3a6]">
                EMAIL
              </p>

              <a
                href="mailto:info@pmazimelutechnologies.com"
                className="mt-3 block break-all text-lg font-medium text-white transition hover:text-[#00b3a6]"
              >
                info@pmazimelutechnologies.com
              </a>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                For project enquiries, security assessments, partnerships, and
                general business enquiries.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-12">
        <div className="rounded-3xl border border-[#00b3a6]/20 bg-[#081727] p-8 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#00b3a6]">
            BUILD. SECURE. MOVE FORWARD.
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Technology should help your business move forward with confidence.
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
            Start with a conversation about what you are trying to build,
            protect, or improve.
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="text-sm font-semibold text-[#00b3a6] transition hover:text-white"
            >
              BACK TO HOME →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}