export type Theme = 'blue' | 'dark'

export type EffectKey = 'grain' | 'scanlines' | 'glitch'

export interface EffectsState {
  grain: boolean
  scanlines: boolean
  glitch: boolean
}

export interface DialConfig {
  min: number
  max: number
  initial: number
  unit: string
  label: string
}

export interface AvatarCardData {
  index: number
  label: string
  scribblePath?: string
  scribbleFrames?: string[]
  isImageFilled?: boolean
}

export interface SliderConfig {
  id: string
  label: string
  min: number
  max: number
  step: number
  initial: number
  unit?: string
}

export interface TableColumn {
  key: string
  label: string
}
