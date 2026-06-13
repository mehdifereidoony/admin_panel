import { useEffect, useState } from "react"
import { checkTokenValidity } from "../services/authService";
import { getToken, removeToken } from "../utils/authToken";

export const useAuth = ()=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        const verifyAuth = async()=>{
            const token = getToken();
            if(!token){
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }
             try{
                const checkToken = await checkTokenValidity();
                const isValid = checkToken.status == 200 ? true : false;
                setIsAuthenticated(isValid)
             }catch(error){
                setIsAuthenticated(false);
                removeToken()
             }finally{
                setIsLoading(false)
             }
        }
        verifyAuth()

    },[])
    return {isLoading, isAuthenticated}
}