
export default function LoginForm() {
    
    return (
        <div className="loginFormContainer">
            <h2>Stream-Lined</h2>
            <h1>Login To Your Account</h1>
            <form autoComplete="on" className="loginForm">
                <input type="text" 
                name="emailInput" 
                id="emailInput" 
                value="Email" 
                className="loginInputs"
                />
                <input 
                type="text" 
                name="passwordInput" 
                id="passwordInput" 
                value="Password" 
                className="loginInputs"
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