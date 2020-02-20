import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { PlantContext } from "../plants/PlantProvider";

export default ({plant, day}) => {
const { patchPlant } = useContext(PlantContext);
var moment = require('moment')

return (
    <section className="plant--card card" className={plant.isCompleted ? "plant--card card completed" : "plant--card card"}>
        <div className="plant--header" className={plant.isCompleted ? "completed" : "notCompleted"}>
            <div className="plant--name ">
                <Link className="header card--header" to={`/plants/${plant.id}`}>
                    { plant.name }
                </Link>
            </div>
                <div className="cardSub--header plant--species">
                    { plant.species }
                </div>
        </div>
        <img className={plant.isCompleted ? "completed-img plant--img" : "plant--img"} src={ (plant.img)}/>
        <div className="plant--content">
            
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
            
            <div className="checkbox2">
                <input type="checkbox" name="species" required className="form-control" 
                onClick={() => {
                    const updatePlantAsCompleted = {
                      id: plant.id,
                      lastWatered: Date.now(),
                      isCompleted: true
                    };
                    patchPlant(updatePlantAsCompleted)}}/>
                <label htmlFor="checkbox">mark as watered </label>
            </div>
        </div>
        
        
    </section>
)}




