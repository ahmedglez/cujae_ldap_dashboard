import { create } from 'zustand'

const initialState = {
  user: null,
  isLoggedIn: false // Add isLoggedIn property to initial state
}

const useProfileStore = create(set => ({
  ...initialState,

  login: user =>
    set(state => ({
      ...state,
      user,
      isLoggedIn: true // Set isLoggedIn to true when user is logged in
    })),
  logout: () =>
    set(state => ({
      ...state,
      user: null,
      isLoggedIn: false // Set isLoggedIn to false when user is logged out
    }))
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
        user: state.user,
        isLoggedIn: state.isLoggedIn // Persist the isLoggedIn property
      }
      localStorage.setItem('profileStoreState', JSON.stringify(persistedState))
    },
    state => ({ user: state.user, isLoggedIn: state.isLoggedIn }) // Select which parts of the state to subscribe to
  )
}

export default useProfileStore
