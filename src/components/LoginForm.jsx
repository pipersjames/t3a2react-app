import { useState } from "react"
import Cookies from 'js-cookie'
import { useNavigate} from 'react-router-dom'

export default function LoginForm() {
    
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit  = async (event) => {
        event.preventDefault()

        navigate('/')
    
    //     try {
    //         const response = await fetch("apiEndPoint/login")

    //         if (response.ok) {
    //             const data = await response.json()
    //             const token = data.token

    //             Cookies.set('jwt', token, { secure: true, sameSite: 'Strict', expires: 7 })

    //             history.push('/')

    //         } else {
    //             console.error('Authentication failed')
    //         } 

    //     } catch (error) {
    //         console.error(error)
    //     }
     }


    return (
        <div className="loginFormContainer">
            <h2>Stream-Lined</h2>
            <h1>Login To Your Account</h1>
            <form autoComplete="on" className="loginForm" onSubmit={handleSubmit}>
                <input type="text" 
                name="emailInput" 
                id="emailInput" 
                value={email} 
                className="loginInputs"
                onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                type="text" 
                name="passwordInput" 
                id="passwordInput" 
                value={password} 
                className="loginInputs"
                onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                type="submit" 
                value="submit"
                className="loginButton"
                />
            </form>
            <a href="url">Forgot your password?</a> {/*url link to account recovery page*/ }
        </div>
    ) 
}