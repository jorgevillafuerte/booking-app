import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { applyTheme } from './config/theme.ts'
import { defaultConfig } from './config/restaurant.ts'
import { I18nProvider } from './i18n/I18nContext.tsx'
import './index.css'
import App from './App.tsx'

applyTheme(defaultConfig.theme)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
)
