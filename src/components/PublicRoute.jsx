import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function PublicRoute(props) {
    const {user} = useContext(UserContext)
    return user?<Navigate to='/'/>:props.children
}