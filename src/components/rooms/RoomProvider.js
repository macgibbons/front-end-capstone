import React, { useState, useEffect } from "react"


export const RoomContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const RoomProvider = (props) => {
    // this is the name of the data in the entireity of the application!! (locations)
    const [rooms, setRooms] = useState([])

    const getRooms = () => {
        return fetch("http://localhost:8088/rooms")
            .then(res => res.json())
            .then(setRooms)
    }

    const addRoom = room => { 
        return fetch("http://localhost:8088/rooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(room)
        })
            .then(getRooms)
    }

    const updateRoom = room => {
        return fetch(`http://localhost:8088/rooms/${room.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(room)
        })
            .then(getRooms)
    }

    const deleteRoom = roomId => {
        return fetch(`http://localhost:8088/rooms/${roomId}`, {
            method: "DELETE"
        })
            .then(getRooms)
    }
    /*
        Load all Rooms when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getRooms()
    }, [])

    useEffect(() => {
        console.log("****  ROOM APPLICATION STATE CHANGED  ****")
    }, [rooms])

    return (
        <RoomContext.Provider value={{
            rooms, addRoom, deleteRoom, updateRoom
        }}>
            {props.children}
        </RoomContext.Provider>
    )
}

