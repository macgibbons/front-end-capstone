import React from "react"
import { Link } from "react-router-dom"

var moment = require('moment')
export default ({plant, day}) => (
    <section className="plant--card card">

        <div className="plant--header">
            <h3 className="plant--name">
                <Link  className="header card--header" to={`/plants/${plant.id}`}>
                    { plant.name }
                </Link>
                <div className="cardSub--header">
                    { plant.species }
                </div>
            </h3>
        </div>

        <img className="plant--img" src={(plant.img)} alt="picture of a plant" />

        <div className="plant--cardDetails">

            <div className="card--detailPair">
                <div className="card--subTitle">Frequency:</div>
                <span>{plant.waterFrequency}</span>
            </div>

            <div className="card--detailPair">
                <div className="card--subTitle">Cups of water:</div>
                <span className="plant--instructions">{ plant.waterAmount } </span>
            </div>

            <div className="card--detailPair">
                <div className="card--subTitle">Schedule day:</div>
                <span> { day.day } </span>
            </div>
            <div className="card--detailPair">
                <div className="card--subTitle">Last watered:</div>
                <span>{plant.lastWatered ? (moment(plant.lastWatered).format("ddd, MMM Do")) : ("I'm new here!")}</span>
            </div>

        </div>
        
    </section>
)




