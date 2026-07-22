'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Instrument_Serif } from 'next/font/google';

import { ExistingData } from './types';
import StepName from './steps/step-name';
import StepEmail from './steps/step-email';
import StepCode from './steps/step-code';
import StepOrg from './steps/step-org';
import StepMission from './steps/step-mission';
import StepBudget from './steps/step-budget';
import StepFunding from './steps/step-funding';
import StepFocus from './steps/step-focus';
import StepLast from './steps/step-last';

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: 'italic' });

const TOTAL = 8;
const STORAGE_KEY = 'crescent-application-existing';

const EMPTY: ExistingData = {
  name: '',
  email: '',
  code: '',
  orgName: '',
  ein: '',
  state: '',
  zip: '',
  irsPrefilled: false,
  mission: '',
  program: '',
  annualBudget: '',
  projectedBudget: '',
  fundingSources: [],
  focusAreas: [],
  additional: '',
  facebook: '',
  linkedin: '',
};

const SCREENS: {
  C: React.ComponentType<{ data: ExistingData; update: (p: Partial<ExistingData>) => void }>;
  fill: number;
  title: string;
  subtitle?: string;
  wide?: boolean;
}[] = [
  { C: StepName, fill: 1, title: "What's your name?" },
  { C: StepEmail, fill: 2, title: "What's your email?" },
  { C: StepCode, fill: 2, title: 'Confirm your email code' },
  { C: StepOrg, fill: 3, title: 'Organization details' },
  { C: StepMission, fill: 4, title: 'Your mission & program' },
  { C: StepBudget, fill: 5, title: "What's your budget?" },
  { C: StepFunding, fill: 6, title: 'What are your funding sources?', subtitle: 'Select all that apply', wide: true },
  { C: StepFocus, fill: 7, title: 'What are your focus areas?', subtitle: 'Select all that apply', wide: true },
  { C: StepLast, fill: 8, title: 'Last few details' },
];

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

function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 sm:px-12 lg:px-[200px]">
      <Link href="/" aria-label="Crescent Cares home">
        <img src="/crescent/logo.svg" alt="Crescent Cares" width={190} height={24} className="h-6 w-auto" />
      </Link>
      <Link
        href="/login"
        className="rounded-md border-[0.75px] border-[#314047] bg-[#2a4248] px-3 py-2 text-[16px] text-white backdrop-blur-[15px] transition hover:opacity-90"
      >
        Login
      </Link>
    </header>
  );
}

function CopyPill({ text }: { text: string }) {
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard?.writeText(text)}
      className="flex shrink-0 items-center gap-4 whitespace-nowrap rounded-xl bg-[#2e4c54] px-5 py-3.5 text-[18px] tracking-[0.225px] text-[#fefefe] transition hover:opacity-90"
    >
      {text}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2" />
      </svg>
    </button>
  );
}

function Submitted({ data }: { data: ExistingData }) {
  const rows: [string, string][] = [
    ['State', data.state || 'Florida'],
    ['Budget', data.annualBudget || '$250,000'],
    ['Funding Sources', data.fundingSources[0] || 'Individual Donors'],
    ['EIN', data.ein || '28-3949948'],
  ];
  return (
    <div className="mx-auto flex w-full max-w-[680px] flex-col items-center px-6 pt-14">
      {/* application preview card — fades out at the bottom, per the design */}
      <div
        className="flex w-[350px] max-w-full flex-col gap-3 rounded-2xl bg-[#2e4c54] p-5"
        style={{
          maskImage: 'linear-gradient(to bottom, #000 50%, transparent 86%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 50%, transparent 86%)',
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[12px] font-light text-white/50">Your application</p>
            <p className="text-[16px] font-medium text-white">{data.orgName || 'Once Upon A Room'}</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-[#2eb67d] px-2 py-1 text-[10px] text-white">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden className="animate-spin">
              <path d="M12 3a9 9 0 1 0 9 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Matching...
          </span>
        </div>
        <p className="text-[14px] font-light leading-[1.35] tracking-[0.07px] text-white/50">
          {data.mission ||
            'Our goal is to enrich the lives of hospitalized children, teens, and infants fighting serious illnesses or long-term acute trauma.'}
        </p>
        <div className="flex flex-col">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between border-b-[0.5px] border-white/15 py-3 text-[14px]">
              <p className="font-light text-white/70">{k}</p>
              <p className="text-white">{v}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="-mt-12 flex w-full flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-[40px] font-semibold leading-tight tracking-[-0.015em] text-white">
          Application <span className={`${serif.className} text-[#d2b4fe]`}>submitted!</span>
        </h1>
        <p className="max-w-[500px] text-[18px] font-light leading-[1.35] tracking-[0.225px] text-white/70">
          Your application has been submitted and is being matched to our fiscal sponsors. A representative
          from our team will be in touch to discuss next steps.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <CopyPill text="CR-2026-5222D" />
          <CopyPill text="support@crescentcares.com" />
        </div>
        <p className="max-w-[379px] text-center text-[16px] font-light tracking-[0.2px] text-white/50">
          Contact our support team with your reference number above to get additional support.
        </p>
      </div>
      </div>
    </div>
  );
}

export default function ExistingWizard() {
  const router = useRouter();
  const [i, setI] = useState(0);
  const [data, setData] = useState<ExistingData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) setData({ ...EMPTY, ...JSON.parse(s) });
    } catch {
      /* ignore */
    }
    const q = parseInt(new URLSearchParams(window.location.search).get('step') ?? '', 10);
    if (!Number.isNaN(q) && q >= 1 && q <= SCREENS.length) setI(q - 1);
  }, []);

  const update = (patch: Partial<ExistingData>) => setData((d) => ({ ...d, ...patch }));

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    if (i < SCREENS.length - 1) setI(i + 1);
    else setSubmitted(true);
  }
  function handleBack() {
    if (i === 0) router.push('/');
    else setI(i - 1);
  }

  const screen = SCREENS[i];
  const Body = screen.C;

  return (
    <main className="min-h-screen w-full bg-[#263c42] text-white antialiased">
      <Header />

      {submitted ? (
        <Submitted data={data} />
      ) : (
        <div
          className={`mx-auto flex w-full flex-col items-center gap-9 px-6 pb-20 pt-16 ${
            screen.wide ? 'max-w-[600px]' : 'max-w-[463px]'
          }`}
        >
          <div className="flex w-full flex-col items-center gap-6">
            <Progress current={screen.fill} total={TOTAL} />
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-[14px] font-light leading-[1.4] text-white/50">
                Step {screen.fill} of {TOTAL}
              </p>
              <h1 className="text-balance text-[28px] font-semibold leading-[1.2] tracking-[-0.015em] text-white sm:text-[32px]">
                {screen.title}
              </h1>
              {screen.subtitle && (
                <p className="text-[14px] tracking-[0.175px] text-white/50">{screen.subtitle}</p>
              )}
            </div>
          </div>

          <form onSubmit={handleContinue} className="flex w-full flex-col gap-10">
            <Body data={data} update={update} />

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="rounded-lg bg-[#2c464d] px-5 py-3 text-[16px] text-white backdrop-blur-[15px] transition hover:opacity-90"
              >
                Back
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#e2f1e7] px-5 py-3 text-[16px] text-[#263c42] backdrop-blur-[15px] transition hover:opacity-90"
              >
                {i === SCREENS.length - 1 ? 'Submit Application' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
