import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',      // fake browser environment so React can render in tests
    globals: true,             // lets us use test/expect/vi without importing them
    setupFiles: './src/setupTests.js',
  },
})
