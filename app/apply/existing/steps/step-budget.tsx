'use client';

import { StepProps } from '../types';
import { Field, SelectMenu } from '../ui';

const BUDGET = ['Under $50k', '$50k – $250k', '$250k – $1M', '$1M – $5M', 'Over $5M'];

export default function StepBudget({ data, update }: StepProps) {
  return (
    <div className="flex w-full flex-col gap-6">
      <Field label="Annual Budget">
        <SelectMenu
          value={data.annualBudget}
          onChange={(v) => update({ annualBudget: v })}
          options={BUDGET}
          placeholder="Select"
        />
      </Field>
      <Field label="Projected Next 12 Months">
        <SelectMenu
          value={data.projectedBudget}
          onChange={(v) => update({ projectedBudget: v })}
          options={BUDGET}
          placeholder="Select"
        />
      </Field>
    </div>
  );
}
