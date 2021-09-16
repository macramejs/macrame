import typescript from '@rollup/plugin-typescript';

export default {
    input: 'packages/macrame-vue3/src/index.js',
    output: {
        file: 'packages/macrame-vue3/dist/index.js',
        format: 'cjs',
    },
    plugins: [typescript()],
};
