import React, { useContext, useState, useEffect } from "react"
import { PlantContext } from "./PlantProvider";
import { RoomContext } from "../rooms/RoomProvider";
import { DayContext } from "../days/DayProvider";

export default props => {
    const { rooms } = useContext(RoomContext)
    const { addPlant, plants, updatePlant } = useContext(PlantContext)
    const { days } = useContext(DayContext)
    
    const [plant, setPlant] = useState({})
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    
    const currentUser = parseInt(localStorage.getItem("currentUser"), 10)
    const currentUserRooms = rooms.filter(r => r.userId == currentUser)
    
    const editMode = props.match.params.hasOwnProperty("plantId")
    if(currentUser !== null) {
        document.body.classList.add("user--loggedIn")
    }

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newPlant = Object.assign({}, plant)
        newPlant[event.target.name] = event.target.value
        setPlant(newPlant)}

    const setDefaults = () => {
        if (editMode) {
            const plantId = parseInt(props.match.params.plantId)
            const selectedPlant = plants.find(a => a.id === plantId) || {}
            setPlant(selectedPlant)
            }
        }

    useEffect(() => {
        setDefaults()
    }, [plants])

    const constructNewPlant = () => {
        // form validation -- making sure all required fields are filled out
        const roomId = parseInt(plant.roomId)
        if ( plant.roomId === undefined  ) {
            window.alert("Please select a room")
        } else if  ( plant.waterDay === undefined){
            window.alert("Please select a day")
        } else if (plant.name === undefined ) {
            window.alert("Please give your plant a name")
        } else if (plant.waterAmount === undefined ) {
            window.alert("Please specifiy a water amount")
        } else {
            if (editMode) {
                updatePlant({
                    id: plant.id,
                    name: plant.name,
                    species: plant.species,
                    lighting: plant.lighting,
                    waterAmount: plant.waterAmount,
                    waterFrequency: plant.waterFrequency,
                    dayId: parseInt(plant.waterDay),
                    userId: parseInt(localStorage.getItem("currentUser")),
                    roomId: roomId,
                    notes: plant.notes,
                    lastWatered: plant.lastWatered,
                    isCompleted: false,
                    img: plant.img
          
                })
                    .then(() => props.history.push("/plants"))
            } else {
                if (parseInt(plant.roomId) === NaN) {
                   window.alert("please select a room")
                   
                } else {

                    addPlant({
                        id: plant.id,
                        name: plant.name,
                        species: plant.species,
                        lighting: plant.lighting,
                        waterAmount: plant.waterAmount,
                        waterFrequency: plant.waterFrequency,
                        dayId: parseInt(plant.waterDay),
                        userId: parseInt(localStorage.getItem("currentUser")),
                        roomId: roomId,
                        notes: plant.notes,
                        lastWatered: "",
                        isCompleted: false,
                        img:  image === ""  ?  ("https://res.cloudinary.com/dizvtfdgm/image/upload/v1581437088/plants/xn9h0ezjur4z3b4k0jbp.jpg") : (image) 
                    })
                        .then(() => props.history.push("/plants"))
                }
           }
        }
    }


 
// this code POSTs the image to cloudinary and sets the state of loading when the image is loading 
// as well as the state of the image
  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'plants')
    setLoading(true)
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dizvtfdgm/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()

    setImage(file.secure_url)
    setLoading(false)
  }

  


    return (
        <form className="plant--form container">
            <h2 className="plant--formTitle header detail--header">{editMode ? "Update Plant" : "New Plant"}</h2>
            <div className="wrapper">
                <div className="plant-form-pair">
                    <fieldset>
                        <div className="plant-form-group">
                            {/* <label htmlFor="name">Plant Name* </label> */}
                            <input type="text" name="name" required autoFocus className="form-control-type1"
                                proptype="varchar"
                                placeholder="plant name.."
                                defaultValue={plant.name}
                                onChange={handleControlledInputChange}
                                />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="plant-form-group">
                            {/* <label htmlFor="species">Plant Species* </label> */}
                            <input type="text" name="species" required className="form-control-type1"
                                proptype="varchar"
                                placeholder="species..."
                                defaultValue={plant.species}
                                onChange={handleControlledInputChange}
                                />
                        </div>
                    </fieldset>
                </div>
            </div>

            <div className="plant-form-pair">

                <fieldset>
                    <div className="form-group">
                        {/* <label htmlFor="roomId">room: </label> */}
                        <select name="roomId" className="form-control-type1"
                            proptype="int"
                            value={plant.roomId}
                            onChange={handleControlledInputChange}>

                            <option value="0">Select a room</option>
                            {currentUserRooms.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.roomName}
                                </option>
                            ))}
                        
                        </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        {/* <label htmlFor="lighting">lighting* </label> */}
                        <select name="lighting" className="form-control-type1"
                            proptype="int"
                            value={plant.lighting}
                            onChange={handleControlledInputChange}>

                            <option value="0">Select a lighting</option>
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                            
                        
                        </select>
                    </div>
                </fieldset>

            </div>

            <div className="plant-form-pair">

                <fieldset>
                    <div className="form-group">
                        {/* <label htmlFor="waterDay">what day?* </label> */}
                        <select name="waterDay" className="form-control-type1"
                            proptype="int"
                            defaultValue={plant.DayId}
                            onChange={handleControlledInputChange}>

                            <option value="0">Select a day</option>
                            {days.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.day}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        {/* <label htmlFor="waterFrequency">Frequency* </label> */}
                        <select name="waterFrequency" className="form-control-type1"
                            proptype="varchar"
                            value={plant.waterFrequency}
                            onChange={handleControlledInputChange}>

                            <option value="0">how often?</option>
                            <option value="once a week">once a week</option>
                            <option value="once every other week">once every other week</option>
                            <option value="once a month">once a month</option>
                        </select>
                    </div>
                </fieldset>

            </div>

            <fieldset>
                <div className="plant-water-pair">

                <div className="form-group water">
                    {/* <label htmlFor="waterAmount">how much water? </label> */}
                    <input type="text" name="waterAmount" className="form-control-type1"
                        proptype="varchar"
                        placeholder="How much water"
                        value={plant.waterAmount}
                        onChange={handleControlledInputChange}/>
                        
                </div>
                <div className="cups">Cups</div>
            </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="notes">Notes: </label>
                    <textarea type="text" name="notes" className="form-control-type1"
                        proptype="varchar"
                        value={plant.notes}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>
            
            <div className="image--upload" >
                
                {editMode ? 
                
                    <img src={plant.img} style={{ width: '300px' }} /> 
                
                :

                    <input
                        className="form-control-type2"
                        type="file"
                        name="file"
                        placeholder="Upload an image"
                        onChange={uploadImage}
                    />
                
                }
                {loading ? (
                    <h3>Loading...</h3>
                ) : (
                    <img src={image} style={{ width: '300px' }} />
                )}
            </div>
            
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewPlant()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Add Plant"}
            </button>
            
        </form>
    )
}

