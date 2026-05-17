import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    //function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    }
    //function to clear user data
    const clearUser = () => {
        setUser(null);
    }

    const value = {
        user,
        updateUser,
        clearUser,
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )

}

export default UserProvider;
