import React, { useContext, useState } from "react"
import { DayContext } from "../days/DayProvider";
import { PlantContext } from "../plants/PlantProvider";
import { UserContext } from "../users/UserProvider";
import  "./Today.css"
import TodayComponent from "./TodayComponent";

export default (props) => {
    const { users } = useContext(UserContext)
    const { plants, patchPlant } = useContext(PlantContext)
    const { days } = useContext(DayContext)
    const [ watering, setWatering ] = useState(false)
    const [ plantsToBeWatered, setPlantsToBeWatered ] = useState(0)
    const currentUser = parseInt(localStorage.getItem("currentUser"), 10)
    const currentUserName = users.find(u => u.id === currentUser) || {}
    const currentUserPlants = plants.filter(p => p.userId === currentUser)
    var moment = require('moment')

    // function to find the long form of todays date
    const Today = new Date()
    

    // grabbing the number of the day of the week sunday = 0, monday = 1, etc. 
    const dayOfWeek = Today.getDay()

    // finding the corrisponding day from my database useing the id of the day vs the number of the day of the week
    const currentDay = days.find(d => d.id === dayOfWeek) || {}

    // going into the day object and grabbing the name of the day of the week
    const nameOfToday = currentDay.day

    // filtering through the users plants to find which plants need to be watered today. 
    const todaysPlants = currentUserPlants.filter(p => p.dayId === currentDay.id)
    
    //  finding all of the unwatered plants with a biweekly schedule
    let biweeklyPlants =[]

    todaysPlants.map(plant => {
        if(plant.waterFrequency === "once every other week" && moment(plant.lastWatered).add(14, 'days') <= moment(Date.now()) ){
            biweeklyPlants.push(plant) 
        }
    })

    //  finding all of the unwatered plants with a weekly schedule
    let weeklyPlants =[]

    todaysPlants.map(plant => {
        if(plant.waterFrequency === "once a week"){
             if(moment(plant.lastWatered).add(7, 'days') <= moment(Date.now()) || plant.lastWatered === "" ){
            weeklyPlants.push(plant) 
        }}
    })

    //  finding all of the unwatered plants with a monthly schedule
    let monthlyPlants =[]

    todaysPlants.map(plant => {
        if(plant.waterFrequency === "once a month"){
            if( moment(plant.lastWatered).add(28, 'days') <= moment(Date.now()) || plant.lastWatered === "" ){
                monthlyPlants.push(plant) 
        }}
    })

    // this combines all of the different plant arrays into one of plants that need to be watered today!
    const waterThesePlantsToday = weeklyPlants.concat(biweeklyPlants).concat(monthlyPlants)

    // this is the patch function that will update a plant as not watered after a certain amount of days
    // so that the user knows it's time to rewater it. 
    const patchPlantsAsNotCompleted = (plant) => {
        const updatePlantAsNotCompleted = {
            id: plant.id,
            isCompleted: false
        };
        patchPlant(updatePlantAsNotCompleted)
    }

    // here we are mapping over all of the user's plants and checking which ones are watered
    // then we are seeing which ones are over due weekly, biweekly, and monthly 
    currentUserPlants.map( plant =>{
        if(plant.isCompleted === true){
            if(plant.waterFrequency === "once a week"){
                if(moment(plant.lastWatered).add(7, 'days') <= moment(Date.now()) ){
               patchPlantsAsNotCompleted(plant)
        }} else if (
            plant.waterFrequency === "once every other week"){
                if(moment(plant.lastWatered).add(14, 'days') <= moment(Date.now()) ) {
                    patchPlantsAsNotCompleted(plant)
        }} else if (
            plant.waterFrequency === "once a month"){
            if(moment(plant.lastWatered).add(28, 'days') <= moment(Date.now()) ) {
                patchPlantsAsNotCompleted(plant)
        }} 
        }
    })


    // this function loops over the plants to water today and patches the isCompleted to true
    // as well as updates the lastwatered date
    const markAllAsWatered = () => {
        waterThesePlantsToday.map(
            plant =>
         {
            if(plant.isCompleted === false){
                const updatePlantAsCompleted = {
                  id: plant.id,
                  lastWatered: Date.now(),
                  isCompleted: true
                };
            patchPlant(updatePlantAsCompleted)}
        }
      )
    }

    const markOtherDaysAsUnwatered = () => {
       const notTodaysPlants= currentUserPlants.filter(plant => plant.dayId !== currentDay.id)
       notTodaysPlants.map(
        plant =>
            
        {
           if(plant.isCompleted === true){
               
               const updatePlantAsNotCompleted = {
                 id: plant.id,
                 isCompleted: false
               };
               patchPlant(updatePlantAsNotCompleted)}
           }
       )
    }

    return (
        <div className="plant--container">
            <h1 onChange={()=> {markOtherDaysAsUnwatered()}}>{nameOfToday}</h1>
            <h1>Welcome back {currentUserName.name}!</h1>
            <div>{watering ? 
                (<h3>Congratulations! All of your plants are watered </h3>) :
                (<h3>You have  {waterThesePlantsToday.length} {waterThesePlantsToday.length > 1 ? "plants" : "plant"} to water today</h3>)}
            </div>
            <div className="checkbox">
                <input type="checkbox" name="species"  className="form-control" onChange={()=>{markAllAsWatered()
                markOtherDaysAsUnwatered()
                setWatering(true)}}
                     />

                <label htmlFor="checkbox">mark as all as watered </label>
            </div>
          
            <div className="todayList column">

            {
                waterThesePlantsToday.map(plant => {
                    
                    const day = days.find(d => d.id === plant.dayId)
                    

                    return <TodayComponent key={plant.id} plant={plant} day={day} />
                })          
            }
            
            </div>
        </div>
    )
}