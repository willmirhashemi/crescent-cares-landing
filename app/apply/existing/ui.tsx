// Shared UI primitives for the Existing flow steps. Rendered inside a client
// wizard shell, so plain prop-driven components (no hooks) — no 'use client'.

export const inputClass =
  'h-12 w-full rounded-xl bg-[#2a4248] px-3 text-[16px] tracking-[0.2px] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#d2b4fe]';

export function Field({
  label,
  optional,
  verified,
  children,
}: {
  label: string;
  optional?: boolean;
  verified?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex w-full flex-col gap-3.5">
      <span className="flex items-center gap-2.5 text-[16px] tracking-[0.2px] text-[#fefefe]">
        {label}
        {optional && <span className="text-[14px] text-white/40">Optional</span>}
        {verified && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" stroke="#d2b4fe" strokeWidth="2" strokeLinejoin="round" />
            <path d="m9 12 2 2 4-4" stroke="#d2b4fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {children}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
}) {
  return (
    <input
      type={type}
      autoFocus={autoFocus}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    />
  );
}

export function Textarea({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full resize-none rounded-xl bg-[#2a4248] p-3 text-[16px] tracking-[0.2px] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#d2b4fe]"
    />
  );
}

export function SelectMenu({
  value,
  onChange,
  options,
  placeholder = 'Select',
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} appearance-none pr-10 ${value ? '' : 'text-white/50'}`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-white">
            {o}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
        width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden
      >
        <path d="m8 9 4-4 4 4M8 15l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// Divider with a centered label, e.g. "or" / "or enter manually".
export function OrDivider({ label = 'or' }: { label?: string }) {
  return (
    <div className="flex w-full items-center gap-3">
      <span className="h-px flex-1 bg-white/15" />
      <span className="text-[16px] text-white/50">{label}</span>
      <span className="h-px flex-1 bg-white/15" />
    </div>
  );
}

// Multi-select chip group.
export function ChipGroup({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={`rounded-lg px-5 py-3.5 text-[18px] tracking-[0.225px] text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d2b4fe] ${
              active
                ? 'border-[1.25px] border-[#d2b4fe] bg-[#2c464d] shadow-[0_0_0_2px_rgba(210,180,254,0.2)]'
                : 'border-[1.25px] border-transparent bg-[#2e4c54] hover:bg-[#2c464d]'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
