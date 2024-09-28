/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blueviolet: "#9747ff",
        white: "#fff",
        gray: {
          "100": "#fffefe",
          "200": "#949494",
          "300": "#888181",
          "400": "rgba(17, 17, 17, 0.85)",
          "500": "rgba(26, 25, 25, 0.85)",
          "600": "rgba(0, 0, 0, 0.05)",
        },
        gainsboro: {
          "100": "#e0e0e0",
          "200": "#d9d9d9",
        },
        dimgray: {
          "100": "#6e6d6d",
          "200": "#585857",
          "300": "#515151",
        },
        darkslategray: "#41413f",
        silver: {
          "100": "#cac9c9",
          "200": "#c7c3c3",
          "300": "#c4c4c4",
        },
        darkgray: "#9f9c9c",
        lightgray: {
          "100": "#d5d5d5",
          "200": "#c9cccf",
        },
        teal: {
          "100": "#00738C",
          "200": "#81B0B2",
          "300": "#B3DDD1",
        }
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
        sans: ["Inter", "sans-serif"], // Set Inter as the default font 
      },
      borderRadius: {
        "8xs": "5px",
        "4xs": "9px",
        "3xs": "10px",
        mid: "17px",
        xl: "20px",
        sm: "14px",
        "3xl": "22px",
        "11xl": "30px",
        "81xl": "100px",
      },
    },
    fontSize: {
      base: "16px",
      "7xs": "6px",
      "8xs": "5px",
      "9xs": "4px",
      xs: "12px",
      "3xs": "10px",
      "4xs": "9px",
      "2xs": "8px",
      sm: "14px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
