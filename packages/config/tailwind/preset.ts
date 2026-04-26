### packages/config/tailwind/preset.ts
```typescript
/**
 * ============================================================
 * FILE: packages/config/tailwind/preset.ts
 * ============================================================
 */

import type { Config } from 'tailwindcss';

/**
 * Shared Tailwind Preset for the ReadyCheck platform.
 * Aligns operational status semantics with the established field-color-system.
 */
const readyCheckPreset: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        // Operational Identity
        brand: {
          light: '#6366f1', // indigo-500
          DEFAULT: '#4f46e5', // indigo-600
          dark: '#3730a3', // indigo-800
        },
        
        // Status Semantics (From field-color-system.md)
        status: {
          verified: {
            text: '#059669', // emerald-600
            bg: '#ecfdf5', // emerald-50
            border: '#a7f3d0', // emerald-200
            icon: '#10b981', // emerald-500
          },
          blocked: {
            text: '#dc2626', // red-600
            bg: '#fef2f2', // red-50
            border: '#fecaca', // red-200
            icon: '#ef4444', // red-500
          },
          warning: {
            text: '#d97706', // amber-600
            bg: '#fffbeb', // amber-50
            border: '#fde68a', // amber-200
            icon: '#f59e0b', // amber-500
          },
          pending: {
            text: '#475569', // slate-600
            bg: '#f8fafc', // slate-50
            border: '#e2e8f0', // slate-200
            icon: '#64748b', // slate-500
          },
          active: {
            text: '#4f46e5', // indigo-600
            bg: '#eef2ff', // indigo-50
            border: '#c7d2fe', // indigo-200
            icon: '#6366f1', // indigo-500
          }
        },

        // Neutrals for Operational UI
        slate: {
          50: '#f8fafc',
          900: '#0f172a',
          950: '#020617',
        }
      },
      borderRadius: {
        'rc-sm': '0.375rem',
        'rc-md': '0.75rem',
        'rc-lg': '1.25rem',
      },
      boxShadow: {
        'rc-soft': '0 4px 20px -2px rgba(15, 23, 42, 0.08)',
        'rc-critical': '0 10px 25px -5px rgba(220, 38, 38, 0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};

export default readyCheckPreset;
```
