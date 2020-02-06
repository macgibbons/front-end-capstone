/* This is the component responsible for 
rendering the form that builds a new plant
it needs to take the following information:

Plant Name

Plant Species

Room - dropdown

type - dropdown

day - dropdown

water amount - dropdown

*/

import React, { useContext, useState, useEffect } from "react"
import { RoomContext } from "../rooms/RoomProvider";

export default props => {
    const { addRoom, rooms, updateRoom } = useContext(RoomContext)
    const [room, setRoom] = useState({})

    
    const editMode = props.match.params.hasOwnProperty("roomId")

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newRoom = Object.assign({}, room)
        newRoom[event.target.name] = event.target.value
        setRoom(newRoom)
    }

    const setDefaults = () => {
        if (editMode) {
            const roomId = parseInt(props.match.params.roomId)
            const selectedRoom = rooms.find(r => r.id === roomId) || {}
            setRoom(selectedRoom)
        }
    }

    useEffect(() => {
        setDefaults()
    }, [rooms])

    const constructNewRoom = () => {

            if (editMode) {
                updateRoom({
                    id: room.id,
                    roomName: room.roomName,
                    userId: parseInt(localStorage.getItem("currentUser"))
          
                })
                    .then(() => props.history.push("/rooms"))
            } else {
                addRoom({
                    id: room.id,
                    roomName: room.roomName,
                    userId: parseInt(localStorage.getItem("currentUser"))
                })
                    .then(() => props.history.push("/rooms"))
            }
        
    }

    return (
        <form className="room--form container">
            <h2 className="room--formTitle">{editMode ? "Update Room" : "New Room"}</h2>
            <div className="wrapper">
                <fieldset>
                    <div className="room-form-group">
                        <label htmlFor="roomName">Room Name* </label>
                        <input type="text" name="roomName" required autoFocus className="form-control"
                            proptype="varchar"
                            placeholder="room name.."
                            defaultValue={room.roomName}
                            onChange={handleControlledInputChange}
                            />
                    </div>
                </fieldset>
            </div>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewRoom()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Add Room"}
            </button>
        </form>
    )
}

