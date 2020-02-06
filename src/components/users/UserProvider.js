import React, { useState, useEffect } from "react"


export const UserContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const UserProvider = (props) => {
    // this is the name of the data in the entireity of the application!! (locations)
    const [users, setUsers] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then(setUsers)
    }



    /*
        Load all users when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        console.log("****  USER APPLICATION STATE CHANGED  ****")
    }, [users])

    return (
        <UserContext.Provider value={{
            users
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
