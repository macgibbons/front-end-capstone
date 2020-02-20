import React, { useContext } from "react"
import "./Days.css"
import { DayContext } from "./DayProvider";
import Plant from "../plants/Plant";

export default ({day, DayPlants, history }) => (
    <section className="day--container">
        <div className="day--header">
            <div className="header content--header">
                    { day.day }
            </div>
        </div>

        <div className="dayPlantList">
            {
                DayPlants.map(plant =>
                    {
                        const { days } = useContext(DayContext)
                        const day = days.find(d => d.id === plant.dayId)
                
                        return (
                            <Plant key={plant.id} plant={plant} day={day} />
                        
                    )

                    }
                )}
        </div>
    </section>
)




