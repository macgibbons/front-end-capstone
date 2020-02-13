import React from "react"
import { Link } from "react-router-dom"

export default ({plant, day}) => (
    <section className="plant--card card">

        <div className="plant--header">
            <h3 className="plant--name">
                <Link to={`/plants/${plant.id}`}>
                    { plant.name }
                </Link>
                <div className="plant--species">
                    { plant.species }
                </div>
            </h3>
        </div>

        <img className="plant--img" src={(plant.img)} alt="picture of a plant" />

        <div className="plant--content">
            <p className="plant--instructions">
                water { plant.name } { plant.waterAmount } cups on { day.day }
            </p>
        </div> 
        
    </section>
)




