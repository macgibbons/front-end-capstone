// this is the component responsible for list ALL of the plants
import React, { useContext } from "react"
import { PlantContext } from "./PlantProvider";
import Plant from "./Plant"
import "./Plants.css"
import { DayContext } from "../days/DayProvider";

export default (props) => {
    const { plants } = useContext(PlantContext)
    const { days } = useContext(DayContext)
    const currentUser = parseInt(localStorage.getItem("currentUser"), 10)
    const currentUserPlants = plants.filter(p => p.userId == currentUser)

    console.log(currentUser);

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
        <div className="plant--container">
            <h1>My Plants</h1>
          
            <div className="plantList column">

            {
                currentUserPlants.map(plant => {

                    
                    // const owner = customers.find(c => c.id === animal.customerId)
                    const day = days.find(d => d.id === plant.dayId)

                    return <Plant key={plant.id} plant={plant} day={day} />
                })                
            }
            
            </div>
        </div>
    )
}