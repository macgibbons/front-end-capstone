import React from "react"
import { Route } from "react-router-dom"
import { PlantProvider } from "./plants/PlantProvider";
import PlantList from "./plants/PlantList";
import PlantDetails from "./plants/PlantDetails";
import { RoomProvider } from "./rooms/RoomProvider";
import PlantForm from "./plants/PlantForm";
import RoomList from "./rooms/RoomList";

export default (props) => {
    return (
        <>
            <PlantProvider>
                <RoomProvider>
                    <Route exact path="/plants" render ={
                            props => <PlantList {...props} />
                                }/>
                    <Route exact path="/rooms" render ={
                            props => <RoomList {...props} />
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
                </RoomProvider>
            </PlantProvider>
        </>
    )
}



