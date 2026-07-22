'use client';

import { StepProps } from '../types';
import { ChipGroup } from '../ui';

const OPTIONS = [
  'Education',
  'Youth',
  'Arts & Culture',
  'Environment',
  'Health',
  'Community',
  'Mix / Not Sure Yet',
  'Other',
];

export default function StepFocus({ data, update }: StepProps) {
  const toggle = (value: string) =>
    update({
      focusAreas: data.focusAreas.includes(value)
        ? data.focusAreas.filter((v) => v !== value)
        : [...data.focusAreas, value],
    });

  return (
    <div className="flex w-full flex-col gap-6">
      <ChipGroup options={OPTIONS} selected={data.focusAreas} onToggle={toggle} />
    </div>
  );
}
