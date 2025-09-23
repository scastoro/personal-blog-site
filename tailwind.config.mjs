/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Color System - Extended with design tokens
      colors: {
        // Primitive colors
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
        },
        amber: {
          50: '#fffbeb',
          400: '#fbbf24',
        },
        red: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
        // Semantic color aliases using CSS custom properties
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
          link: 'var(--color-text-link)',
        },
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          elevated: 'var(--color-bg-elevated)',
          overlay: 'var(--color-bg-overlay)',
          muted: 'var(--color-bg-muted)',
        },
        border: {
          default: 'var(--color-border-default)',
          muted: 'var(--color-border-muted)',
          strong: 'var(--color-border-strong)',
          focus: 'var(--color-border-focus)',
        },
        accent: {
          primary: 'var(--color-accent-primary)',
          secondary: 'var(--color-accent-secondary)',
          warning: 'var(--color-accent-warning)',
          danger: 'var(--color-accent-danger)',
        },
      },

      // Typography System
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Charter', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        primary: 'var(--font-family-primary)',
        reading: 'var(--font-family-reading)',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],     // 12px
        sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        base: ['1rem', { lineHeight: '1.5rem' }],    // 16px
        lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }],  // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],   // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
        '5xl': ['3rem', { lineHeight: '1' }],           // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      letterSpacing: {
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
      },
      lineHeight: {
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },

      // Spacing System (4px base unit)
      spacing: {
        '0.5': '0.125rem',  // 2px
        '1.5': '0.375rem',  // 6px
        '2.5': '0.625rem',  // 10px
        '3.5': '0.875rem',  // 14px
        '7': '1.75rem',     // 28px
        '9': '2.25rem',     // 36px
        '11': '2.75rem',    // 44px
        '13': '3.25rem',    // 52px
        '15': '3.75rem',    // 60px
        '17': '4.25rem',    // 68px
        '18': '4.5rem',     // 72px
        '19': '4.75rem',    // 76px
        '21': '5.25rem',    // 84px
        '22': '5.5rem',     // 88px
        '23': '5.75rem',    // 92px
      },

      // Border Radius
      borderRadius: {
        'sm': '0.125rem',   // 2px
        'md': '0.375rem',   // 6px
        'lg': '0.5rem',     // 8px
        'xl': '0.75rem',    // 12px
        '2xl': '1rem',      // 16px
        '3xl': '1.5rem',    // 24px
      },

      // Box Shadow System
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'dropdown': 'var(--shadow-dropdown)',
        'modal': 'var(--shadow-modal)',
      },

      // Animation & Transitions
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // Container Sizes
      maxWidth: {
        'xs': '20rem',      // 320px
        'sm': '24rem',      // 384px
        'md': '28rem',      // 448px
        'lg': '32rem',      // 512px
        'xl': '36rem',      // 576px
        '2xl': '42rem',     // 672px
        '3xl': '48rem',     // 768px
        '4xl': '56rem',     // 896px
        '5xl': '64rem',     // 1024px
        '6xl': '72rem',     // 1152px
        '7xl': '80rem',     // 1280px
        'container': '1024px',
        'container-narrow': '768px',
        'container-wide': '1280px',
      },

      // Typography Plugin Configuration
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--color-text-primary)',
            fontSize: 'var(--text-lg)',
            lineHeight: 'var(--leading-relaxed)',
            
            // Headings
            h1: {
              color: 'var(--color-text-primary)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--text-4xl)',
              lineHeight: 'var(--leading-tight)',
              letterSpacing: 'var(--tracking-tight)',
              marginBottom: 'var(--space-8)',
            },
            h2: {
              color: 'var(--color-text-primary)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--text-3xl)',
              lineHeight: 'var(--leading-tight)',
              letterSpacing: 'var(--tracking-tight)',
              marginTop: 'var(--space-12)',
              marginBottom: 'var(--space-4)',
            },
            h3: {
              color: 'var(--color-text-primary)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--text-2xl)',
              marginTop: 'var(--space-8)',
              marginBottom: 'var(--space-4)',
            },
            
            // Text elements
            p: {
              marginBottom: 'var(--space-6)',
              color: 'var(--color-text-secondary)',
            },
            a: {
              color: 'var(--color-text-link)',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              fontWeight: 'var(--font-weight-medium)',
              '&:hover': {
                color: 'var(--color-button-primary-hover)',
              },
            },
            strong: {
              color: 'var(--color-text-primary)',
              fontWeight: 'var(--font-weight-semibold)',
            },
            
            // Lists
            'ul, ol': {
              margin: 'var(--space-6) 0',
              paddingLeft: 'var(--space-6)',
            },
            li: {
              marginBottom: 'var(--space-2)',
              color: 'var(--color-text-secondary)',
            },
            'ol > li::marker': {
              color: 'var(--color-text-muted)',
            },
            'ul > li::marker': {
              color: 'var(--color-text-muted)',
            },
            
            // Code
            code: {
              backgroundColor: 'var(--color-bg-muted)',
              color: 'var(--color-text-primary)',
              padding: 'var(--space-1) var(--space-2)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--text-sm)',
              fontFamily: 'var(--font-family-mono)',
              fontWeight: 'var(--font-weight-medium)',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            
            pre: {
              backgroundColor: 'var(--color-gray-950)',
              color: 'var(--color-gray-100)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              overflowX: 'auto',
              fontSize: 'var(--text-sm)',
              lineHeight: 'var(--leading-relaxed)',
              margin: 'var(--space-8) 0',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              padding: '0',
            },
            
            // Blockquotes
            blockquote: {
              borderLeft: '4px solid var(--color-accent-primary)',
              paddingLeft: 'var(--space-6)',
              margin: 'var(--space-8) 0',
              fontStyle: 'italic',
              color: 'var(--color-text-secondary)',
              backgroundColor: 'var(--color-bg-muted)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg)',
            },
            
            // Horizontal rules
            hr: {
              borderColor: 'var(--color-border-default)',
              borderTopWidth: '1px',
              margin: 'var(--space-8) 0',
            },
            
            // Tables
            table: {
              marginTop: 'var(--space-8)',
              marginBottom: 'var(--space-8)',
            },
            thead: {
              borderBottomColor: 'var(--color-border-strong)',
            },
            'thead th': {
              color: 'var(--color-text-primary)',
              fontWeight: 'var(--font-weight-semibold)',
            },
            'tbody td': {
              borderBottomColor: 'var(--color-border-muted)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};