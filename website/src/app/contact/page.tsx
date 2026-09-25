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

        <div
          className="pointer-events-none absolute -right-32 top-16 h-96 w-96 rounded-full bg-[#00b3a6]/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-28 sm:px-10 lg:px-12 lg:pb-28">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#39d1c1]" />

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#39d1c1]">
                CONTACT
              </p>
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.03em] text-[#f0f4f4] sm:text-5xl lg:text-6xl">
              Let&apos;s build something secure.
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[#91a1a7] sm:text-lg">
              Whether you need a digital product built or your existing
              environment assessed, tell us what you are working on and
              we&apos;ll take it from there.
            </p>
          </div>
        </div>
      </section>

      {/* ENQUIRY TYPES */}
      <section className="border-b border-white/10 bg-[#071526]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#39d1c1]">
              HOW CAN WE HELP?
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#f0f4f4] sm:text-4xl">
              Start with what you need.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {enquiryTypes.map((type, index) => (
              <article
                key={type.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a1c31] p-8 transition duration-300 hover:-translate-y-1 hover:border-[#39d1c1]/40 hover:bg-[#0d243b] sm:p-10"
              >
                <div
                  className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#39d1c1]/[0.04] blur-3xl transition group-hover:bg-[#39d1c1]/[0.09]"
                  aria-hidden="true"
                />

                <div className="relative">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-[0.2em] text-[#71838a]">
                      0{index + 1}
                    </span>

                    <span className="h-1.5 w-1.5 rounded-full bg-[#39d1c1]" />
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#39d1c1]">
                    {type.title}
                  </p>

                  <p className="mt-5 max-w-xl text-base leading-8 text-[#91a1a7]">
                    {type.description}
                  </p>

                  <div className="mt-8 h-px w-full bg-white/10 transition group-hover:bg-[#39d1c1]/30" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* CONTACT INFORMATION */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#39d1c1]">
              START A CONVERSATION
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#f0f4f4] sm:text-4xl">
              Tell us what you need.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-8 text-[#91a1a7]">
              Share a few details about your project, security requirement, or
              business challenge. We can then understand the scope and discuss
              the appropriate next step.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#071526] p-7">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#39d1c1]">
                  EMAIL
                </p>

                <span className="h-1.5 w-1.5 rounded-full bg-[#39d1c1]" />
              </div>

              <a
                href="mailto:info@pmazimelutechnologies.com"
                className="mt-4 block break-all text-lg font-medium text-[#f0f4f4] transition hover:text-[#74e2d4]"
              >
                info@pmazimelutechnologies.com
              </a>

              <p className="mt-3 text-sm leading-6 text-[#71838a]">
                For project enquiries, security assessments, partnerships, and
                general business enquiries.
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="rounded-3xl border border-white/10 bg-[#071526] p-6 sm:p-8 lg:p-10">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#39d1c1]">
                PROJECT / SECURITY ENQUIRY
              </p>

              <p className="mt-3 text-sm leading-6 text-[#71838a]">
                Provide the details below and we&apos;ll review your enquiry.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-12 lg:pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-[#39d1c1]/20 bg-[#071526] p-8 sm:p-12 lg:p-14">
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
              BUILD. SECURE. MOVE FORWARD.
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-[#f0f4f4] sm:text-4xl">
              Technology should help your business move forward with
              confidence.
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-[#91a1a7] sm:text-lg">
              Start with a conversation about what you are trying to build,
              protect, or improve.
            </p>

            <div className="mt-9">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#39d1c1] transition hover:text-white"
              >
                BACK TO HOME
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}