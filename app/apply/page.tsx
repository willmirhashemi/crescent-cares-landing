'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const TOTAL = 5;
const STORAGE_KEY = 'crescent-application';

// All the answers we collect across the flow. One object, saved on every Continue.
type FormData = {
  name: string;
  email: string;
  code: string;
  orgName: string;
  ein: string;
  state: string;
  zip: string;
  proceed: 'scratch' | 'upload' | '';
  details: string;
};

const EMPTY: FormData = {
  name: '',
  email: '',
  code: '',
  orgName: '',
  ein: '',
  state: '',
  zip: '',
  proceed: '',
  details: '',
};

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
];

/* ---------- Small presentational pieces ---------- */

function Progress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex w-[202px] items-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-2 flex-1 rounded-full transition-colors ${
            i < current ? 'bg-[#d2b4fe]' : 'bg-[#2e4c54]'
          }`}
        />
      ))}
    </div>
  );
}

const inputClass =
  'h-12 w-full rounded-xl bg-[#2a4248] px-3 text-[16px] tracking-[0.2px] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#d2b4fe]';

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex w-full flex-col gap-3.5">
      <span className="flex items-center gap-3.5 text-[16px] text-[#fefefe]">
        {label}
        {optional && <span className="text-[14px] text-white/40">Optional</span>}
      </span>
      {children}
    </label>
  );
}

// Six-box verification code input with auto-advance / backspace handling.
function CodeInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = value.padEnd(6, ' ').slice(0, 6).split('');

  function setDigit(i: number, d: string) {
    const next = digits.map((c) => (c === ' ' ? '' : c));
    next[i] = d;
    onChange(next.join(''));
    if (d && i < 5) refs.current[i + 1]?.focus();
  }

  return (
    <div className="flex w-full items-start gap-2">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          inputMode="numeric"
          maxLength={1}
          value={d.trim()}
          onChange={(e) => setDigit(i, e.target.value.replace(/\D/g, '').slice(-1))}
          onKeyDown={(e) => {
            if (e.key === 'Backspace' && !digits[i].trim() && i > 0)
              refs.current[i - 1]?.focus();
          }}
          className="h-12 w-full min-w-0 flex-1 rounded-xl bg-[#2a4248] text-center text-[18px] text-white focus:outline-none focus:ring-2 focus:ring-[#d2b4fe]"
        />
      ))}
    </div>
  );
}

/* ---------- The wizard ---------- */

export default function ApplyWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0-indexed: 0..4
  const [data, setData] = useState<FormData>(EMPTY);
  const [done, setDone] = useState(false);

  // Restore saved progress, and allow deep-linking to a step via ?step=N.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setData({ ...EMPTY, ...JSON.parse(saved) });
    } catch {
      /* ignore malformed storage */
    }
    const s = parseInt(
      new URLSearchParams(window.location.search).get('step') ?? '',
      10,
    );
    if (!Number.isNaN(s) && s >= 1 && s <= TOTAL) setStep(s - 1);
  }, []);

  function update(patch: Partial<FormData>) {
    setData((d) => ({ ...d, ...patch }));
  }

  // Continue: persist the data, then move to the next step (or finish).
  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    if (step < TOTAL - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
      // In a real app you'd POST `data` to your API / database here.
    }
  }

  function handleBack() {
    if (step === 0) router.push('/');
    else setStep((s) => s - 1);
  }

  const titles = [
    "What's your name?",
    "What's your email?",
    'Confirm your email code',
    'Enter company details',
    'We just need a few more details about your organization',
  ];

  return (
    <main className="min-h-screen w-full bg-[#263c42] text-white antialiased">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 sm:px-12 lg:px-[200px]">
        <Link href="/" aria-label="Crescent Cares home">
          <img
            src="/crescent/logo.svg"
            alt="Crescent Cares"
            width={190}
            height={24}
            className="h-6 w-auto"
          />
        </Link>
        <Link
          href="/login"
          className="rounded-md border-[0.75px] border-[#314047] bg-[#2a4248] px-3 py-2 text-[16px] text-white backdrop-blur-[15px] transition hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d2b4fe] focus-visible:ring-offset-2 focus-visible:ring-offset-[#263c42]"
        >
          Login
        </Link>
      </header>

      <div className="mx-auto flex w-full max-w-[463px] flex-col items-center gap-9 px-6 pb-20 pt-24">
        {/* Progress + title */}
        <div className="flex w-full flex-col items-center gap-6">
          <Progress current={step + 1} total={TOTAL} />
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-[14px] font-light leading-[1.4] text-white/50">
              Step {step + 1} of {TOTAL}
            </p>
            <h1 className="max-w-[520px] text-balance text-[28px] font-semibold leading-[1.2] text-white sm:text-[32px]">
              {done ? 'Application saved 🎉' : titles[step]}
            </h1>
          </div>
        </div>

        {done ? (
          /* Completion state — shows the saved data */
          <div className="flex w-full flex-col gap-6">
            <p className="text-center text-[16px] text-white/70">
              Thanks{data.name ? `, ${data.name}` : ''} — we&rsquo;ve saved your
              application.
            </p>
            <pre className="w-full overflow-x-auto rounded-xl bg-[#2a4248] p-4 text-[13px] text-white/80">
              {JSON.stringify(data, null, 2)}
            </pre>
            <div className="flex justify-center">
              <Link
                href="/"
                className="rounded-lg bg-[#e2f1e7] px-5 py-3 text-[16px] text-[#263c42] transition hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d2b4fe] focus-visible:ring-offset-2 focus-visible:ring-offset-[#263c42]"
              >
                Back to home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleContinue} className="flex w-full flex-col gap-10">
            {/* Step body */}
            <div className="flex w-full flex-col gap-3">
              {step === 0 && (
                <input
                  autoFocus
                  required
                  type="text"
                  placeholder="Enter your name"
                  value={data.name}
                  onChange={(e) => update({ name: e.target.value })}
                  className={inputClass}
                />
              )}

              {step === 1 && (
                <input
                  autoFocus
                  required
                  type="email"
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={(e) => update({ email: e.target.value })}
                  className={inputClass}
                />
              )}

              {step === 2 && (
                <div className="flex w-full flex-col gap-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[16px] text-[#fefefe]">Code</span>
                    <button
                      type="button"
                      className="flex items-center gap-2 text-[16px] text-white/55 hover:text-white"
                    >
                      Resend
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 10a8 8 0 0 0-14.9-3M4 14a8 8 0 0 0 14.9 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                  <CodeInput value={data.code} onChange={(code) => update({ code })} />
                </div>
              )}

              {step === 3 && (
                <div className="flex w-full flex-col gap-3">
                  <Field label="Organization Name" optional>
                    <input
                      type="text"
                      value={data.orgName}
                      onChange={(e) => update({ orgName: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="EIN" optional>
                    <input
                      type="text"
                      placeholder="12-3456789"
                      value={data.ein}
                      onChange={(e) => update({ ein: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <div className="flex items-start gap-4">
                    <Field label="State">
                      <select
                        value={data.state}
                        onChange={(e) => update({ state: e.target.value })}
                        className={`${inputClass} ${data.state ? '' : 'text-white/50'}`}
                      >
                        <option value="">Select</option>
                        {US_STATES.map((s) => (
                          <option key={s} value={s} className="text-white">
                            {s}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Zip Code">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={data.zip}
                        onChange={(e) => update({ zip: e.target.value })}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="mt-6 flex w-full flex-col gap-6 sm:mt-12">
                  {/* Assistant message bubble */}
                  <div className="max-w-[85%] self-start rounded-xl rounded-bl-none bg-[#2e4c54] px-4 py-2.5 text-[16px] text-white">
                    Before we get started, how would you like to proceed?
                  </div>

                  {/* Composer: options + answer box */}
                  <div className="flex flex-col gap-1 rounded-2xl bg-[#2e4c54] p-1">
                    <p className="px-4 pb-1 pt-2 text-left text-[14px] font-light text-white/50">
                      Select one
                    </p>
                    {(
                      [
                        ['scratch', 'Start from scratch'],
                        ['upload', 'Upload a document or supporting info'],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => update({ proceed: value })}
                        className={`rounded-xl px-4 py-3 text-left text-[16px] text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d2b4fe] ${
                          data.proceed === value
                            ? 'bg-[#2c464d]'
                            : 'hover:bg-[#2c464d]'
                        }`}
                      >
                        {label}
                      </button>
                    ))}

                    {/* Answer box with Back / mic / send */}
                    <div className="flex min-h-[112px] flex-col justify-between rounded-xl bg-[#2a4248] p-4">
                      <textarea
                        rows={2}
                        placeholder="Type your answer"
                        value={data.details}
                        onChange={(e) => update({ details: e.target.value })}
                        className="w-full flex-1 resize-none bg-transparent text-[16px] text-white placeholder:text-white/50 focus:outline-none"
                      />
                      <div className="flex items-center justify-between pt-3">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="cursor-pointer text-[16px] font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
                        >
                          Back
                        </button>
                        <div className="flex items-center gap-5">
                          <button
                            type="button"
                            aria-label="Voice input"
                            className="text-white/70 hover:text-white"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                              <rect x="9" y="2" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="2" />
                              <path d="M5 11a7 7 0 0 0 14 0M12 18v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </button>
                          <button
                            type="submit"
                            aria-label="Send"
                            className="grid size-9 place-items-center rounded-lg bg-[#e2f1e7] transition hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d2b4fe] focus-visible:ring-offset-2 focus-visible:ring-offset-[#263c42]"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                              <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" stroke="#263c42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer nav — steps 1-4 only; step 5's Back/Send live in the composer */}
            {step !== TOTAL - 1 && (
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="rounded-lg bg-[#2c464d] px-5 py-3 text-[16px] text-white backdrop-blur-[15px] transition hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d2b4fe] focus-visible:ring-offset-2 focus-visible:ring-offset-[#263c42]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#e2f1e7] px-5 py-3 text-[16px] text-[#263c42] backdrop-blur-[15px] transition hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d2b4fe] focus-visible:ring-offset-2 focus-visible:ring-offset-[#263c42]"
                >
                  Continue
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
