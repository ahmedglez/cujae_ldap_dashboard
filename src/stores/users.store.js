// userStore.js
import { create } from 'zustand'

const useUserStore = create(set => ({
  users: [], // To store all users
  searchInput: '', // For the search input
  pagination: {
    page: 1,
    rowsPerPage: 25
  },
  filters: {
    userType: 'ALL',
    area: 'ALL'
  },
  // Update the users state
  setUsers: users => set({ users: users }),

  // Update the search input state
  setSearchInput: searchInput => set({ searchInput }),

  // Update the pagination state
  setPagination: pagination => set({ pagination }),

  // Update filter optionsx
  setFilters: newFilters => set(state => ({ filters: { ...state.filters, ...newFilters } }))
}))

export default useUserStore
