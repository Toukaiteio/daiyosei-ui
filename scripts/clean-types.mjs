import { rmSync } from 'node:fs'

try {
  rmSync('dist/types', { recursive: true, force: true })
} catch (error) {
  if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
    process.exit(0)
  }
  throw error
}
