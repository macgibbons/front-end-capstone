import React, { useRef } from "react"
import "./Login.css"

const Register = props => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return true
                }
                return false
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            existingUserCheck()
                .then(() => {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            password: password.current.value,
                            name: `${firstName.current.value} ${lastName.current.value}`
                        })
                    })
                        .then(_ => _.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("currentUser", createdUser.id)
                                props.history.push("/")
                            }
                        })
                })
        } else {
            window.alert("Passwords do not match")
        }
    }

    return (
        <main className="container--login">
            <section className="register--login">
                <form className="form--login" onSubmit={handleRegister}>
                    <div className="header register--header">welcome to fern!</div>
                    <div className="header">Please create an account</div>
                    <fieldset className="loginfieldset">
                        <input ref={firstName} type="text"
                            name="firstName"
                            className="registerInput"
                            placeholder="First name"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="loginfieldset">
                        <input ref={lastName} type="text"
                            name="lastName"
                            className="registerInput"
                            placeholder="Last name"
                            required />
                    </fieldset>
                    <fieldset className="loginfieldset">
                        <input ref={email} type="email"
                            name="email"
                            className="registerInput"
                            placeholder="Email address"
                            required />
                    </fieldset>
                    <fieldset className="loginfieldset">
                        <input ref={password} type="password"
                            name="password"
                            className="registerInput"
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset className="loginfieldset">
                        <input ref={verifyPassword} type="password"
                            name="verifyPassword"
                            className="registerInput"
                            placeholder="Verify password"
                            required />
                    </fieldset>
                    <fieldset className="loginfieldset">
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
        </main>
    )
}

export default Register