import '@/shared/styles/global.scss'

import {
  ErrorBoundary,
  QueryProvider
} from './providers'
import { AppRouter } from './router'

export function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </ErrorBoundary>
  )
}
