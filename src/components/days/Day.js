import React from "react"
import { Link } from "react-router-dom"
import "./Days.css"

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
                    <div>{p.name}</div>)
            }
        </div>
       
    </section>
)




