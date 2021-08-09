module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    "styled-components",
    ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
    ["@babel/plugin-proposal-private-methods", { loose: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
};
