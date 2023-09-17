import AuthenticationGaurd from "../Gaurd/AuthenticationGaurd";
import AddProductForm from "../components/AddProductForm";
import Mainlayout from "../layout/Mainlayout";
import About from "../pages/About/About";
import Cart from "../pages/Cart";
import EditProduct from "../pages/EditProduct";
import Home from "../pages/Home/Home";
import Product from "../pages/Product";
import Productsdetails from "../pages/Productsdetails";
const userRole = localStorage.getItem("userRole");
const MainRoutes = [
  {
    path: "/",
    element: (
      <AuthenticationGaurd>
        <Mainlayout />,
      </AuthenticationGaurd>
    ),
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
      {
        path: "/product/edit/:id",
        element: <EditProduct />,
      },
    ],
  },
];

export default MainRoutes;
