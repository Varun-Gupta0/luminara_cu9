import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".",
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
<<<<<<<< HEAD:frontend/vite.config
        secure: false
      }
    }
  }
});
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
})
========
        secure: false,
      },
    },
  },
});
>>>>>>>> mayankc:frontend/vite.config.js
