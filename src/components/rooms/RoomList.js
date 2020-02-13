import React, { useContext } from "react"
import "./Rooms.css"
import { RoomContext } from "./RoomProvider";
import { PlantContext } from "../plants/PlantProvider";
import Room from "./Room";
import { DayContext } from "../days/DayProvider";

export default (props) => {
    const { rooms } = useContext(RoomContext)
    const { plants } = useContext(PlantContext)
    const { days } = useContext(DayContext)
    const currentUser = parseInt(localStorage.getItem("currentUser"), 10)
    const currentUserRooms = rooms.filter(r => r.userId === currentUser)

    
    const logInCheck = () => {
        if(currentUser === ""){
            window.alert("please log in")
        } else {
            console.log("user is logged in");
            
            updateApplicationView()
        
        }
    }

    const updateApplicationView = () => {
        props.history.push("/rooms/create")
    }

    return (
        <div className="plant--container container">
            <div className="room--header">
                <h1>My Rooms</h1>
                <div className="btn add--btn"
                    onClick={() => {logInCheck()}}>
                    <img className="icon" src={require ('./add.svg')}/>
                </div>
            </div>
            <div className="roomList column">

            {
                currentUserRooms.map(room => {

                    
                    const RoomPlants = plants.filter(p => p.roomId === room.id)
                    
                    return <Room {...props} key={room.id}  room={room} RoomPlants={RoomPlants}  />
                })                
            }
            
            </div>
        </div>
    )
}   