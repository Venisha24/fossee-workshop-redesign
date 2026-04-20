// Import Vite configuration helper
import { defineConfig } from "vite";

// Import React plugin for Vite (enables JSX, Fast Refresh, etc.)
import react from "@vitejs/plugin-react";

// Export Vite configuration
export default defineConfig({

  // Register plugins used in the project
  plugins: [react()],

  // Development server settings
  server: {
    host: true,    // Allows access from network (useful for mobile testing or LAN sharing)
  },

  // Build-related optimizations
  build: {
    target: "es2020",   // Sets JavaScript target for modern browsers

    // Customize bundling behavior using Rollup options
    rollupOptions: {
      output: {

        // Split vendor libraries into a separate chunk for better caching
        manualChunks: { vendor: ["react", "react-dom", "react-router-dom"] },
      },
    },
  },
});
