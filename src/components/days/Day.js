import React, { useContext } from "react"
import "./Days.css"
import { DayContext } from "./DayProvider";

export default ({day, DayPlants, history }) => (
    <section className="day--container">
        <div className="day--header">
            <div className="header content--header">
                    { day.day }
            </div>
        </div>

        <div className="dayPlantList">
            {
                DayPlants.map(p =>
                    {
                        const { days } = useContext(DayContext)
                        const day = days.find(d => d.id === p.dayId)
                
                        return (
                            
                        <>
                        <div className="card">
                            <div>{p.name}</div>
                            <p> {p.species}</p>
                            <img className="plant--img" src={ (p.img)}/>
                            <div>
                                <p>{p.waterAmount} cups every {day.day} </p>
                            </div>
                        </div>
                        </>
                    )

                    }
                )}
        </div>
    </section>
)




