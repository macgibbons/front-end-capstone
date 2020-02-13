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
        <main className="container--login">
            <section className="login">
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>TITLE</h1>
                    <h2>log in</h2>
                    <fieldset className="loginfieldset">
                        <label className="loginLabel" htmlFor="inputEmail"> Email address </label>
                        <input ref={email} type="email"
                            id="email"
                            className="loginInput"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="loginfieldset">
                        <label className="loginLabel" htmlFor="inputPassword"> Password </label>
                        <input className="loginInput" ref={password} type="password"
                            id="password"
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset className="loginfieldset">
                        <button type="submit">
                            log in
                    </button>
                    </fieldset>
                </form>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
            </section>
        </main>
    )
}
export default Login