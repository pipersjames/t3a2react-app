import Cookies from "js-cookie"
import { useContext } from "react"
import { ApiContext } from "../contexts/ApiProvider"


export default function CompletedForm() {
    //cookies
    const jwt = Cookies.get('jwt')
    //contexts
    const {apiUrl} = useContext(ApiContext)
    
    return (
        null
    )
}