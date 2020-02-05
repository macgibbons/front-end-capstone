import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export default (props) => {
    return (
    <>
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/plants/create">add a Plant</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/plants">My Plants</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/rooms">My Rooms</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/days">Days</Link>
            </li>

                {
                    localStorage.getItem("currentUser")
                        ? <li className="navbar__item">
                            <Link className="navbar__link"
                                to=""
                                onClick={e => {
                                    e.preventDefault()
                                    localStorage.removeItem("currentUser")
                                    props.history.push("/")
                                }}
                            >Logout</Link>
                        </li>
                        : ""
                }
        </ul>
    </>
    )
}

