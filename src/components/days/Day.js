import React, { useContext } from "react"
// import { Link } from "react-router-dom"
import "./Days.css"
import { DayContext } from "./DayProvider";

export default ({day, DayPlants, history }) => (
    <section className="">
        <div className="room--header">
            <h3 className="plant--name">
                    { day.day }
            </h3>
        </div>

        <div>
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




