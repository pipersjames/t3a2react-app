import { useContext, useState } from "react"
import Cookies from 'js-cookie'
import { NavLink, useNavigate} from 'react-router-dom'
import { ApiContext } from "../contexts/ApiProvider"

export default function LoginForm() {
    
    const navigate = useNavigate()
    const { apiUrl } = useContext(ApiContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit  = async (event) => {
        event.preventDefault()
    
        try {
            const response = await fetch(`${apiUrl}/users/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            console.log(response)


            if (response.ok) {
                const data = await response.json()
                const jwt = data.jwt

                Cookies.set('jwt', jwt, { secure: true, sameSite: 'Strict', expires: 3 })

                navigate('/home')

            } else {
                console.error('Authentication failed')
            } 

        } catch (error) {
            console.error(error)
        }
     }


    return (
        <div className="loginContainer pt-sm-2 pt-md-3 pt-lg-4 pt-xl-5 overflow-auto" data-testid="login-form">
    <div className="loginBox row border rounded p-4 mx-sm-5">
        <div className="col-md-6">
            <div className="loginFormContainer p-4">
                <h2 className="text-center">Stream-Lined</h2>
                <h1 className="text-center">Login To Your Account</h1>
                <form 
                    autoComplete="on" 
                    className="loginForm d-flex flex-column" 
                    onSubmit={handleSubmit}
                    >
                    <div className="mb-4 mt-4">
                        <input 
                            type="text" 
                            name="emailInput" 
                            id="emailInput" 
                            value={email} 
                            className="form-control " 
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="password" 
                            name="passwordInput" 
                            id="passwordInput" 
                            value={String(password)} 
                            className="form-control" 
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center mt-3">
                    <NavLink to="url">Forgot your password?</NavLink> {/*url link to account recovery page*/}
                </div>
                <div className="text-center mt-4">
                    <p>Don't have an account? <NavLink to="/create-new-user">Sign up</NavLink></p>
                </div>  
            </div>
        </div>
        <div className="col-md-6">
            <div className="text-center mb-5 border-bottom">
                <h1 className="mb-4  d-none d-md-block">New Here?</h1>
                <p>Unlock potential. Sign up, submit forms, and make things happen!</p>
            </div>
            <ul className="m-5 d-none d-md-block">
                <li>
                    <p>Create new types of forms to incorporate into your workflow</p>
                </li>
                <li>
                    <p>Assign and re-assign tasks to manage workflow</p>
                </li>
                <li>
                    <p>Custom search old form records</p>
                </li>
                <li>
                    <p>Export form data for data analysis</p>
                </li>
            </ul>
        </div>
    </div>
</div>

        
    ) 
}