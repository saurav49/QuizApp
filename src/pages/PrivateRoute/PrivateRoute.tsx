import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export type PrivateRouteType = {
  path: string;
  element: any;
};

const PrivateRoute = ({ path, element }: PrivateRouteType) => {
  // console.log("PrivateRoute", useAuth);

  const { token } = useAuth();

  return (
    <>
      {token ? (
        <Route path={path} element={element} />
      ) : (
        <Navigate state={{ from: path }} replace to="/login" />
      )}
    </>
  );
};

export { PrivateRoute };
