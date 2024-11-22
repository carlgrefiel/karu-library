import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "src/index.js", // Entry point for your library
  output: [
    {
      file: "dist/index.js", // Output bundle
      format: "cjs", // CommonJS format for compatibility
      sourcemap: true, // Generate source maps
    },
    {
      file: "dist/index.esm.js", // Output ESM format for modern environments
      format: "esm",
      sourcemap: true,
    },
  ],
  external: ["react", "react-dom"], // Exclude React from the bundle
  plugins: [
    resolve(), // Resolves node modules
    commonjs(), // Converts CommonJS modules to ES6
    babel({
      exclude: "node_modules/**", // Exclude node_modules
      presets: ["@babel/preset-env", "@babel/preset-react"],
    }),
  ],
};
