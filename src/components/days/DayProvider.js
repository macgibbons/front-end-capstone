import React, { useState, useEffect } from "react"


export const DayContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const DayProvider = (props) => {
    const [days, setDays] = useState([])

    const getDays = () => {
        return fetch("http://localhost:8088/days")
            .then(res => res.json())
            .then(setDays)
    }



    /*
        Load all Days when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */

    useEffect(() => {
        getDays()
    }, [])

    useEffect(() => {
        console.log("****  DAY APPLICATION STATE CHANGED  ****")
    }, [days])

    return (
        <DayContext.Provider value={{
            days
        }}>
            {props.children}
        </DayContext.Provider>
    )
}
