import Link from 'next/link';
import { Instrument_Serif } from 'next/font/google';
import ApplicationCard from './application-card';

// The design uses "TWK Lausanne" (not freely available) for body text — we fall
// back to the app's Geist/system sans. "Instrument Serif" italic is used for the
// accented words in the headings and is available from Google Fonts.
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
});

// Accented italic serif word inside a heading.
function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className={`${serif.className} text-[#d2b4fe]`}>{children}</span>
  );
}

const steps = [
  {
    title: 'Apply',
    body: 'Tell us your mission, budget, and program. We auto-fill from public records when they exist.',
  },
  {
    title: 'Get matched',
    body: 'We line you up with vetted sponsors by mission fit, budget, and geography.',
  },
  {
    title: 'See the vetting',
    body: 'Fees, model, and track record are all checked, so you can compare with open eyes.',
  },
  {
    title: 'Go live',
    body: 'Accept an offer and your project is up and running on Crescent from day one.',
  },
];

export default function ApplicationLanding() {
  return (
    <main className="min-h-screen w-full bg-[#263c42] text-white antialiased">
      {/* ===================== HERO ===================== */}
      <section className="mx-auto w-full max-w-[1152px] px-6 pt-6 sm:px-10">
        <img
          src="/crescent/logo.svg"
          alt="Crescent Cares"
          width={190}
          height={24}
          className="h-6 w-auto"
        />

        <div className="mt-16 flex flex-col items-stretch gap-10 pb-24 lg:mt-24 lg:flex-row lg:justify-between">
          {/* Left column */}
          <div className="flex w-full max-w-[539px] flex-col justify-between gap-12">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-5">
                <h1 className="text-[40px] font-semibold leading-[1.05] tracking-[-0.015em] text-white sm:text-[54px]">
                  Find the <Accent>right fiscal sponsor</Accent> for your
                  mission.
                </h1>
                <p className="max-w-[480px] text-[18px] leading-[1.4] text-white/70">
                  Tell us about your project once. We&rsquo;ll point you to the
                  fiscal sponsors who actually fit, and show you what they charge
                  and how they work before you ever get on a call.
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {[
                  "100's of vetted fiscal sponsors",
                  'Real people, fast',
                  'No hidden costs',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <img
                      src="/crescent/check-circle.svg"
                      alt=""
                      className="h-5 w-5"
                    />
                    <span className="text-[16px] text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonial */}
            <figure className="flex max-w-[487px] flex-col gap-5">
              <blockquote className="text-[18px] leading-[1.3] text-white">
                &ldquo;We&rsquo;d spent six months cold-emailing sponsors and
                getting nowhere. Here we filled out one application and had two
                real conversations the same week.&rdquo;
              </blockquote>
              <figcaption className="flex items-center justify-between gap-5">
                <div className="flex min-w-0 items-center gap-5">
                  <img
                    src="/crescent/avatar.png"
                    alt="Maya Okonkwo"
                    className="h-8 w-8 shrink-0 rounded-full object-cover"
                  />
                  <div className="flex min-w-0 flex-col gap-2 text-[16px] leading-[1.3]">
                    <span className="text-white">Maya Okonkwo</span>
                    <span className="text-white/50">
                      Founder · Southside Youth Coding
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <span className="h-3 w-[26px] overflow-hidden rounded-full bg-[#2e4c54]">
                    <span className="block h-3 w-[26px] -translate-x-[5px] bg-[#e2f1e7]" />
                  </span>
                  <span className="h-3 w-[26px] rounded-full bg-[#2e4c54]" />
                  <span className="h-3 w-[26px] rounded-full bg-[#2e4c54]" />
                  <span className="h-3 w-[26px] rounded-full bg-[#2e4c54]" />
                </div>
              </figcaption>
            </figure>
          </div>

          {/* Right column — application card (client: routes New vs Existing) */}
          <ApplicationCard />
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="bg-[#eaeaea] py-24 text-[#263c42]">
        <div className="mx-auto w-full max-w-[1152px] px-6 sm:px-10">
          <div className="mx-auto flex max-w-[500px] flex-col items-center gap-5 text-center">
            <p className="text-[12px] text-[#1a2b32]">How it works</p>
            <h2 className="text-[36px] font-semibold leading-[1.05] tracking-[-0.015em] sm:text-[48px]">
              Get matched in hours, not weeks.
            </h2>
          </div>

          {/* Steps */}
          <div className="relative mx-auto mt-16 max-w-[1000px]">
            {/* connecting line */}
            <div className="absolute left-0 right-0 top-3 hidden h-px bg-[#c9c9c9] md:block" />
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="flex flex-col items-center gap-4 text-center"
                >
                  <span className="relative rounded-full bg-white px-2 py-1.5 text-[12px] text-[#1a2b32] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_2px_6px_rgba(165,165,165,0.06)]">
                    Step {i + 1}
                  </span>
                  <div className="flex flex-col gap-3">
                    <p className="text-[18px] text-[#263c42]">{step.title}</p>
                    <p className="text-[16px] leading-[1.3] text-[#263c42]/70">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center gap-4">
            <a
              href="#apply"
              className="rounded-lg bg-[#304c54] px-5 py-3 text-[18px] text-[#fefefe] transition hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d2b4fe] focus-visible:ring-offset-2 focus-visible:ring-offset-[#263c42]"
            >
              Apply now
            </a>
            <p className="text-[14px] tracking-[0.14px] text-black/50">
              Takes ~5 minutes
            </p>
          </div>
        </div>
      </section>

      {/* ===================== WHY PROJECTS ===================== */}
      <section className="py-24">
        <div className="mx-auto w-full max-w-[1152px] px-6 sm:px-10">
          <h2 className="max-w-[480px] text-[40px] font-semibold leading-[1.05] tracking-[-0.015em] text-white sm:text-[54px]">
            Why projects <Accent>achieve more</Accent> with us
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {/* Card 1 — matches */}
            <article className="flex flex-col gap-5">
              <div className="flex h-[322px] justify-center overflow-hidden rounded-xl bg-[#2a4248]">
                <div className="relative h-full w-[357px] shrink-0">
                <div className="absolute left-9 top-[33px] flex w-[247px] items-center gap-3 rounded-lg bg-[#263c42] px-4 py-3">
                  <img
                    src="/crescent/file-text.svg"
                    alt=""
                    className="h-5 w-5 shrink-0"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-[14px] text-white">
                      Helping Hands Foundation
                    </p>
                    <p className="text-[12px] font-light text-white/50">
                      Your application
                    </p>
                  </div>
                </div>
                <img
                  src="/crescent/union.svg"
                  alt=""
                  className="absolute left-[61px] top-[78px] h-[318px] w-[55px]"
                />
                {[
                  { name: 'Third Sector New England', meta: '8% fee · National', match: '94% Match', color: '#2eb67d', top: 'top-[115px]' },
                  { name: 'Fractured Atlas', meta: '3% fee · National', match: '87% Match', color: '#2eb67d', top: 'top-[197px]' },
                  { name: 'Once Upon A Room', meta: '3% fee · National', match: '76% Match', color: '#b69f2e', top: 'top-[279px]' },
                ].map((row) => (
                  <div key={row.name}>
                    <div className={`absolute left-[116px] ${row.top} flex w-[219px] items-center rounded-lg bg-[#2e4c54] px-4 py-3`}>
                      <div className="flex flex-col gap-2 text-left">
                        <p className="whitespace-nowrap text-[14px] text-white">
                          {row.name}
                        </p>
                        <p className="whitespace-nowrap text-[12px] font-light text-white/50">
                          {row.meta}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`absolute left-[255px] ${row.top} -mt-2.5 rounded-full px-2 py-1 text-[10px] text-white`}
                      style={{ backgroundColor: row.color }}
                    >
                      {row.match}
                    </span>
                  </div>
                ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[18px] text-[#fefefe]">
                  One application, all the matches
                </p>
                <p className="text-[16px] leading-[1.3] text-white/70">
                  Apply once and we match you with the vetted sponsors of your
                  mission, size, and region.
                </p>
              </div>
            </article>

            {/* Card 2 — real cost */}
            <article className="flex flex-col gap-5">
              <div className="flex h-[322px] justify-center overflow-hidden rounded-xl bg-[#2a4248]">
                <div className="relative h-full w-[357px] shrink-0">
                <div className="absolute left-9 top-[53px] flex w-[268px] flex-col gap-3 rounded-xl bg-[#2c464d] p-2">
                  <div className="flex flex-col gap-3 p-2">
                    <div className="flex flex-col gap-2 leading-[1.3]">
                      <p className="text-[12px] text-[#fefefe]/50">
                        Fiscal Sponsor
                      </p>
                      <p className="text-[18px] font-medium text-[#fefefe]">
                        Fractured Atlas
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 text-[12px] text-[#fefefe]">
                      {[
                        ['Min budget', '$10,000.00'],
                        ['Fee', '8%'],
                        ['Payouts', '7d'],
                      ].map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between">
                          <p>{k}</p>
                          <p>{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-center rounded-md bg-[#2e4c54] px-2.5 py-3 text-[12px] text-[#e2f1e7]">
                    Confirm
                  </div>
                </div>
                {/* magnifier over the values column: dimmed figures show through, magnified $8% on top */}
                <div className="absolute left-[198px] top-[100px] h-[200px] w-[214px]">
                  {/* dark handle */}
                  <span className="absolute left-[120px] top-[112px] h-[54px] w-[17px] origin-top rotate-[-52deg] rounded-[3px] bg-[#1a2b32]" />
                  {/* grey ferrule between lens and handle */}
                  <span className="absolute left-[105px] top-[99px] h-[20px] w-[12px] origin-top rotate-[-52deg] rounded-[2px] bg-[#d7d7d7]" />
                  {/* lens */}
                  <div className="absolute left-0 top-0 grid h-[126px] w-[126px] place-items-center rounded-full border-[3px] border-[#d7d7d7] bg-[#2c464d]/50">
                    <span className="text-[28px] font-bold text-white">$8%</span>
                  </div>
                </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[18px] text-[#fefefe]">See the real cost first</p>
                <p className="text-[16px] leading-[1.3] text-white/70">
                  Fees, minimums, and how each sponsor works, all upfront, so no
                  call is a surprise.
                </p>
              </div>
            </article>

            {/* Card 3 — match reasoning */}
            <article className="flex flex-col gap-5">
              <div className="flex h-[322px] justify-center overflow-hidden rounded-xl bg-[#2a4248]">
                <div className="relative h-full w-[357px] shrink-0">
                <div className="absolute left-1/2 top-7 flex w-[294px] -translate-x-1/2 flex-col gap-3 rounded-lg bg-[#2e4c54] p-5">
                  <div className="flex flex-col gap-2 text-center">
                    <p className="text-[12px] font-light text-white/50">
                      Matched Fiscal Sponsor
                    </p>
                    <p className="text-[16px] font-medium text-white">
                      Once Upon A Room
                    </p>
                  </div>
                  <p className="text-[14px] font-light leading-[1.35] tracking-[0.07px] text-white/50">
                    Your application was a 94% match with this Fiscal Sponsor for
                    the requirements below including the same categories.
                  </p>
                  <div className="flex flex-col">
                    {[
                      { label: 'Fee', value: '3%', note: 'You requested below 5%' },
                      { label: 'Onboarding', value: '21d', note: 'You requested <30d' },
                      { label: 'Min Budget', value: '$10k', note: 'You requested > $5k' },
                    ].map((r) => (
                      <div
                        key={r.label}
                        className="flex flex-col gap-1 border-b-[0.5px] border-white/15 py-3"
                      >
                        <div className="flex items-center justify-between text-white">
                          <p className="text-[12px]">{r.label}</p>
                          <p className="text-[14px]">{r.value}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-[12px] font-light text-white/50">
                            {r.note}
                          </p>
                          <span className="rounded-full bg-[#2eb67d] px-2 py-1 text-[10px] text-white">
                            Match
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[18px] text-[#fefefe]">
                  Match reasoning, in writing
                </p>
                <p className="text-[16px] leading-[1.3] text-white/70">
                  Every match comes with the why: what lined up, and what to ask
                  about.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="pb-24 pt-8">
        <div className="mx-auto flex w-full max-w-[539px] flex-col items-center gap-8 px-6 text-center">
          <div className="flex flex-col items-center gap-5">
            <h2 className="text-[40px] font-semibold leading-[1.05] tracking-[-0.015em] text-white sm:text-[54px]">
              Your mission <Accent>deserves</Accent> the right sponsor.
            </h2>
            <p className="max-w-[480px] text-[18px] leading-[1.4] text-white/70">
              One application, real matches, and the numbers in front of you
              before the first call. It takes about ten minutes.
            </p>
          </div>
          <a
            href="#apply"
            className="rounded-lg bg-[#e2f1e7] px-5 py-3 text-[18px] text-[#263c42] transition hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d2b4fe] focus-visible:ring-offset-2 focus-visible:ring-offset-[#263c42]"
          >
            Apply in 5 minutes
          </a>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="mx-auto w-full max-w-[1152px] px-6 sm:px-10">
        <div className="flex flex-col items-center justify-between gap-4 border-y border-white/10 py-10 text-[14px] sm:flex-row">
          <p className="text-[#55696e]">
            Copyright © 2026 Crescent Financial. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[#fefefe]">
            <Link href="#" className="hover:opacity-80">
              LinkedIn
            </Link>
            <Link href="#" className="hover:opacity-80">
              Contact Support
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
