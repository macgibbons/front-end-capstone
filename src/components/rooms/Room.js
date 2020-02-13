

import React, { useContext } from "react"
import "./Rooms.css"
import { DayContext } from "../days/DayProvider";

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

        <div className= "roomPlantList">
            {
                RoomPlants.map(p =>
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
                    )
            }
        </div>
       
    </section>
)




