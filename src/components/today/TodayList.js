// this is the component responsible for list ALL of the plants
import React, { useContext } from "react"
// import Plant from "../plants/Plant"
import { DayContext } from "../days/DayProvider";
import { PlantContext } from "../plants/PlantProvider";
import { UserContext } from "../users/UserProvider";
import  "./Today.css"
import TodayComponent from "./TodayComponent";

export default (props) => {
    const { users } = useContext(UserContext)
    const { plants } = useContext(PlantContext)
    const { days } = useContext(DayContext)
    const currentUser = parseInt(localStorage.getItem("currentUser"), 10)
    const currentUserName = users.find(u => u.id === currentUser) || {}
    const currentUserPlants = plants.filter(p => p.userId == currentUser)

    // function to find the long form of todays date
    const Today = new Date()
    console.log(Today);
    

    // grabbing the number of the day of the week sunday = 0, monday = 1, etc. 
    const dayOfWeek = Today.getDay()

    // finding the corrisponding day from my database useing the id of the day vs the number of the day of the week
    const currentDay = days.find(d => d.id === dayOfWeek) || {}

    // going into the day object and grabbing the name of the day of the week
    const nameOfToday = currentDay.day

    // filtering through the users plants to find which plants need to be watered today. 
    const todaysPlants = currentUserPlants.filter(p => p.dayId === currentDay.id)
    


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
        <div className="plant--container">
            <h1>{nameOfToday}</h1>
            <h1>Welcome back {currentUserName.name}!</h1>
            <h3>You have {todaysPlants.length} plants to water today.</h3>
            <div className="checkbox">
                <input type="checkbox" name="species" required className="form-control" onClick= {() => {}} />
                <label htmlFor="checkbox">mark as all as watered </label>
            </div>
          
            <div className="todayList column">

            {
                todaysPlants.map(plant => {

                    const day = days.find(d => d.id === plant.dayId)

                    return <TodayComponent key={plant.id} plant={plant} day={day} />
                })                
            }
            
            </div>
        </div>
    )
}