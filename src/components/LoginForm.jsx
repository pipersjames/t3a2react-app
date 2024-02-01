
export default function LoginForm() {
    
    return (
        <div className="loginForm">
            <h2>Stream-Lined</h2>
            <h1>Login To Your Account</h1>
            <form autoComplete="on">
                <input type="text" name="emailInput" id="emailInput" value="Email"/>
                <input type="text" name="passwordInput" id="passwordInput" value="Password"/>
                <input type="submit" value="submit"/>
            </form>
            <a href="url">Forgot your password?</a> {/*url link to account recovery page*/ }
        </div>
    ) 
}