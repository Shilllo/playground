import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
    plugins: [react(), nodePolyfills({})],
    base: '/playground/',
    resolve: {
        alias: {
            buffer: 'buffer/',
        },
    },
    optimizeDeps: {
        include: ['buffer'],
    },
    define: {
        global: 'window',
    },
});
