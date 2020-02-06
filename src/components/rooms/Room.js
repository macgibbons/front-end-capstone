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
import "./Rooms.css"

export default ({room, RoomPlants, history }) => (
    <section className="">
        <div className="room--header">
            <h3 className="plant--name">
                    { room.roomName }
            </h3>

            <div className="btn edit--btn"
                            onClick={() => {
                                history.push(`/rooms/edit/${room.id}`)
                            }}>
                <img className="icon" src={require ('../icons/edit.svg')}/>
            </div>
        </div>

        <div>
            {
                RoomPlants.map(p =>
                    <div>{p.name}</div>)
            }
        </div>
       
    </section>
)




