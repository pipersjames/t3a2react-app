import Cookies from "js-cookie"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CreateAccount() {
    
    const navigate = useNavigate()


    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const handleSubmit  = async (event) => {
        event.preventDefault()

        if (password !== passwordConfirm) {
            window.alert("password did not match, please try again")
            return
        }

        const newUserData = {
            fname : fname,
            lname: lname,
            email: email,
            password: password 
        }

        try {
            const response = await fetch("https://stream-linedd-8391d4c8cf39.herokuapp.com/users/create-new-user", {
               method: "POST",
               headers: {
                "Content-Type": "application/json",
               },
               body: JSON.stringify(newUserData)
            })

            if (response.ok) {
                const data = await response.json()
                const token = data.token

                Cookies.set('jwt', token, { secure: true, sameSite: 'Strict', expires: 7 })

                navigate('/')

            } else {
                console.error('Authentication failed')
            } 

        } catch (error) {
            console.error(error)
        }
     }
    return (
        <div className="createUserContainer">
            <h2>Stream-Lined</h2>
            <h1>Create New Account</h1>
            <form autoComplete="on" className="newUserForm" onSubmit={handleSubmit}>
                <input type="text" 
                    name="fname" 
                    id="fnameInput" 
                    value={fname} 
                    className="newUserInputs"
                    onChange={(e) => setFname(e.target.value)}
                />
                <input type="text" 
                    name="lname" 
                    id="lnameInput" 
                    value={lname} 
                    className="newUserInputs"
                    onChange={(e) => setLname(e.target.value)}
                />
                <input type="text" 
                    name="email" 
                    id="emailInput" 
                    value={email} 
                    className="newUserInputs"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    name="password" 
                    id="passwordInput" 
                    value={password} 
                    className="newUserInputs"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                    type="password" 
                    name="passwordconfirm" 
                    id="passwordConfirmInput" 
                    value={passwordConfirm} 
                    className="newUserInputs"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <input 
                    type="submit" 
                    value="submit"
                    className="loginButton"
                />
            </form>
        </div>
    ) 
}