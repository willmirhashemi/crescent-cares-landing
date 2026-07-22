'use client';

import { StepProps } from '../types';
import { Field, TextInput, Textarea } from '../ui';

export default function StepLast({ data, update }: StepProps) {
  return (
    <div className="flex w-full flex-col gap-5">
      <Field label="Anything else you'd like to share">
        <Textarea
          rows={3}
          value={data.additional}
          onChange={(v) => update({ additional: v })}
        />
      </Field>

      <Field label="Organization's Facebook">
        <TextInput
          value={data.facebook}
          onChange={(v) => update({ facebook: v })}
          placeholder=""
        />
      </Field>

      <Field label="Organization's LinkedIn">
        <TextInput
          value={data.linkedin}
          onChange={(v) => update({ linkedin: v })}
          placeholder=""
        />
      </Field>

      <div className="flex items-start gap-2 rounded-xl bg-[#1a2b32] p-3">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fefefe"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-0.5 shrink-0"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <p className="text-[13px] leading-snug text-[#babfc1]">
          On submit we route you to your strongest matches and issue a tracking
          number. Sponsors review and may request more info - you&apos;ll see
          every decision in one place.
        </p>
      </div>
    </div>
  );
}
