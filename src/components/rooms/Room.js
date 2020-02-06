// this the component responsible for the individual cards that will be shown on the 
// ROOM tab
// This will build the component that is rendered on the dom for every plant
//  it needs to show plant.name
// plant.scientific_name
// water amount


// ***stretch**
// a button to mark as completed
// an image

import React from "react"
import { Link } from "react-router-dom"

export default ({room, RoomPlants}) => (
    <section className="">

        <div className="room--header">
            <h3 className="plant--name">
                    { room.roomName }
            </h3>
        </div>
        <div>
            {
                RoomPlants.map(p =>
                    <div>{p.name}</div>)
            }
        </div>
        {/* <div className="plant--content">
            <p className="plant--instructions">
                water { plant.name } { plant.waterAmount } cups on { plant.waterDay }
            </p>
        </div> */}
        
        
    </section>
)




