import { type App } from 'vue'
import * as components from './components'

export function createDaiyoseiPlugin(options?: { prefix?: string }) {
  const prefix = options?.prefix || ''
  return {
    install: (app: App) => {
      for (const [name, component] of Object.entries(components)) {
        app.component(`${prefix}${name}`, component)
      }
    },
  }
}
