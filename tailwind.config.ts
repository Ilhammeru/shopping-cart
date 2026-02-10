import type { Config } from "tailwindcss";

export default {
  // content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Helvetica Neue", "sans-serif"],
      serif: ["serif"],
      mono: ["monospace"],
      display: ["Helvetica Neue", "sans-serif"],
      body: ["Helvetica Neue", "sans-serif"],
    },
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "7": "1.75rem",
        "8": "2rem",
        "9": "2.25rem",
        "10": "2.5rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
        "sm": "0.375rem",
        "md": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "radius-full": "9999px",
      },
      colors: {
        /* Primary Colors */
        "primary-blue": '#3B82F6',
        "primary-teal": '#14B8A6',
        "primary-purple": '#8B5CF6',

        /* Neutral Colors */
        "neutral-light": '#F8FAFC',
        "neutral-gray": '#64748B',
        "neutral-dark": '#1E293B',
        "white": '#FFFFFF',
        "black": '#0F172A',
        /* Status Colors */
        "success": '#10B981',          /* Completed, Ready */
        "warning": '#F59E0B',          /* Processing, Delay */
        "error": '#EF4444',            /* Issues, Cancelled */
        "info": '#3B82F6',             /* Notifications */

        /* Backgrounds */
        "bg-primary": '#FFFFFF',
        "bg-secondary": '#F1F5F9',
        "bg-card": '#FFFFFF',
        "bg-hover": '#F8FAFC',

        /* Gradients */
        "gradient-primary": 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
        "gradient-success": 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)'
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
      },
      boxShadow: {
        "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "md": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1)"
      }
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
    ],
  },
  content: [
    `./app/components/**/*.{vue,js,ts}`,
    `./app/layouts/**/*.vue`,
    `./app/pages/**/*.vue`,
    `./app/composables/**/*.{js,ts}`,
    `./app/plugins/**/*.{js,ts}`,
    `./app/utils/**/*.{js,ts}`,
    `./app/app.{js,ts,vue}`,
    `./app/error.{js,ts,vue}`,
  ],
} satisfies Config;
