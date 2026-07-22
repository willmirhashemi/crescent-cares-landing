'use client';

import { useState } from 'react';
import { StepProps } from '../types';
import { Field, TextInput, SelectMenu, OrDivider, inputClass } from '../ui';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
];

export default function StepOrg({ data, update }: StepProps) {
  const [revealed, setRevealed] = useState(false);

  if (!revealed) {
    return (
      <div className="flex w-full flex-col gap-3">
        <Field label="Organization Name">
          <div className={`${inputClass} flex items-center gap-2.5`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-white/50">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={data.orgName}
              onChange={(e) => update({ orgName: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && data.orgName.trim() !== '') {
                  e.preventDefault();
                  update({
                    orgName: 'Helping Hands',
                    ein: '12-4934677',
                    state: 'Florida',
                    zip: '25347',
                    irsPrefilled: true,
                  });
                  setRevealed(true);
                }
              }}
              placeholder="Search 1.8M+ nonprofits by name, city, or EIN"
              className="w-full flex-1 border-none bg-transparent text-[16px] tracking-[0.2px] text-white outline-none placeholder:text-white/50"
            />
          </div>
        </Field>

        <OrDivider label="or" />

        <div className="flex w-full justify-center">
          <button
            type="button"
            onClick={() => {
              update({ irsPrefilled: false });
              setRevealed(true);
            }}
            className="rounded-xl bg-[#2e4c54] px-3 py-2 text-[16px] text-white"
          >
            Enter manually
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full flex-col gap-3.5">
        <Field label="Organization Name">
          <TextInput
            value={data.orgName}
            onChange={(v) => update({ orgName: v })}
            placeholder="Organization Name"
          />
        </Field>

        {data.irsPrefilled && (
          <div className="flex flex-col gap-2 rounded-xl bg-[#1a2b32] p-3">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
                <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" stroke="#d2b4fe" strokeWidth="2" strokeLinejoin="round" />
                <path d="m9 12 2 2 4-4" stroke="#d2b4fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[14px] text-white">Information pulled from IRS record</span>
            </div>
            <p className="text-[13px] text-white/70">
              Please confirm information is correct by editing the pre-filled fields.
            </p>
          </div>
        )}

        <Field label="EIN" verified={data.irsPrefilled}>
          <TextInput
            value={data.ein}
            onChange={(v) => update({ ein: v })}
            placeholder="12-3456789"
          />
        </Field>

        <div className="flex gap-4">
          <Field label="State" verified={data.irsPrefilled}>
            <SelectMenu
              value={data.state}
              onChange={(v) => update({ state: v })}
              options={US_STATES}
              placeholder="Select"
            />
          </Field>
          <Field label="Zip Code" verified={data.irsPrefilled}>
            <TextInput
              value={data.zip}
              onChange={(v) => update({ zip: v })}
              placeholder="Zip Code"
            />
          </Field>
        </div>
      </div>
    </div>
  );
}
