import Cookies from "js-cookie"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ApiContext } from "../contexts/ApiProvider"

export default function CreateAccount() {
  
  const navigate = useNavigate()

  const { apiUrl } = useContext(ApiContext) 

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

      console.log(newUserData)

      try {
          const response = await fetch(apiUrl + "/users/create-new-user", {
              method: "POST",
              headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify(newUserData)
          })

          if (response.ok) {
              const data = await response.json()
              console.log(data)
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
    <div className="createAccountContainer pt-sm-2 pt-md-3 pt-lg-4 pt-xl-5">
      <div className="container">
    <div className="row justify-content-center border rounded p-4">
      <div className="col-md-5">
        <h2 className="text-center mt-3">Stream-Lined</h2>
        <h1 className="text-center mt-2 mb-5">Create New Account</h1>
        <form autoComplete="on" className="newUserForm" onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="fnameInput"
              placeholder="First Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
            <label htmlFor="fnameInput" className="custom-colorchange">First Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="lnameInput"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
            <label htmlFor="lnameInput" className="custom-colorchange">Last Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="emailInput"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="emailInput" className="custom-colorchange">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="passwordInput" className="custom-colorchange">Password</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="passwordConfirmInput"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <label htmlFor="passwordConfirmInput" className="custom-colorchange">Confirm Password</label>
          </div>
          <div className="text-center mb-3 ">
              <button type="submit" className="btn btn-primary btn-lg">
              Create New Account
              </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
);
}