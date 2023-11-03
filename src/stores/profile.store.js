import { create } from 'zustand'

const initialState = {
  user: null,
  isLoggedIn: false,
  avatar: null,
  isAdmin: false,
  isSuperAdmin: false,
  roles: [],
  last_time_logged: null,
  uid: null,
  groups: [],
  base: null,
  baseDN: null
}

const useProfileStore = create(set => ({
  ...initialState,

  login: (user, last_time_logged = null, uid = null, groups = [], base = null, baseDN = null, roles = []) =>
    set(state => ({
      ...state,
      user,
      isLoggedIn: true,
      isAdmin: roles.includes('admin'),
      isSuperAdmin: roles.includes('superadmin'),
      roles: roles,
      last_time_logged: last_time_logged,
      uid: uid,
      groups: groups,
      base: base,
      baseDN: baseDN
    })),
  logout: () => {
    set(state => ({
      ...state,
      user: null,
      isLoggedIn: false
    })),
      localStorage.removeItem('jwtToken')
    localStorage.removeItem('profileStoreState')
  },
  setAvatar: (
    avatar // Add the setAvatar function to the store
  ) =>
    set(state => ({
      ...state,
      avatar
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
        isLoggedIn: state.isLoggedIn,
        avatar: state.avatar,
        isAdmin: state.isAdmin,
        uid: state.uid,
        groups: state.groups,
        base: state.base,
        baseDN: state.baseDN
      }
      localStorage.setItem('profileStoreState', JSON.stringify(persistedState))
    },
    state => ({
      user: state.user,
      isLoggedIn: state.isLoggedIn,
      avatar: state.avatar,
      isAdmin: state.isAdmin,
      uid: state.uid,
      groups: state.groups,
      base: state.base,
      baseDN: state.baseDN
    })
  )
}

export default useProfileStore
