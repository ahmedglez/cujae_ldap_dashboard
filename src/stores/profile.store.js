import { create } from 'zustand'

const initialState = {
  user: null
}

const useProfileStore = create(set => ({
  ...initialState,

  login: user => set({ user }),
  logout: () => set({ user: null })
}))

if (typeof window !== 'undefined') {
  // Load the state from local storage (if available)
  const persistedState = JSON.parse(localStorage.getItem('profileStoreState'))
  useProfileStore.setState(state => ({ ...state, ...persistedState }))

  // Subscribe to state changes and save the state to local storage
  useProfileStore.subscribe(
    state => {
      // Save only the parts of the state you want to persist
      const persistedState = {
        user: state.user
      }
      localStorage.setItem('profileStoreState', JSON.stringify(persistedState))
    },
    state => state // Select which parts of the state to subscribe to
  )
}

export default useProfileStore
