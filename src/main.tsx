import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  App,
  setupApp
} from '@/app'

const container = document.getElementById('root')

if (!container) {
  throw new Error('В index.html нет элемента #root')
}

setupApp()

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
)
