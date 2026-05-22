import { defineConfig } from 'vitest/config'

export default defineConfig({
  base: '/carto/',
  test: {
    environment: 'happy-dom',
  },
})
