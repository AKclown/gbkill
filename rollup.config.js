import json from '@rollup/plugin-json';
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from '@rollup/plugin-babel';

const extensions = [".js", ".ts", ".json", '.tsx'];

export default {
    input: ["./src/index.ts"],
    output: {
        dir: "./lib",
        format: "cjs",
    },
    plugins: [
        json(),
        typescript({
            tsconfig: './tsconfig.json',
            exclude: ["./node_modules/**"],
        }),
        nodeResolve({
            extensions,
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: ['node_modules/**'],
            babelrc: true,
            extensions
        }),
        commonjs({
            include: 'node_modules/**',
            extensions
        }),

    ],
};
