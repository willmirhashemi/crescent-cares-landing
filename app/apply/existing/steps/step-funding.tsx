'use client';

import { StepProps } from '../types';
import { ChipGroup } from '../ui';

const OPTIONS = [
  'Grants & Foundations',
  'Individual Donors',
  'Earned / Program Revenue',
  'Government',
  'Corporate',
  'Mix / Not Sure Yet',
];

export default function StepFunding({ data, update }: StepProps) {
  const toggle = (v: string) =>
    update({
      fundingSources: data.fundingSources.includes(v)
        ? data.fundingSources.filter((x) => x !== v)
        : [...data.fundingSources, v],
    });

  return (
    <div className="flex w-full flex-col gap-6">
      <ChipGroup options={OPTIONS} selected={data.fundingSources} onToggle={toggle} />
    </div>
  );
}
