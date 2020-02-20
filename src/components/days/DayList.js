import React, { useContext } from "react"
import "./Days.css"
import { PlantContext } from "../plants/PlantProvider";
import { DayContext } from "./DayProvider";
import Day from "./Day";

export default (props) => {
    const { days } = useContext(DayContext)
    const { plants } = useContext(PlantContext)
    const currentUser = parseInt(localStorage.getItem("currentUser"), 10)
    const currentUserPlants = plants.filter(p => p.userId === currentUser)

    
    if(currentUser !== null) {
        document.body.classList.add("user--loggedIn")
    }

    return (
        <div className="plant--container container">
            
            <div className="dayList column">

            {
                days.map(day=> {

                    
                    const DayPlants = currentUserPlants.filter(p => p.dayId === day.id)
                    
                    return <Day {...props} key={day.id}  day={day} DayPlants={DayPlants} />
                })                
            }
            
            </div>
        </div>
    )
}   