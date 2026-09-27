import {
  Component,
  type ErrorInfo,
  type ReactNode
} from 'react'

import { Button } from '@/shared/ui'

import styles from './ErrorBoundary.module.scss'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true
    }
  }

  componentDidCatch(error: Error, { componentStack }: ErrorInfo) {
    console.error(error, componentStack)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>Что-то пошло не так</h1>
          <p className={styles.text}>
            Перезагрузите страницу и попробуйте ещё раз
          </p>
          <Button
            size="medium"
            onClick={this.handleReload}
          >
            Перезагрузить
          </Button>
        </div>
      </div>
    )
  }
}
