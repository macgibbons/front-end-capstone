

import React, { useContext } from "react"
import "./Rooms.css"
import { DayContext } from "../days/DayProvider";
import { Link } from "react-router-dom"

var moment = require('moment')
export default ({room, RoomPlants, history }) => (
    
    <section className="">
        <div className="room--header sub--header">
            <h3 className="">
                    { room.roomName }
            </h3>

            <div className="btn edit--btn"
                onClick={() => {
                    history.push(`/rooms/edit/${room.id}`)
                }}>
                <img className="icon edit--icon" src={require ('../icons/edit.svg')}/>
            </div>
        </div>

        <div className= "roomPlantList">
            {
                RoomPlants.map(plant =>
                {
                    const { days } = useContext(DayContext)
                    const day = days.find(d => d.id === plant.dayId)

                    return (
                        
                    <>
                    <section className="plant--card card">

                        <div className="plant--header">
                            <h3 className="plant--name">
                                <Link  className="header card--header" to={`/plants/${plant.id}`}>
                                    { plant.name }
                                </Link>
                                <div className="cardSub--header">
                                    { plant.species }
                                </div>
                            </h3>
                        </div>

                        <img className="plant--img" src={(plant.img)} alt="picture of a plant" />

                        <div className="plant--cardDetails">

                            <div className="card--detailPair">
                                <div className="card--subTitle">Frequency:</div>
                                <span>{plant.waterFrequency}</span>
                            </div>

                            <div className="card--detailPair">
                                <div className="card--subTitle">Cups of water:</div>
                                <span className="plant--instructions">{ plant.waterAmount } </span>
                            </div>

                            <div className="card--detailPair">
                                <div className="card--subTitle">Schedule day:</div>
                                <span> { day.day } </span>
                            </div>
                            <div className="card--detailPair">
                                <div className="card--subTitle">Last watered:</div>
                                <span>{plant.lastWatered ? (moment(plant.lastWatered).format("ddd, MMM Do")) : ("I'm new here!")}</span>
                            </div>
                            
                        </div>



                        </section>
                    </>
                )
                }
                    )
            }
        </div>
       
    </section>
)




