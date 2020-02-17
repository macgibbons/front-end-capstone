import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { PlantContext } from "../plants/PlantProvider";

export default ({plant, day}) => {
const { patchPlant } = useContext(PlantContext);
var moment = require('moment')

return (
    <section className="plant--card card" className={plant.isCompleted ? "plant--card card completed" : "plant--card card"}>
        <div className="plant--header" className={plant.isCompleted ? "completed" : "notCompleted"}>
            <h3 className="plant--name">
                <Link to={`/plants/${plant.id}`}>
                    { plant.name }
                </Link>
                <div className="plant--species">
                    { plant.species }
                </div>
            </h3>
        </div>
        <img className={plant.isCompleted ? "completed-img plant--img" : "plant--img"} src={ (plant.img)}/>
        <div className="plant--content">
            <p className="plant--instructions">
                water { plant.name } { plant.waterAmount } cups on { day.day }
                <div>{plant.waterFrequency}</div>
            </p>
            <div className="plant--watered--on">
                <h4>last watered on </h4>
                <span>{plant.lastWatered ? (moment(plant.lastWatered).format("ddd, MMM Do")) : ("I'm new here, and have never been watered")}</span>
            </div>
            <div className="checkbox">
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




