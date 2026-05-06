import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../api/auth";

interface Props {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {

  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: getCurrentUser,
    retry: false,
  })

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children
};

export default ProtectedRoute;