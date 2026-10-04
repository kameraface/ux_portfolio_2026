import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/libre-baskerville/400.css'
import '@fontsource/libre-baskerville/400-italic.css'
import '@fontsource/libre-baskerville/700.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import './styles/tokens.css'
import './styles/global.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
