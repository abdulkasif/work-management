import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
	const [userInfo, setUserInfo] = useState(() => {
		const savedUser = localStorage.getItem('user');
		return savedUser ? JSON.parse(savedUser) : {};
	});

	useEffect(() => {
		if (userInfo?.email) {
			localStorage.setItem('user', JSON.stringify(userInfo));
		} else {
			localStorage.removeItem('user');
		}
	}, [userInfo]);

	return (
		<UserContext.Provider value={{ userInfo, setUserInfo }}>
			{children}
		</UserContext.Provider>
	);
}
