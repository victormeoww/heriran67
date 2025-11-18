'use client'

interface PersianPatternProps {
  className?: string
  variant?: 'star' | 'geometric' | 'divider'
  opacity?: number
}

export default function PersianPattern({ 
  className = '', 
  variant = 'star',
  opacity = 0.1 
}: PersianPatternProps) {
  
  if (variant === 'star') {
    return (
      <svg 
        className={className}
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <path 
          d="M50 10 L55 40 L85 45 L60 55 L65 85 L50 65 L35 85 L40 55 L15 45 L45 40 Z" 
          stroke="currentColor" 
          strokeWidth="0.5"
        />
        <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.5" />
        <path 
          d="M50 25 L50 75 M25 50 L75 50 M35 35 L65 65 M65 35 L35 65" 
          stroke="currentColor" 
          strokeWidth="0.5"
        />
      </svg>
    )
  }
  
  if (variant === 'geometric') {
    return (
      <svg 
        className={className}
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="0.5" transform="rotate(45 50 50)" />
        <rect x="35" y="35" width="30" height="30" stroke="currentColor" strokeWidth="0.5" transform="rotate(45 50 50)" />
        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    )
  }
  
  // Divider variant
  return (
    <svg 
      className={className}
      viewBox="0 0 200 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: opacity * 3 }}
    >
      <path 
        d="M10 10 L20 5 L30 10 L40 5 L50 10 L60 5 L70 10 L80 5 L90 10 L100 5 L110 10 L120 5 L130 10 L140 5 L150 10 L160 5 L170 10 L180 5 L190 10" 
        stroke="currentColor" 
        strokeWidth="1"
        fill="none"
      />
    </svg>
  )
}

