'use client';

import { useRef } from 'react';
import { StepProps } from '../types';

export default function StepCode({ data, update }: StepProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const digits = (data.code ?? '').padEnd(6, ' ').slice(0, 6).split('');

  const setDigit = (index: number, char: string) => {
    const next = [...digits];
    next[index] = char || ' ';
    update({ code: next.join('').replace(/ /g, ' ').trimEnd() });
  };

  const handleChange = (index: number, value: string) => {
    const char = value.replace(/\s/g, '').slice(-1);
    setDigit(index, char);
    if (char && index < 5) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Backspace' && !digits[index].trim() && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex w-full flex-col gap-3.5">
        <div className="flex w-full items-center justify-between">
          <span className="text-[16px] tracking-[0.2px] text-[#fefefe]">Code</span>
          <button
            type="button"
            className="flex items-center gap-2 text-[16px] tracking-[0.2px] text-white/70"
          >
            Resend
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M20 11a8 8 0 1 0-2.3 5.7M20 5v4h-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="flex w-full flex-row gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={digits[i].trim()}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              inputMode="numeric"
              maxLength={1}
              className="h-12 w-full min-w-0 flex-1 rounded-xl bg-[#2a4248] text-center text-[18px] text-white focus:outline-none focus:ring-2 focus:ring-[#d2b4fe]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
