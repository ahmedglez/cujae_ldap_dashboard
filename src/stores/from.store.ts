import { create } from 'zustand'
import UserType from '@/types/user.type'

// Define the shape of the store state
interface UserFormStore {
  user: UserType | null | any
  formFields: { [key: string]: string | number | null }
  setUser: (user: UserType | null) => void
  updateField: (key: string, value: string | number | null) => void
  unsaveField: (key: string) => void
  setFormFields: (formFields: any) => void
}

// Create the Zustand store
const useUserFormStore = create<UserFormStore>(set => ({
  user: null,
  formFields: {},
  mails: [],
  setUser: user => set({ user }),
  setFormFields: formFields => set({ formFields }),
  updateField: (key, value) => set(state => ({ formFields: { ...state.formFields, [key]: value } })),
  unsaveField: key =>
    set(state => {
      const updatedUserCopy = { ...state.formFields }
      delete updatedUserCopy[key]
      return { formFields: updatedUserCopy }
    })
}))

export default useUserFormStore
