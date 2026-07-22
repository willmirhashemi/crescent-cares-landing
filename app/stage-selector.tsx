'use client';

import { useState } from 'react';

type Stage = 'new' | 'existing';

const options: {
  id: Stage;
  icon: string;
  title: string;
  body: string;
}[] = [
  {
    id: 'new',
    icon: '/crescent/layers.svg',
    title: 'New',
    body: "No EIN yet - we're an idea, project, or applying to the IRS. No 990 needed.",
  },
  {
    id: 'existing',
    icon: '/crescent/buildings.svg',
    title: 'Existing',
    body: 'We have an EIN from the IRS - pull our public 990 to autofill.',
  },
];

export default function StageSelector({
  onChange,
}: {
  onChange?: (stage: Stage) => void;
}) {
  const [selected, setSelected] = useState<Stage>('new');

  function select(stage: Stage) {
    setSelected(stage);
    onChange?.(stage);
  }

  return (
    <div className="flex flex-col gap-3" role="radiogroup" aria-label="Organization stage">
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => select(opt.id)}
            className={`flex w-full items-center gap-8 rounded-2xl p-5 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d2b4fe] ${
              isSelected
                ? 'border-[1.5px] border-[#d2b4fe] bg-[#2e4c54] shadow-[0_0_0_4px_rgba(210,180,254,0.2)]'
                : 'border-[1.5px] border-transparent bg-[#2c464d] hover:bg-[#2e4c54]'
            }`}
          >
            <span className="flex min-w-0 flex-1 items-center gap-4">
              <img src={opt.icon} alt="" className="h-6 w-6 shrink-0" />
              <span className="flex min-w-0 flex-col gap-2">
                <span className="text-[18px] tracking-[0.18px] text-white">
                  {opt.title}
                </span>
                <span className="text-[16px] font-light leading-[1.3] text-white/75">
                  {opt.body}
                </span>
              </span>
            </span>
            <img
              src={isSelected ? '/crescent/radio-on.svg' : '/crescent/radio-off.svg'}
              alt=""
              className="h-5 w-5 shrink-0"
            />
          </button>
        );
      })}
    </div>
  );
}
