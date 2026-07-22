'use client';

import { StepProps } from '../types';
import { Field, Textarea, OrDivider } from '../ui';

export default function StepMission({ data, update }: StepProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-[0.5px] border-dashed border-[rgba(215,214,211,0.35)] bg-[#2a4248] px-3 pb-5 pt-4 text-center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fefefe"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <div className="text-[16px] tracking-[0.2px] text-[#fefefe]">
          Upload supporting documents
        </div>
        <div className="text-[14px] tracking-[0.2px] text-white/70">
          Upload it and Crescent fills your mission, program, budget, and focus.
        </div>
      </div>

      <OrDivider label="or enter manually" />

      <Field label="Mission Statement">
        <Textarea
          rows={3}
          value={data.mission}
          onChange={(v) => update({ mission: v })}
          placeholder=""
        />
      </Field>

      <Field label="Program Description">
        <Textarea
          rows={3}
          value={data.program}
          onChange={(v) => update({ program: v })}
          placeholder=""
        />
      </Field>
    </div>
  );
}
