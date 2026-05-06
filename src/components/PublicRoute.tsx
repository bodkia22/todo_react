import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth";


interface Props {
  children: React.ReactNode
}

const PublicRoute = ({ children }: Props) => {

  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: getCurrentUser,
    retry: false,
  })

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (user) {
    return <Navigate to="/tasks" />;
  }

  return children
};

export default PublicRoute;