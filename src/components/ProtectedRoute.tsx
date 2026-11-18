import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute(){
    const { currentUser, loading} = useAuth()

    if (loading){
        return <p>Loading...</p>;

    }

    if (!currentUser){ 
        return <Navigate to="/login" replace/>
    }

    return <Outlet/>
}