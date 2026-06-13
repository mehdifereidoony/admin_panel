import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({redirectTo = "/login"})=>{
    const {isLoading, isAuthenticated} = useAuth()
    
    if(isLoading){
        return <p>loading...</p>
    }
    return isAuthenticated ? (<Outlet />) : (<Navigate to={redirectTo} />)
    
}

export default ProtectedRoute;