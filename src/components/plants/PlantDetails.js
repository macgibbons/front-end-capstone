import React, { useContext } from "react"
import "./Plants.css"
import { RoomContext } from "../rooms/RoomProvider";
import { PlantContext } from "./PlantProvider";
import { DayContext } from "../days/DayProvider";

export default (props) => {
    const { plants, deletePlant } = useContext(PlantContext)
    const { rooms } = useContext(RoomContext)
    const { days } = useContext(DayContext)
    
    const chosenPlantId = parseInt(props.match.params.plantId, 10)
    const currentUser = parseInt(localStorage.getItem("currentUser"), 10)

    const plant = plants.find(p => p.id === chosenPlantId) || {}
    const room = rooms.find(r => r.id === plant.roomId) || {}
    const day = days.find(day => day.id === plant.dayId) || {}
    var moment = require('moment')

    if(currentUser !== null) {
        document.body.classList.add("user--loggedIn")
    }

    return (
        <section className="plant--detailCard plant--container">

            <div className="plant--detailHeader">
                <div className="header--buttons">
                    <div className="header detail--header plant--detailName">{ plant.name }</div>
                    <div className="btns">
                        <div className="btn delete--btn"
                            onClick={() => {
                                deletePlant(chosenPlantId)
                                    .then(() => {
                                        props.history.push("/plants")
                                    })
                                }}>
                            <img className="icon" src={require ('./trash.svg')}/>
                        </div>

                        <div className="btn edit--btn"
                            onClick={() => {
                                props.history.push(`/plants/edit/${plant.id}`)
                            }}>
                            <img className="icon" src={require ('./edit.svg')}/>
                        </div>
                    </div>
                </div>

                <div className="sub--header detail--subHeader">
                    { plant.species }
                </div>
            </div>

            <div className="plant--content">
                    <img className="plant--img--detail" src={ (plant.img)}/>
               
        <div className="details--content">

                <div className="card--detailPair">
                    <div className="card--subTitle">Frequency:</div>
                    <span>{plant.waterFrequency}</span>
                </div>

                <div className="card--detailPair">
                    <div className="card--subTitle">Cups of water:</div>
                    <span className="plant--instructions">{ plant.waterAmount } </span>
                </div>

                <div className="card--detailPair">
                    <div className="card--subTitle">Room:</div>
                    <span> { room.roomName } </span>
                </div>
                <div className="card--detailPair">
                    <div className="card--subTitle">Schedule day:</div>
                    <span> { day.day } </span>
                </div>
                <div className="card--detailPair">
                    <div className="card--subTitle">Lighting:</div>
                    <span>{plant.lighting}</span>
                </div>
                <div className="card--detailPair">
                    <div className="card--subTitle">Last watered:</div>
                    <span>{plant.lastWatered ? (moment(plant.lastWatered).format("ddd, MMM Do")) : ("I'm new here!")}</span>
                </div>
                <div className="card--detailPair">
                    <div className="card--subTitle">Notes:</div>
                    <p>{plant.notes}</p>
                </div>

        </div>
            </div>
            
        </section>
    )

}

