/* Éléments décoratifs inspirés de la Savoie et d'Annecy */

/* Croix de Savoie — croix blanche sur fond rouge, drapeau traditionnel de la Savoie */
export function CroixDeSavoie({
  size = 28,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Croix de Savoie"
      className={className}
    >
      <rect width="28" height="28" rx="3" fill="#C0392B" />
      <rect x="11" y="1" width="6" height="26" rx="1" fill="white" />
      <rect x="1" y="11" width="26" height="6" rx="1" fill="white" />
    </svg>
  )
}

/* Croix de Savoie en trait — version outline élégante */
export function CroixDeSavoieOutline({
  size = 24,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <rect x="9.5" y="1" width="5" height="22" rx="1" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
      <rect x="1" y="9.5" width="22" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
    </svg>
  )
}

/**
 * Séparateur de section avec une vague douce.
 * Placé ENTRE deux sections dans le JSX — pas en absolute.
 * `from` = couleur bg de la section du dessus
 * `to`   = couleur bg de la section du dessous
 * `height` = hauteur de la vague en px (default 52)
 */
export function WaveDivider({
  from,
  to,
  height = 52,
  variant = 0,
}: {
  from: string
  to: string
  height?: number
  variant?: 0 | 1 | 2
}) {
  const PATHS = [
    'M0,26 C240,52 480,0 720,26 C960,52 1200,0 1440,26 L1440,52 L0,52 Z',
    'M0,20 C200,48 500,4 720,20 C940,48 1240,4 1440,20 L1440,52 L0,52 Z',
    'M0,30 C360,4 540,50 720,30 C900,4 1080,50 1440,30 L1440,52 L0,52 Z',
  ]
  return (
    <div
      style={{ backgroundColor: from, lineHeight: 0, display: 'block', marginBottom: -1 }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={PATHS[variant].replace(/52/g, String(height))} fill={to} />
      </svg>
    </div>
  )
}

/** @deprecated Utilise WaveDivider à la place */
export function CanalWave({ color = 'currentColor', className = '', flip = false }: {
  color?: string; className?: string; flip?: boolean
}) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`} aria-hidden="true"
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}>
      <svg viewBox="0 0 1440 52" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 52 }}>
        <path d="M0,26 C240,52 480,0 720,26 C960,52 1200,0 1440,26 L1440,52 L0,52 Z" fill={color} />
      </svg>
    </div>
  )
}

/* Cygne d'Annecy — silhouette SVG décorative */
export function SwanSilhouette({
  size = 40,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size * 0.65}
      viewBox="0 0 64 42"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Corps */}
      <ellipse cx="28" cy="28" rx="18" ry="10" />
      {/* Cou et tête */}
      <path d="M38 22 C44 14 50 8 46 4 C42 2 38 6 36 12 C34 16 32 20 30 22 Z" />
      {/* Queue */}
      <path d="M10 26 C6 22 4 18 8 16 C12 14 14 20 16 24 Z" />
    </svg>
  )
}
