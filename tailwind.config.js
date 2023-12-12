/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      // pizza: "Roboto Mono, monospace",
      sans: "Roboto Mono, monospace",
    },
    extend: {
      // пример дополнения имеющихся стилей своими или переопределения
      colors: {
        pizza: "#123456",
      },
      fontSize: {
        huge: ["2.5rem", { lineHeight: "1" }],
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
