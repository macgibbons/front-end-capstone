import React from "react"
import { Route } from "react-router-dom"
import { PlantProvider } from "./plants/PlantProvider";
import PlantList from "./plants/PlantList";
import PlantDetails from "./plants/PlantDetails";
import { RoomProvider } from "./rooms/RoomProvider";
import PlantForm from "./plants/PlantForm";
import RoomList from "./rooms/RoomList";
import RoomForm from "./rooms/RoomForm";
import { DayProvider } from "./days/DayProvider";
import DayList from "./days/DayList";
import TodayList from "./today/TodayList";
import { UserProvider } from "./users/UserProvider";

export default (props) => {
    return (
        <>
            <PlantProvider>
                <RoomProvider>
                    <DayProvider>
                        <UserProvider>

                        {/****        TODAY        ****/}

                        <Route exact path="/" render ={
                            props => <TodayList {...props} />
                        }/>

                        {/****        PLANTS       ****/}
                        <Route exact path="/plants" render ={
                            props => <PlantList {...props} />
                        }/>
                        <Route path="/plants/:plantId(\d+)" render={
                            props => <PlantDetails {...props} />
                        } />
                        <Route exact path="/plants/create" render = {
                            props => <PlantForm {...props} />
                        } />
                        <Route path="/plants/edit/:plantId(\d+)" render={
                            props => <PlantForm {...props} />
                        } />

                        {/****        ROOMS       ****/}
                        <Route exact path="/rooms" render ={
                            props => <RoomList {...props} />
                        }/>
                        <Route exact path="/rooms/create" render = {
                            props => <RoomForm {...props} />
                        } />
                        <Route path="/rooms/edit/:roomId(\d+)" render={
                            props => <RoomForm {...props} />
                        } />
                        
                        {/****        DAYS       ****/}
                         <Route exact path="/days" render ={
                                props => <DayList {...props} />
                                    }/>
                        </UserProvider>
                    </DayProvider>
                </RoomProvider>
            </PlantProvider>
        </>
    )
}



