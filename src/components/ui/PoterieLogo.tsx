interface PoterieLogoProps {
  size?: number
  color?: string
  className?: string
}

export function PoterieLogo({ size = 40, color = '#A23A2E', className = '' }: PoterieLogoProps) {
  const height = Math.round(size * 104 / 80)
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 80 104"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Outer outline — wide flat top opening, amphora silhouette */}
      <path
        d="M 16,6 L 64,6 Q 69,6 69,16 Q 71,28 69,38 Q 72,52 67,66 L 62,84 Q 62,94 40,96 Q 18,94 18,84 L 13,66 Q 8,52 11,38 Q 9,28 11,16 Q 11,6 16,6 Z"
        strokeWidth="2.5"
      />
      <path d="M 69,38 Q 78,52 67,66" strokeWidth="2.5" />
      <path d="M 11,38 Q 2,52 13,66" strokeWidth="2.5" />

      {/* Middle outline */}
      <path
        d="M 21,14 L 59,14 Q 63,14 63,23 Q 65,33 63,42 Q 66,54 62,66 L 57,82 Q 57,90 40,92 Q 23,90 23,82 L 18,66 Q 14,54 17,42 Q 15,33 17,23 Q 17,14 21,14 Z"
        strokeWidth="1.8"
      />
      <path d="M 63,42 Q 72,54 62,66" strokeWidth="1.8" />
      <path d="M 17,42 Q 8,54 18,66" strokeWidth="1.8" />

      {/* Inner outline */}
      <path
        d="M 26,22 L 54,22 Q 58,22 57,30 Q 59,38 57,46 Q 60,57 56,66 L 53,79 Q 53,85 40,87 Q 27,85 27,79 L 24,66 Q 20,57 23,46 Q 21,38 23,30 Q 22,22 26,22 Z"
        strokeWidth="1.2"
      />
      <path d="M 57,46 Q 65,56 56,66" strokeWidth="1.2" />
      <path d="M 23,46 Q 15,56 24,66" strokeWidth="1.2" />
    </svg>
  )
}
