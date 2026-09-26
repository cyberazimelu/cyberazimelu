import Image from "next/image";
import Link from "next/link";

const credentials = [
  "CISSP",
  "CISM",
  "CEH v12",
  "CompTIA Security+",
];

const focusAreas = [
  "Network VAPT",
  "Penetration Testing",
  "Application Security",
  "Web & API Security",
  "Cloud Security",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050d19] text-white">
      {/* INTRODUCTION */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="page-grid-bg pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"

        />

        <div className="pointer-events-none absolute -right-32 top-16 h-96 w-96 rounded-full bg-[#00b3a6]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-28 sm:px-10 lg:px-12 lg:pb-28">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#39d1c1]" />

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#39d1c1]">
                ABOUT
              </p>
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.03em] text-[#f0f4f4] sm:text-5xl lg:text-6xl">
              Technology built with security in mind.
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[#91a1a7] sm:text-lg">
              PM AZIMELU TECHNOLOGIES is a technology company focused on
              building digital systems and helping organizations secure them.
            </p>

            <p className="mt-5 max-w-3xl text-base leading-8 text-[#71838a] sm:text-lg">
              We bring together digital development and cybersecurity to help
              businesses create technology that is practical, usable, and
              security-conscious from the start.
            </p>
          </div>
        </div>
      </section>

      {/* BUILD / SECURE */}
      <section className="border-b border-white/10 bg-[#071526]">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:px-12 lg:py-24">
          <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a1c31] p-8 transition duration-300 hover:-translate-y-1 hover:border-[#39d1c1]/35 hover:bg-[#0d243b] sm:p-10">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#39d1c1]/[0.04] blur-3xl" />

            <div className="relative">
              <div className="mb-7 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#39d1c1]">
                  BUILD
                </p>

                <span className="h-1.5 w-1.5 rounded-full bg-[#39d1c1]" />
              </div>

              <h2 className="text-2xl font-semibold text-[#f0f4f4]">
                Create digital systems that work.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#91a1a7]">
                From professional websites to web applications, mobile
                experiences, and custom digital solutions, we focus on
                building technology around real business requirements.
              </p>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a1c31] p-8 transition duration-300 hover:-translate-y-1 hover:border-[#39d1c1]/35 hover:bg-[#0d243b] sm:p-10">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#39d1c1]/[0.04] blur-3xl" />

            <div className="relative">
              <div className="mb-7 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#39d1c1]">
                  SECURE
                </p>

                <span className="relative flex h-4 w-4 items-center justify-center">
                  <span className="absolute h-4 w-4 rounded-full border border-[#39d1c1]/30" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#39d1c1]" />
                </span>
              </div>

              <h2 className="text-2xl font-semibold text-[#f0f4f4]">
                Understand and reduce digital exposure.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#91a1a7]">
                Through authorized security assessments, VAPT, penetration
                testing, application security, network security, and
                cybersecurity services, we help organizations understand their
                security posture.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* FOUNDER / LEADERSHIP */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          {/* FOUNDER IMAGE */}
          <div className="mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#071526] p-3 shadow-2xl shadow-black/25">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#050d19]">
                <Image
                  src="/brand/PMAT-CEO.jpeg"
                  alt="Peter Majesty Azimelu, Founder of PM AZIMELU TECHNOLOGIES"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover object-center"
                />
              </div>

              <div className="flex items-center justify-between px-3 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39d1c1]">
                    FOUNDER
                  </p>

                  <p className="mt-1 text-sm text-[#71838a]">
                    PM AZIMELU TECHNOLOGIES
                  </p>
                </div>

                <span
                  className="h-2 w-2 rounded-full bg-[#39d1c1]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* LEADERSHIP PROFILE */}
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#39d1c1] sm:text-sm">
              LEADERSHIP
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#f0f4f4] sm:text-5xl lg:text-4xl">
              Peter Majesty Azimelu
            </h2>

            <p className="mt-5 text-sm font-medium uppercase tracking-[0.14em] text-[#71838a] sm:text-base sm:tracking-[0.18em]">
              Founder вЂ” PM AZIMELU TECHNOLOGIES
            </p>

            <div className="mt-8 space-y-5 text-base leading-8 text-[#d5dfe1] sm:text-lg">
              <p>
                Peter Majesty Azimelu is a cybersecurity consultant, security
                researcher, and technology professional focused on building
                digital systems and helping organizations secure them.
              </p>

              <p className="text-[#91a1a7]">
                As the founder of PM AZIMELU TECHNOLOGIES, he brings together
                digital development and cybersecurity to help businesses create
                technology that is practical, resilient, and security-conscious.
              </p>

              <p className="text-[#91a1a7]">
                His professional focus includes network VAPT, penetration
                testing, application security, web and API security, cloud
                security, and infrastructure security.
              </p>
            </div>

            {/* CREDENTIALS */}
            <div className="mt-8 flex flex-wrap gap-3">
              {credentials.map((credential) => (
                <span
                  key={credential}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-[#d5dfe1] transition hover:border-[#39d1c1]/30 hover:text-[#74e2d4]"
                >
                  {credential}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE + APPROACH */}
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-12 lg:pb-24">
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          {/* AREAS OF EXPERTISE */}
          <div className="rounded-3xl border border-white/10 bg-[#071526] p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#39d1c1]">
              FOCUS
            </p>

            <h3 className="mt-4 text-2xl font-semibold text-[#f0f4f4]">
              Areas of expertise
            </h3>

            <div className="mt-7 space-y-4">
              {focusAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#39d1c1]"
                    aria-hidden="true"
                  />

                  <span className="text-base text-[#d5dfe1]">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* APPROACH */}
          <div className="relative overflow-hidden rounded-3xl border border-[#39d1c1]/20 bg-[#071526] p-8 sm:p-12">
            <div
              className="page-grid-bg-secondary pointer-events-none absolute inset-0 opacity-25"
              aria-hidden="true"
            />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#39d1c1]">
                OUR APPROACH
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-[#f0f4f4] sm:text-4xl">
                Build thoughtfully. Secure deliberately.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-[#91a1a7] sm:text-lg">
                Technology and security should not be treated as completely
                separate concerns. We approach digital projects with both
                functionality and security in mind, helping businesses move
                from idea to implementation with greater awareness of the risks
                and requirements involved.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link
                  href="/build"
                  className="inline-flex items-center justify-center rounded-full bg-[#39d1c1] px-6 py-3 text-sm font-semibold text-[#050d19] transition hover:bg-[#74e2d4]"
                >
                  EXPLORE BUILD
                </Link>

                <Link
                  href="/secure"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-white transition hover:border-[#39d1c1]/60 hover:text-[#74e2d4]"
                >
                  EXPLORE SECURITY
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-white transition hover:border-[#39d1c1]/60 hover:text-[#74e2d4]"
                >
                  CONTACT US
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}