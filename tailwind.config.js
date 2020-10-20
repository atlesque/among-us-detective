module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ["./src/**/*.html", "./src/**/*.vue"],
    options: {
      // Uses PurgeCSS v2.x.x syntax
      whitelistPatterns: [/^bg-player-.*/],
    },
  },
  theme: {
    extend: {
      colors: {
        theme: {
          "gray-extra-light": "#F5F6F7",
          "gray-light": "#CED1D7",
          gray: "#9CA3AE",
          "gray-dark": "#4E5257",
          "gray-extra-dark": "#101011",
          "blue-light": "#A0C8E2",
          blue: "#4191C4",
          "blue-dark": "#214962",
          "red-light": "#E8B9B9",
          red: "#D17373",
          "red-dark": "#693A3A",
          "yellow-light": "#F6E4BF",
          yellow: "#ECC87E",
          "yellow-dark": "#76643F",
          "green-light": "#C4E4D1",
          green: "#88C9A2",
          "green-dark": "#446551",
        },
        player: {
          "red-dark": "#7B0838",
          red: "#C61111",
          "red-light": "#e8a0a0",

          "blue-dark": "#09158E",
          blue: "#132ED2",
          "blue-light": "#5a6de0",

          "green-dark": "#0A4D2D",
          green: "#11802D",
          "green-light": "#88c096",

          "pink-dark": "#AC2CAD",
          pink: "#EE54BB",
          "pink-light": "#f387cf",

          "orange-dark": "#B23F15",
          orange: "#F07D0D",
          "orange-light": "#f6b16e",

          "yellow-dark": "#C28722",
          yellow: "#F6F657",
          "yellow-light": "#f9f989",

          "black-dark": "#1E1F25",
          black: "#3F474E",
          "black-light": "#656c71",

          "white-dark": "#8295BE",
          white: "#D7E1F1",
          "white-light": "#ebf0f8",

          "purple-dark": "#3C177C",
          purple: "#6B2FBC",
          "purple-light": "#d3c1eb",

          "brown-dark": "#5E2614",
          brown: "#71491E",
          "brown-light": "#9c8062",

          "cyan-dark": "#24A9BE",
          cyan: "#38FFDD",
          "cyan-light": "#9cffee",

          "lime-dark": "#15A83F",
          lime: "#50F039",
          "lime-light": "#85f574",
        },
      },
      minHeight: {
        12: "3rem",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")],
};
