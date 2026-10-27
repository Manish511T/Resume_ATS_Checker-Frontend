export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["'Instrument Sans'", "system-ui", "sans-serif"], display: ["'Fraunces'", "Georgia", "serif"] },
      colors: { ink: "#14201f", paper: "#f5f7f4", pine: { 50: "#e8f3f0", 100: "#cfe6e0", 600: "#12766b", 700: "#0d5e55", 900: "#0a3a35" }, amber: { 500: "#d99a1f" } }
    }
  },
  plugins: []
};
