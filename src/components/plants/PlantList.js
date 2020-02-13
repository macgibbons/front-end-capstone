import React, { useContext } from "react"
import { PlantContext } from "./PlantProvider";
import Plant from "./Plant"
import "./Plants.css"
import { DayContext } from "../days/DayProvider";

export default (props) => {
    // ***** CONTEXT *****
    const { plants } = useContext(PlantContext)
    const { days } = useContext(DayContext)

    // ***** USER *****
    const currentUser = parseInt(localStorage.getItem("currentUser"), 10)
    const currentUserPlants = plants.filter(p => p.userId === currentUser)

   
    return (
        <div className="plant--container">
            <h1>My Plants</h1>
          
            <div className="plantList column">

            {
                currentUserPlants.map(plant => {

                    
                    const day = days.find(d => d.id === plant.dayId)

                    return <Plant key={plant.id} plant={plant} day={day} />
                })                
            }
            
            </div>
        </div>
    )
}