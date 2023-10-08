import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import MininmumLayout from "../layout/MininmumLayout";
import GuestGaurd from "../Gaurd/GuestGaurd";

const guestRoutes = [
  {
    path: "/",
    element: (
      <GuestGaurd>
        {" "}
        <MininmumLayout />{" "}
      </GuestGaurd>
    ),
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
