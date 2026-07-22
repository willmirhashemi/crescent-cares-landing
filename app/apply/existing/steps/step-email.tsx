'use client';

import { StepProps } from '../types';
import { TextInput } from '../ui';

export default function StepEmail({ data, update }: StepProps) {
  return (
    <div className="flex w-full flex-col gap-10">
      <TextInput
        value={data.email}
        onChange={(value) => update({ email: value })}
        placeholder="Enter your email"
        type="email"
        autoFocus
      />
    </div>
  );
}
