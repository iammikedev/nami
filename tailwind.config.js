const tailwindColorTokens = {
  nami: {
    sage: "#A8D5BA",
    cream: "#FFF6E9",
    beige: "#F1E3D3",
    text: "#2F3A34",
    textSecondary: "#6F7D73",
    border: "#E8DCCF",
    feed: "#FFC6A8",
    sleep: "#CDB4DB",
    diaper: "#BDE0FE",
    milestone: "#FFD166",
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/theme/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/features/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: tailwindColorTokens,
      fontFamily: {
        // TODO(fonts): replace with loaded custom families once Nunito/Montserrat are added.
        nunito: ["System"],
        montserrat: ["System"],
      },
      fontSize: {
        display: ["32px", { lineHeight: "40px", letterSpacing: "-0.3px" }],
        h1: ["28px", { lineHeight: "36px", letterSpacing: "-0.2px" }],
        h2: ["24px", { lineHeight: "32px", letterSpacing: "-0.1px" }],
        h3: ["20px", { lineHeight: "28px", letterSpacing: "-0.05px" }],
        title: ["18px", { lineHeight: "26px", letterSpacing: "0px" }],
        body: ["16px", { lineHeight: "24px", letterSpacing: "0.1px" }],
        bodySmall: ["14px", { lineHeight: "20px", letterSpacing: "0.1px" }],
        caption: ["12px", { lineHeight: "16px", letterSpacing: "0.2px" }],
        button: ["16px", { lineHeight: "22px", letterSpacing: "0.1px" }],
        label: ["13px", { lineHeight: "18px", letterSpacing: "0.2px" }],
      },
      borderRadius: {
        nami: "16px",
      },
    },
  },
  plugins: [],
}

