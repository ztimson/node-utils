import {resolve} from 'path';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	build: {
		lib: {
			entry: resolve(process.cwd(), 'src/index.ts'),
			name: 'node-utils',
			fileName: (format: string) => format === 'es' ? 'index.mjs' : 'index.cjs'
		},
		rollupOptions: {
			external: [
				'child_process',
				'readline'
			],
		},
		emptyOutDir: true,
		minify: false,
		sourcemap: true
	},
	plugins: [dts()],
});
