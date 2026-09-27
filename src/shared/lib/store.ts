import {
  create,
  type StateCreator
} from 'zustand'

const resets = new Set<() => void>()

export function onSessionReset(reset: () => void) {
  resets.add(reset)
}

export function createSessionStore<T>(initializer: StateCreator<T>) {
  const store = create<T>()(initializer)

  onSessionReset(() => {
    const initialState = store.getInitialState()

    store.setState(initialState, true)
  })

  return store
}

export function resetSession() {
  resets.forEach((reset) => {
    reset()
  })
}
