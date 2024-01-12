import { createContext, useState } from "react";
export const UserContext = createContext("");

const UserContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("userData") ? true : false
    );
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("userData"))
    );

    const [eventsData, setEventsData] = useState([]);
    const [Signupdata, setSignupdata] = useState([]);
    const [contingentdata,setContingentdata]=useState([]);


    return (
        <UserContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                Signupdata,
                setSignupdata,
                eventsData,
                setEventsData,
                user,
                setUser,
                contingentdata,
                setContingentdata,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
