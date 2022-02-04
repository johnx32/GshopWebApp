import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "../containers/Dashboard";
import { UserContext } from "../contexts/UserContext";

export default function PrivateRoute(props) {
    const { user } = useContext(UserContext)
    return (<>
        <Dashboard>
            {user ? props.children : <Navigate to='/login' />}
        </Dashboard>
    </>)
}