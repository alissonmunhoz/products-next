import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0c10",
        panel: "#111318",
        text: "#e6e6e6",
        muted: "#a1a1aa",
        accent: "#38bdf8",
        danger: "#ef4444",
        ok: "#22c55e",
        borderPanel: "#1f2937",
        inputBorder: "#2a2f3a",
        inputBg: "#0f1117",
      },
      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,0.15)",
      },
      maxWidth: {
        container: "1024px",
      },
      borderRadius: {
        "2xl": "1rem",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Ubuntu",
          "Cantarell",
          "Noto Sans",
          "Helvetica Neue",
          "Arial",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
      },
    },
  },
  plugins: [],
}

export default config
