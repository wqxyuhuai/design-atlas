import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        atlas: {
          canvas: "#000000",
          surface1: "#161617",
          surface2: "#202224",
          surface3: "#202224",
          surface4: "#202224",
          hairline: "#2c2c2e",
          hairlineStrong: "#636366",
          ink: "#f5f5f7",
          muted: "#cccccc",
          subtle: "#86868b",
          tertiary: "#6e6e73",
          accent: "#B7D075",
          accentHover: "#cbe48b",
          accentInk: "#1d1d1f",
          success: "#27a644"
        }
      },
      fontFamily: {
        sans: [
          "PingFang Atlas",
          "PingFang SC",
          "PingFang TC",
          "PingFang HK",
          "Hiragino Sans GB",
          "Microsoft YaHei UI",
          "Microsoft YaHei",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "SF Pro Display",
          "Segoe UI Variable",
          "Segoe UI",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      boxShadow: {
        "edge-highlight": "inset 0 1px 0 rgb(255 255 255 / 0.04)"
      }
    }
  },
  plugins: []
} satisfies Config;
