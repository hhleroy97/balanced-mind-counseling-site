export function PractitionerSilhouette({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 520 720"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="silhouette-fill" x1="260" y1="80" x2="260" y2="640">
          <stop stopColor="#FBF7EF" />
          <stop offset="1" stopColor="#E8DFCE" />
        </linearGradient>
      </defs>
      <circle cx="264" cy="176" r="104" fill="url(#silhouette-fill)" />
      <path
        d="M115 666c12-115 72-191 149-191 77 0 138 76 149 191"
        fill="url(#silhouette-fill)"
      />
      <path
        d="M120 664c14-114 72-189 144-189 74 0 130 75 144 189"
        stroke="#C8A86E"
        strokeOpacity="0.55"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle
        cx="264"
        cy="176"
        r="104"
        stroke="#335244"
        strokeOpacity="0.14"
        strokeWidth="3"
      />
    </svg>
  );
}
