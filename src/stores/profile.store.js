import {create} from "zustand";

const initialState = {
	user: null,
};

const useProfileStore = create((set) => ({
	...initialState,

	login: (user) => set({ user }),
	logout: () => set({ user: null }),
}));

export default useProfileStore;
