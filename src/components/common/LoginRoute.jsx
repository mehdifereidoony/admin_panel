import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const LoginRoute = ()=>{
        const {isLoading, isAuthenticated} = useAuth()
    if(isLoading){
        return <p>loading...</p>
    }
    return isAuthenticated ? (<Navigate to="/dashboard" />) : (<Outlet />)
}

export default LoginRoute;