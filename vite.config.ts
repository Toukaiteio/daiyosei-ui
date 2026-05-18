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
        'components/HeaderNav': resolve(__dirname, 'src/components/HeaderNav/index.ts'),
        'components/SideNav': resolve(__dirname, 'src/components/SideNav/index.ts'),
        'components/SectionHero': resolve(__dirname, 'src/components/SectionHero/index.ts'),
        'components/SectionCards': resolve(__dirname, 'src/components/SectionCards/index.ts'),
        'components/SectionComponents': resolve(__dirname, 'src/components/SectionComponents/index.ts'),
        'components/Button': resolve(__dirname, 'src/components/Button/index.ts'),
        'components/Input': resolve(__dirname, 'src/components/Input/index.ts'),
        'components/Badge': resolve(__dirname, 'src/components/Badge/index.ts'),
        'components/Modal': resolve(__dirname, 'src/components/Modal/index.ts'),
        'components/Select': resolve(__dirname, 'src/components/Select/index.ts'),
        'components/Textarea': resolve(__dirname, 'src/components/Textarea/index.ts'),
        'components/Switch': resolve(__dirname, 'src/components/Switch/index.ts'),
        'components/Tabs': resolve(__dirname, 'src/components/Tabs/index.ts'),
        'components/Toast': resolve(__dirname, 'src/components/Toast/index.ts'),
        'components/Menu': resolve(__dirname, 'src/components/Menu/index.ts'),
        'components/SubMenu': resolve(__dirname, 'src/components/SubMenu/index.ts'),
        'components/FileUpload': resolve(__dirname, 'src/components/FileUpload/index.ts'),
        'components/SketchbookPhotoCard': resolve(__dirname, 'src/components/SketchbookPhotoCard/index.ts'),
        'components/ImageCard': resolve(__dirname, 'src/components/ImageCard/index.ts'),
        'components/InfiniteScroll': resolve(__dirname, 'src/components/InfiniteScroll/index.ts'),
        'components/Tag': resolve(__dirname, 'src/components/Tag/index.ts'),
        'components/Pagination': resolve(__dirname, 'src/components/Pagination/index.ts'),
        'components/Filter': resolve(__dirname, 'src/components/Filter/index.ts'),
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
