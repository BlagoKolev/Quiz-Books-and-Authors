import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [score, setScore] = useState();

    return (
        <UserContext.Provider value={{user,setUser, score, setScore}}>
            {children}
        </UserContext.Provider>
    )
}