import { useSelector } from "react-redux";

export const useAuth = () => {
  const {
    data: user,
    isLoading,
    error,
    authStatus,
  } = useSelector((state) => state.user);

  const isAuthenticated = authStatus === "authenticated";

  console.log(`
    user:${user} \n
    isLoading:${isLoading} \n
    error:${error} \n
    authStatus:${authStatus} \n`)

  return {
    user,
    isLoading,
    error,
    authStatus,
    isAuthenticated,
  };
};