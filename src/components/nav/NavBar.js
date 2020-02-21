import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export default (props) => {
    return (
    <>
        <section className="navbar">
        <div className="header nav--header">fern</div>
            <div className="login--page--subheader">Soil, water, sun. Repeat</div>
            <div className="navbar__item nav--pair">
                <Link className="navbar__link" to="/plants/create">Add Plant
                </Link>
                <img className="icon--nav" src={require ('./add.svg')}/>
            </div>
            <section className="logout--pair">
                <section className="main--nav">
                    <div className="navbar__item active">
                        <Link className="navbar__link" to="/">Dashboard</Link>
                    </div>
                    <div className="navbar__item">
                        <Link className="navbar__link" to="/plants">My plants</Link>
                    </div>
                    <div className="navbar__item">
                        <Link className="navbar__link" to="/rooms">My rooms</Link>
                    </div>
                    <div className="navbar__item">
                        <Link className="navbar__link" to="/days">Schedule</Link>
                    </div>

                </section>

                    {
                        localStorage.getItem("currentUser")
                            ? <div className="navbar__item logout">
                                <Link className="navbar__link"
                                    to=""
                                    onClick={e => {
                                        e.preventDefault()
                                        localStorage.removeItem("currentUser")
                                        props.history.push("/")
                                        document.body.classList.remove("user--loggedIn")
                                    }}
                                >Logout</Link>
                            </div>
                            : ""
                    }
            </section>
        </section>
    </>
    )
}

