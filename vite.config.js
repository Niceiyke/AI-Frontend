
// vite.config.js
import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
      define: {
        "process.env.BASEURL": JSON.stringify(env.BASEURL),

        // If you want to exposes all env variables, which is not recommended
        // 'process.env': env
      },
      plugins: [react()],
    };
});

