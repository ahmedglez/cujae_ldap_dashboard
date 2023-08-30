// userStore.js
import { create } from 'zustand'

const useUserStore = create(set => ({
  users: [], // To store all users
  activeUsers: [], // To store active users
  searchInput: '', // For the search input
  pagination: null,
  filters: [],

  // Update the users state
  setUsers: users => set({ users }),

  // Update the active users state
  setActiveUsers: activeUsers => set({ activeUsers }),

  // Update the search input state
  setSearchInput: searchInput => set({ searchInput }),

  // Update the pagination state
  setPagination: pagination => set({ pagination }),

  // Update filter optionsx
  setFilters: newFilters => set(state => ({ filters: { ...state.filters, ...newFilters } })),

  getFilteredUsers: () => {
    const { users, filters } = useUserStore.getState()
    const filteredUsers = users.filter(user => {
      // Apply filters based on filter options
      if (filters.isActive && !user.isActive) {
        return false
      }
      if (filters.userType && user.userType !== filters.userType) {
        return false
      }
      // Add more filter conditions as needed
      return true
    })
    return filteredUsers
  }
}))

export default useUserStore
