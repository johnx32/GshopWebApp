import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "../containers/Dashboard";
import { UserContext } from "../contexts/UserContext";

const PrivateRoute = (props)=> {
    useEffect(()=> console.log('useEffect PrivateRoute'))
    const { user } = useContext(UserContext)
    return (<>
        <Dashboard>
            {user ? props.children : <Navigate to='/login' />}
        </Dashboard>
    </>)
}
export default PrivateRoute