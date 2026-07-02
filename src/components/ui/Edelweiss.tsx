interface EdelweissProps {
  className?: string
  size?: number
}

export function Edelweiss({ className = '', size = 32 }: EdelweissProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* 6 pétales autour du centre */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="24"
          cy="12"
          rx="4.5"
          ry="8"
          fill="currentColor"
          fillOpacity="0.85"
          transform={`rotate(${angle}, 24, 24)`}
        />
      ))}
      {/* Capitule central */}
      <circle cx="24" cy="24" r="7" fill="currentColor" />
      {/* Petits fleurons (texture du capitule) */}
      <circle cx="21.5" cy="22" r="2" fill="currentColor" fillOpacity="0.35" />
      <circle cx="26" cy="22" r="2" fill="currentColor" fillOpacity="0.35" />
      <circle cx="24" cy="26" r="2" fill="currentColor" fillOpacity="0.35" />
    </svg>
  )
}
