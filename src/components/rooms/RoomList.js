// this is the component responsible for listing the all the plants in the different rooms

// it needs to separate the plants into the different seven days and you should see which plants are 
// on which days

// this is the component responsible for list ALL of the plants
import React, { useContext } from "react"
// import { LocationContext } from "../location/LocationProvider"
// import { CustomerContext } from "../customer/CustomerProvider"
import "./Rooms.css"
import { RoomContext } from "./RoomProvider";
import { PlantContext } from "../plants/PlantProvider";
import Room from "./Room";

export default (props) => {
    const { rooms } = useContext(RoomContext)
    const { plants } = useContext(PlantContext)
    const currentUser = localStorage.getItem("currentUser")

    const logInCheck = () => {
        if(currentUser === ""){
            window.alert("please log in")
        } else {
            console.log("user is logged in");
            
            updateApplicationView()
        
        }
    }

    const updateApplicationView = () => {
        props.history.push("/plants/create")
    }
    

    return (
        <div className="room--container container">
            <div className="room--header">
                <h1>My Rooms</h1>
                <div className="btn add--btn"
                    onClick={() => props.history.push("/rooms/create")}>
                    <img className="icon" src={require ('./add.svg')}/>
                </div>
            </div>
            <div className="RoomList column">

            {
                rooms.map(room => {

                    
                    const RoomPlants = plants.filter(p => p.roomId === room.id)
                    // const clinic = locations.find(l => l.id === animal.locationId)
                    
                    return <Room {...props} key={room.id}  room={room} RoomPlants={RoomPlants} />
                })                
            }
            
            </div>
        </div>
    )
}   