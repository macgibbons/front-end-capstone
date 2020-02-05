// This will build the component that is rendered on the dom for every plant
//  it needs to show plant.name
// plant.scientific_name
// water amount


// ***stretch**
// a button to mark as completed
// an image

import React from "react"
import { Link } from "react-router-dom"

export default ({plant}) => (
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
        <div className="plant--content">
            <p className="plant--instructions">
                water { plant.name } { plant.waterAmount } cups on { plant.waterDay }
            </p>
        </div>
        
        
    </section>
)




