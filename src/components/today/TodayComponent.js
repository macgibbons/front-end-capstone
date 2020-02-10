// This will build the component that is rendered on the dom for every plant
//  it needs to show plant.name
// plant.scientific_name
// water amount


// ***stretch**
// a button to mark as completed
// an image

import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { PlantContext } from "../plants/PlantProvider";

export default ({plant, day}) => {
const { patchPlant } = useContext(PlantContext);
return (
    <section className="plant--card card">
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
        <img className="plant--img" src={ (plant.img)}/>
        <div className="plant--content">
            <p className="plant--instructions">
                water { plant.name } { plant.waterAmount } cups on { day.day }
            </p>
            <div className="checkbox">
                <input type="checkbox" name="species" required className="form-control" 
                onClick={() => {
                    const updatePlantAsCompleted = {
                      id: plant.id,
                      isCompleted: true
                    };
                    patchPlant(updatePlantAsCompleted)}}/>
                <label htmlFor="checkbox">mark as watered </label>
            </div>
        </div>
        
        
    </section>
)}




