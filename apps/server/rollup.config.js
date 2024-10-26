import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";

export default {
  input: ["src/index.ts", "src/db/migrate.ts"],
  output: {
    dir: "dist",
  },
  plugins: [nodeResolve(), json(), commonjs(), typescript()],
};
