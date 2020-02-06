import React, { useState, useEffect } from "react"


export const PlantContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const PlantProvider = (props) => {
    // this is the name of the data in the entireity of the application!! (locations)
    const [plants, setPlants] = useState([])

    const getPlants = () => {
        return fetch("http://localhost:8088/plants?_expand=room&_expand=day")
            .then(res => res.json())
            .then(setPlants)
    }

    const addPlant = plant => { 
        return fetch("http://localhost:8088/plants", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(plant)
        })
            .then(getPlants)
    }

    const updatePlant = plant => {
        return fetch(`http://localhost:8088/plants/${plant.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(plant)
        })
            .then(getPlants)
    }

    const deletePlant = plantId => {
        return fetch(`http://localhost:8088/plants/${plantId}`, {
            method: "DELETE"
        })
            .then(getPlants)
    }
    /*
        Load all Plants when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getPlants()
    }, [])

    useEffect(() => {
        console.log("****  PLANT APPLICATION STATE CHANGED  ****")
    }, [plants])

    return (
        <PlantContext.Provider value={{
            plants, addPlant, deletePlant, updatePlant
        }}>
            {props.children}
        </PlantContext.Provider>
    )
}

// it also needs to expand on room and Day
