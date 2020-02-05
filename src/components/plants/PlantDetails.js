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

export default (props) => {
    const { plants, deletePlant } = useContext(PlantContext)
    const { rooms } = useContext(RoomContext)
    /*
        This line of code will be explained in the next
        section of the chapter.
    */
    const chosenPlantId = parseInt(props.match.params.plantId, 10)

    const plant = plants.find(p => p.id === chosenPlantId) || {}
    const room = rooms.find(r => r.id === plant.roomId) || {}

    return (
        <section className="plant--detailCard container">
            <div className="plant--detailHeader">
                <h3 className="plant--detailName">{ plant.name }</h3>
                    <div className="plant--detailSpecies">
                        { plant.species }
                    </div>
            </div>
            <div className="plant--room">Room </div>
            <div className="plant--content">
                <p className="plant--instructions">
                    { plant.name } lives in the { room.roomName } and likes to be water { plant.waterAmount } cups of water every { plant.waterDay }
                </p>
            </div>
            
            <div className="">

                <button onClick={() => {
                    props.history.push(`/plants/edit/${plant.id}`)
                }}>Edit</button>

                <button className="btn--delete"
                            onClick={() => {
                                deletePlant(chosenPlantId)
                                    .then(() => {
                                        props.history.push("/plants")
                                    })
                        }}
                >delete</button>
            </div>
        </section>
    )

}

