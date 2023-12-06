import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = (props) => {
  if (localStorage.getItem("token")) {
    return <>{props.children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default RequireAuth;
