import { Route, Navigate } from "react-router-dom";

export type PrivateRouteType = {
  isLogin: boolean;
  path: string;
  element: any;
};

const PrivateRoute = ({ isLogin, path, element }: PrivateRouteType) => {
  return (
    <>
      {isLogin ? (
        <Route path={path} element={element} />
      ) : (
        <Navigate state={{ from: path }} replace to="/login" />
      )}
    </>
  );
};

export { PrivateRoute };
