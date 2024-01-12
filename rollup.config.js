import { babel } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default [
    {
        input: "./src/index.ts",
        output: [
            {
                dir: "lib",
                format: "cjs",
            },
        ],
        plugins: [
            commonjs({
                include: /node_modules/
            }),
            typescript({
                tsconfig:'./tsconfig.json'
            }),
            babel({
                babelHelpers: 'bundled',
                babelrc: true,
                // presets: [['@babel/preset-env', { modules: false, loose: true }], ["@babel/preset-react"]],
                plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
                exclude: 'node_modules/**',
            }),
            json(),
            resolve({
                preferBuiltins: true,
                extensions: ['.mjs', '.js', '.json', '.node', '.ts', 'tsx']
            }),
            // terser(),
        ],
    },
];
