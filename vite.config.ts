import { defineConfig } from 'vitest/config'

export default defineConfig({
  base: '/carto/',
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      all: true,
      include: ['src/**'],
      exclude: ['src/main.ts'],
    },
  },
})
