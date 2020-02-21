import React, { useRef } from "react"
import { Link } from "react-router-dom";
import "./Login.css"


const Login = props => {
    const email = useRef()
    const password = useRef()
    const userName = useRef()
    const address = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return user[0]
                }
                return false
            })
    }

    

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists && exists.password === password.current.value) {
                    localStorage.setItem("currentUser", exists.id)
                    props.history.push("/")
                } else if (exists && exists.password !== password.current.value) {
                    window.alert("Password does not match")
                } else if (!exists) {
                   window.alert("User does not exist")
                }
            })
    }

    return (
        <>
        <main className="container--login">
            <h1 className="header login--page--header">fern</h1>
            <div className="login--page--subheader">Soil, water, sun. Repeat</div>
            <section className="login">
                <form className="form--login" onSubmit={handleLogin}>
                    <div className="header login--header">welcome</div>
                    <fieldset className="loginfieldset">
                        <input ref={email} type="email"
                            id="email"
                            className="loginInput"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="loginfieldset">
                        <input className="loginInput" ref={password} type="password"
                            id="password"
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset className="loginfieldset">
                        <button type="submit">
                            Sign in
                    </button>
                    </fieldset>
            <section className="not-a-member">
                <span> Not a member? </span><Link className="link--register"to="/register">Sign up!</Link>
            </section>
                </form>
            </section>
        </main>
            <img className="plant1" src={require ('./plant1.svg')}/>
            <img className="plant2" src={require ('./plant2.svg')}/>
            <img className="plant4" src={require ('./plant4.svg')}/>
            <img className="plant3" src={require ('./plant3.svg')}/>
            </>
    )
}
export default Login