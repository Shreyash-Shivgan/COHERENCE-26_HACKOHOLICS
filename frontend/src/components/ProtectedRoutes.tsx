// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, role }: any) {

//   const auth = localStorage.getItem("govflow_auth");
//   const userRole = localStorage.getItem("govflow_role");

//   if (!auth) {
//     return <Navigate to="/login" />;
//   }

//   if (role && role !== userRole) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }


import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  role: "admin" | "citizen";
}

export default function ProtectedRoute({ children, role }: Props) {
  const isAuth = localStorage.getItem("govflow_auth");
  const userRole = localStorage.getItem("govflow_role");

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (userRole !== role) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}