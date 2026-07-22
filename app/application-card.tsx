'use client';

import { useState } from 'react';
import Link from 'next/link';
import StageSelector from './stage-selector';

// Hero application card. Tracks the New/Existing selection so "Start application"
// routes to the correct flow: New -> /apply, Existing -> /apply/existing.
export default function ApplicationCard() {
  const [stage, setStage] = useState<'new' | 'existing'>('new');
  const href = stage === 'existing' ? '/apply/existing' : '/apply';

  return (
    <div
      id="apply"
      className="flex w-full max-w-[466px] scroll-mt-8 flex-col justify-between gap-8 rounded-3xl bg-[#2a4248] p-8"
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-[14px] font-light leading-[1.4] text-white/70">Apply today</p>
          <p className="text-[24px] font-semibold leading-tight text-white">
            What stage is your organization in?
          </p>
        </div>

        <StageSelector onChange={setStage} />
      </div>

      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#2e4c54] px-3 py-2 text-[14px] tracking-[0.14px] text-white/70">
          Takes ~5 minutes
        </span>
        <Link
          href={href}
          className="rounded-lg bg-[#e2f1e7] px-5 py-3 text-[18px] text-[#263c42] transition hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d2b4fe] focus-visible:ring-offset-2 focus-visible:ring-offset-[#263c42]"
        >
          Start application
        </Link>
      </div>
    </div>
  );
}
