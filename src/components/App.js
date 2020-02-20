import React from "react"
import { Route, Redirect } from "react-router-dom"
import ApplicationViews from "./ApplicationViews"
import NavBar from "./nav/NavBar"
import Login from "./auth/Login"
import Register from "./auth/Register"
import "./App.css"
// import "./normalize.css"
// import "./skeleton.css"

export default () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("currentUser")) {
                return (
                    <>
                        <section className="main--view">
                            <Route render={props => <NavBar {...props} />} />
                            <Route render={props => <ApplicationViews {...props} />} />
                        </section>
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
    </>
)