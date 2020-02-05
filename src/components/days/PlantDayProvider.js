import React, { useState, useEffect } from "react"


export const PlantDayContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const PlantDayProvider = (props) => {
    // this is the name of the data in the entireity of the application!! (locations)
    const [plantDays, setPlantDays] = useState([])

    const getPlantDays = () => {
        return fetch("http://localhost:8088/plantDays")
            .then(res => res.json())
            .then(setPlantDays)
    }

    const addPlantDay = plantDay => { 
        return fetch("http://localhost:8088/plantDays", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(plantDay)
        })
            .then(getPlantDays)
    }

    const updatePlantDay = plantDay => {
        return fetch(`http://localhost:8088/plantDays/${plantDay.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(plantDay)
        })
            .then(getPlantDays)
    }

    const deletePlantDay = plantDayId => {
        return fetch(`http://localhost:8088/plantDays/${plantDayId}`, {
            method: "DELETE"
        })
            .then(getPlantDays)
    }
    /*
        Load all PlantDays when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getPlantDays()
    }, [])

    useEffect(() => {
        console.log("****  PLANTDAY APPLICATION STATE CHANGED  ****")
    }, [plantDays])

    return (
        <PlantDayContext.Provider value={{
            plantDays, addPlantDay, deletePlantDay, updatePlantDay
        }}>
            {props.children}
        </PlantDayContext.Provider>
    )
}

