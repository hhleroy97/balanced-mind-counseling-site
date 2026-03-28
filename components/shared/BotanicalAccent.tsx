export function BotanicalAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 220"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M107 203c-10-39-9-82 12-120 14-24 32-42 57-61-1 31-7 58-23 82-15 24-31 35-46 43"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M104 179c-22-29-37-65-34-103 2-27 12-52 30-76 9 28 12 54 5 82-6 28-18 45-35 60"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M89 83c-14-6-28-16-39-31M121 59c10-9 18-22 24-37M146 109c15-3 30-10 42-22M75 127c-14-1-27-5-40-14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
