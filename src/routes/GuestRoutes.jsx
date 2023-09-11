import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import MininmumLayout from "../layout/MininmumLayout";

const guestRoutes = [
  {
    path: "/",
    element: <MininmumLayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];

export default guestRoutes;
