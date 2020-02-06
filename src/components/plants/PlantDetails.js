// this is the component that will be rendered when the name of a plant
// on the plant card is clicked
// it needs to show the same info plus
// what day the plant is to be watered on
// what room its in
// and the notes
import React, { useContext } from "react"
import "./Plants.css"
import { RoomContext } from "../rooms/RoomProvider";
import { PlantContext } from "./PlantProvider";
import { DayContext } from "../days/DayProvider";

export default (props) => {
    const { plants, deletePlant } = useContext(PlantContext)
    const { rooms } = useContext(RoomContext)
    const { days } = useContext(DayContext)
    /*
        This line of code will be explained in the next
        section of the chapter.
    */
    const chosenPlantId = parseInt(props.match.params.plantId, 10)

    const plant = plants.find(p => p.id === chosenPlantId) || {}
    const room = rooms.find(r => r.id === plant.roomId) || {}
    const day = days.find(day => day.id === plant.dayId) || {}

    return (
        <section className="plant--detailCard container">
            <div className="plant--detailHeader">
                <div className="header--buttons">
                    <h3 className="plant--detailName">{ plant.name }</h3>
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


                    <div className="plant--detailSpecies">
                        { plant.species }
                    </div>
            </div>
            <div className="plant--content">
                <p className="plant--instructions">
                    { plant.name } lives in the { room.roomName } and likes to be water { plant.waterAmount } cups of water every { day.day }
                </p>
            </div>
            
            
        </section>
    )

}

