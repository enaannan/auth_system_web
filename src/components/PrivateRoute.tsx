import { JSX, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}:{children:JSX.Element})=>{
    const auth = useContext(AuthContext);
    return( auth?.accessToken ? children : <Navigate to="/login"/>
    )
}
export default PrivateRoute