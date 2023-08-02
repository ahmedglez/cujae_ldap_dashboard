// useLoggedIn.js

import { useEffect } from "react";
import useProfileStore from "src/stores/profile.store";
import { useRouter } from "next/dist/client/router";

const useLoggedIn = () => {
	const router = useRouter();
	const isLoggedIn = useProfileStore((state) => state.user !== null);

	useEffect(() => {
		if (isLoggedIn) {
			router.push("/");
		}
	}, [isLoggedIn]);

	return isLoggedIn;
};

export default useLoggedIn;
