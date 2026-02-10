import type { ThemeConfig } from './restaurant.ts'

function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
}

export function applyTheme(theme: ThemeConfig): void {
  const root = document.documentElement
  for (const [key, value] of Object.entries(theme)) {
    root.style.setProperty(`--${camelToKebab(key)}`, value)
  }
}
