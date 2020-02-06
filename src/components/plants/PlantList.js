// this is the component responsible for list ALL of the plants
import React, { useContext } from "react"
import { PlantContext } from "./PlantProvider";
// import { LocationContext } from "../location/LocationProvider"
// import { CustomerContext } from "../customer/CustomerProvider"
import Plant from "./Plant"
import "./Plants.css"

export default (props) => {
    const { plants } = useContext(PlantContext)
    const currentUser = parseInt(localStorage.getItem("currentUser"), 10)
    const currentUserPlants = plants.filter(p => p.userId == currentUser)

    console.log(currentUser);

    const logInCheck = () => {
        if(currentUser === ""){
            window.alert("please log in")
        } else {
            console.log("user is logged in");
            
            updateApplicationView()
        
        }
    }

    const updateApplicationView = () => {
        props.history.push("/plants/create")
    }
    

    return (
        <div className="plants container">
            <h1>My Plants</h1>
          
            <div className="plantList column">

            {
                currentUserPlants.map(plant => {

                    
                    // const owner = customers.find(c => c.id === animal.customerId)
                    // const clinic = locations.find(l => l.id === animal.locationId)

                    return <Plant key={plant.id} plant={plant} />
                })                
            }
            
            </div>
        </div>
    )
}