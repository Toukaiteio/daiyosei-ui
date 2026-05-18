import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: {
        'daiyosei-ui': resolve(__dirname, 'src/index.ts'),
        'components/GlobalOverlays': resolve(__dirname, 'src/components/GlobalOverlays/index.ts'),
        'components/Sidebar': resolve(__dirname, 'src/components/Sidebar/index.ts'),
        'components/TopNav': resolve(__dirname, 'src/components/TopNav/index.ts'),
        'components/SectionHero': resolve(__dirname, 'src/components/SectionHero/index.ts'),
        'components/SectionCards': resolve(__dirname, 'src/components/SectionCards/index.ts'),
        'components/SectionComponents': resolve(__dirname, 'src/components/SectionComponents/index.ts'),
        'composables/useTheme': resolve(__dirname, 'src/composables/useTheme.ts'),
        'composables/useEffects': resolve(__dirname, 'src/composables/useEffects.ts'),
        'composables/useClock': resolve(__dirname, 'src/composables/useClock.ts'),
        'composables/useHud': resolve(__dirname, 'src/composables/useHud.ts'),
        'composables/useDialDrag': resolve(__dirname, 'src/composables/useDialDrag.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'daiyosei-ui.css'
          return assetInfo.name!
        },
      },
    },
  },
})
