import { useSelector } from "react-redux";

export const useAuth = () => {
  const { data: user, isLoading } = useSelector((state) => state.user);
  const isAuthenticated = !!user;
  return { isLoading, isAuthenticated, user };
};
