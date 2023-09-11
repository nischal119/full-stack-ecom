import AddProductForm from "../components/AddProductForm";
import Mainlayout from "../layout/Mainlayout";
import About from "../pages/About/About";
import Cart from "../pages/Cart";
import Home from "../pages/Home/Home";
import Product from "../pages/Product";
import Productsdetails from "../pages/Productsdetails";
const userRole = localStorage.getItem("userRole");
const loginRoutes = [
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "products/add",
        element: <AddProductForm />,
      },
      {
        path: "products/details/:id",
        element: <Productsdetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
];

export default loginRoutes;
