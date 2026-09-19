import Link from "next/link";

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
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-20 sm:px-10 lg:px-12">
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

          <form
            action="mailto:info@pmazimelutechnologies.com"
            method="post"
            encType="text/plain"
            className="rounded-3xl border border-white/10 bg-[#081727] p-7 sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-200"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="Name"
                  type="text"
                  required
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#06111f] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#00b3a6]/60"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-200"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="Email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#06111f] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#00b3a6]/60"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="company"
                className="text-sm font-medium text-slate-200"
              >
                Company
              </label>

              <input
                id="company"
                name="Company"
                type="text"
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#06111f] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#00b3a6]/60"
                placeholder="Company name"
              />
            </div>

            <div className="mt-6">
              <label
                htmlFor="service"
                className="text-sm font-medium text-slate-200"
              >
                What do you need?
              </label>

              <select
                id="service"
                name="Service"
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#06111f] px-4 py-3 text-sm text-white outline-none transition focus:border-[#00b3a6]/60"
                defaultValue=""
              >
                <option value="" disabled>
                  Select an enquiry type
                </option>
                <option value="Website Development">
                  Website Development
                </option>
                <option value="Web Application Development">
                  Web Application Development
                </option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="VAPT">VAPT</option>
                <option value="Web Application Security">
                  Web Application Security
                </option>
                <option value="Network Security">Network Security</option>
                <option value="Infrastructure Security">
                  Infrastructure Security
                </option>
                <option value="Cybersecurity Training">
                  Cybersecurity Training
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mt-6">
              <label
                htmlFor="message"
                className="text-sm font-medium text-slate-200"
              >
                Message
              </label>

              <textarea
                id="message"
                name="Message"
                required
                rows={6}
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-[#06111f] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#00b3a6]/60"
                placeholder="Tell us briefly about your project or security requirement."
              />
            </div>

            <button
              type="submit"
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#00b3a6] px-6 py-3 text-sm font-semibold text-[#06111f] transition hover:opacity-90"
            >
              SEND ENQUIRY
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              Please do not include passwords, credentials, private keys, or
              other sensitive information in this form.
            </p>
          </form>
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