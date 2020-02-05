import React from "react"
import { Route } from "react-router-dom"
import { PlantProvider } from "./plants/PlantProvider";
import PlantList from "./plants/PlantList";

export default (props) => {
    return (
        <>
            <PlantProvider>
                <Route exact path="/plants" render ={
                                props => <PlantList {...props} />
                            }/>
            </PlantProvider>
        </>
    )
}

