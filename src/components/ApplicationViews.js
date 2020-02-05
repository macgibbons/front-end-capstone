import React from "react"
import { Route } from "react-router-dom"
import { PlantProvider } from "./plants/PlantProvider";
import PlantList from "./plants/PlantList";
import PlantDetails from "./plants/PlantDetails";
import { RoomProvider } from "./rooms/RoomProvider";

export default (props) => {
    return (
        <>
            <PlantProvider>
                <RoomProvider>
                    <Route exact path="/plants" render ={
                                    props => <PlantList {...props} />
                                }/>
                    <Route path="/plants/:plantId(\d+)" render={
                                    props => <PlantDetails {...props} />
                                } />
                </RoomProvider>
            </PlantProvider>
        </>
    )
}

