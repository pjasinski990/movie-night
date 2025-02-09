import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://movie_night_backend:5000',
                changeOrigin: true,
            },
            '/uploads': {
                target: 'http://movie_night_backend:5000',
                changeOrigin: true,
            },
        },
    },
});
