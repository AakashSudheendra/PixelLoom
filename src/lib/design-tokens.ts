export const designTokens = {
  color: {
    background: "#0c0d10",
    surface: "#14161b",
    border: "#282b33",
    text: "#f3f4f6",
    muted: "#8b909d",
    accent: "#b6f36b",
    accentSecondary: "#a78bfa",
  },
  typography: {
    display: "Manrope, system-ui, sans-serif",
    body: "Manrope, system-ui, sans-serif",
    mono: '"DM Mono", monospace',
  },
  radius: { card: "13px", control: "9px", pill: "999px" },
  spacing: { xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px" },
} as const;
