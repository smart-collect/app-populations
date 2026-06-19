import React from 'react';

export type BinoPose = 'standing' | 'waving' | 'holding' | 'surprised';

interface BinoMascotProps {
  pose?: BinoPose;
  size?: number;
  className?: string;
}

export const BinoMascot: React.FC<BinoMascotProps> = ({ 
  pose = 'standing', 
  size = 120,
  className = ''
}) => {
  const renderPose = () => {
    switch (pose) {
      case 'standing':
        return (
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="178" rx="48" ry="8" fill="#0F6E56" opacity="0.12"/>
            {/* body */}
            <rect x="58" y="78" width="84" height="92" rx="22" fill="#1D9E75"/>
            <rect x="58" y="78" width="84" height="92" rx="22" fill="none" stroke="#0F6E56" strokeWidth="4"/>
            {/* lid */}
            <rect x="52" y="58" width="96" height="26" rx="13" fill="#0F6E56"/>
            <rect x="86" y="44" width="28" height="16" rx="6" fill="#0F6E56"/>
            {/* face plate */}
            <rect x="70" y="92" width="60" height="50" rx="16" fill="#F0FAF5"/>
            {/* eyes */}
            <circle cx="90" cy="114" r="9" fill="#16241F"/>
            <circle cx="110" cy="114" r="9" fill="#16241F"/>
            <circle cx="93" cy="111" r="2.5" fill="#fff"/>
            <circle cx="113" cy="111" r="2.5" fill="#fff"/>
            {/* smile */}
            <path d="M88 126 Q100 136 112 126" stroke="#16241F" strokeWidth="4" fill="none" strokeLinecap="round"/>
            {/* recycle arrow detail */}
            <path d="M82 156 a10 10 0 1 1 18 6 M98 162 l4 -8 6 4" stroke="#F0FAF5" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            {/* arms */}
            <rect x="40" y="120" width="20" height="14" rx="7" fill="#0F6E56"/>
            <rect x="140" y="120" width="20" height="14" rx="7" fill="#0F6E56"/>
            {/* legs */}
            <rect x="74" y="168" width="14" height="14" rx="5" fill="#0F6E56"/>
            <rect x="112" y="168" width="14" height="14" rx="5" fill="#0F6E56"/>
          </svg>
        );
      case 'waving':
        return (
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="178" rx="48" ry="8" fill="#0F6E56" opacity="0.12"/>
            <rect x="58" y="78" width="84" height="92" rx="22" fill="#1D9E75"/>
            <rect x="58" y="78" width="84" height="92" rx="22" fill="none" stroke="#0F6E56" strokeWidth="4"/>
            <rect x="52" y="58" width="96" height="26" rx="13" fill="#0F6E56"/>
            <rect x="86" y="44" width="28" height="16" rx="6" fill="#0F6E56"/>
            <rect x="70" y="92" width="60" height="50" rx="16" fill="#F0FAF5"/>
            {/* happy eyes (curved) */}
            <path d="M82 112 q8 -10 16 0" stroke="#16241F" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <path d="M102 112 q8 -10 16 0" stroke="#16241F" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <path d="M86 128 Q100 140 114 128" stroke="#16241F" strokeWidth="4" fill="none" strokeLinecap="round"/>
            {/* waving arm raised */}
            <rect x="138" y="84" width="20" height="14" rx="7" fill="#0F6E56" transform="rotate(-40 148 91)"/>
            <circle cx="160" cy="76" r="9" fill="#0F6E56"/>
            <rect x="40" y="120" width="20" height="14" rx="7" fill="#0F6E56"/>
            <rect x="74" y="168" width="14" height="14" rx="5" fill="#0F6E56"/>
            <rect x="112" y="168" width="14" height="14" rx="5" fill="#0F6E56"/>
          </svg>
        );
      case 'holding':
        return (
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="178" rx="52" ry="8" fill="#0F6E56" opacity="0.12"/>
            <rect x="58" y="78" width="84" height="92" rx="22" fill="#1D9E75"/>
            <rect x="58" y="78" width="84" height="92" rx="22" fill="none" stroke="#0F6E56" strokeWidth="4"/>
            <rect x="52" y="58" width="96" height="26" rx="13" fill="#0F6E56"/>
            <rect x="86" y="44" width="28" height="16" rx="6" fill="#0F6E56"/>
            <rect x="70" y="92" width="60" height="50" rx="16" fill="#F0FAF5"/>
            {/* determined eyes (slight frown brows) */}
            <circle cx="90" cy="116" r="8" fill="#16241F"/>
            <circle cx="110" cy="116" r="8" fill="#16241F"/>
            <path d="M82 104 l14 4 M118 104 l-14 4" stroke="#16241F" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M92 130 Q100 134 108 130" stroke="#16241F" strokeWidth="4" fill="none" strokeLinecap="round"/>
            {/* trash bag held */}
            <path d="M150 110 q22 0 18 26 q-2 14 -20 14 q-18 0 -20 -14 q-4 -26 22 -26 z" fill="#FFC857" stroke="#0F6E56" strokeWidth="3"/>
            <path d="M142 110 q8 -10 16 0" stroke="#0F6E56" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <rect x="138" y="120" width="20" height="14" rx="7" fill="#0F6E56"/>
            <rect x="40" y="120" width="20" height="14" rx="7" fill="#0F6E56"/>
            <rect x="74" y="168" width="14" height="14" rx="5" fill="#0F6E56"/>
            <rect x="112" y="168" width="14" height="14" rx="5" fill="#0F6E56"/>
          </svg>
        );
      case 'surprised':
        return (
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="178" rx="48" ry="8" fill="#0F6E56" opacity="0.12"/>
            <rect x="58" y="78" width="84" height="92" rx="22" fill="#1D9E75"/>
            <rect x="58" y="78" width="84" height="92" rx="22" fill="none" stroke="#0F6E56" strokeWidth="4"/>
            {/* lid popped open */}
            <rect x="50" y="44" width="96" height="24" rx="12" fill="#0F6E56" transform="rotate(-18 98 56)"/>
            <rect x="86" y="30" width="28" height="16" rx="6" fill="#0F6E56" transform="rotate(-18 100 38)"/>
            <rect x="70" y="92" width="60" height="50" rx="16" fill="#F0FAF5"/>
            {/* surprised eyes (big circles) */}
            <circle cx="90" cy="114" r="11" fill="#16241F"/>
            <circle cx="110" cy="114" r="11" fill="#16241F"/>
            <circle cx="94" cy="110" r="3" fill="#fff"/>
            <circle cx="114" cy="110" r="3" fill="#fff"/>
            {/* open mouth */}
            <ellipse cx="100" cy="132" rx="8" ry="10" fill="#16241F"/>
            <rect x="40" y="120" width="20" height="14" rx="7" fill="#0F6E56"/>
            <rect x="140" y="120" width="20" height="14" rx="7" fill="#0F6E56"/>
            <rect x="74" y="168" width="14" height="14" rx="5" fill="#0F6E56"/>
            <rect x="112" y="168" width="14" height="14" rx="5" fill="#0F6E56"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={className}
      style={{ width: size, height: size }}
    >
      {renderPose()}
    </div>
  );
};
