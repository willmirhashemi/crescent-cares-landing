'use client';

import { StepProps } from '../types';
import { TextInput } from '../ui';

export default function StepName({ data, update }: StepProps) {
  return (
    <div className="flex w-full flex-col gap-10">
      <TextInput
        autoFocus
        value={data.name}
        onChange={(v) => update({ name: v })}
        placeholder="Enter your name"
      />
    </div>
  );
}
