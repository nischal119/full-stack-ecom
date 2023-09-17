import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress } from "@mui/material";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";
import { getCartData, removeItemFromCart } from "../lib/cart.api";
import { useDispatch } from "react-redux";
import {
  openErrorSnackBar,
  openSuccessSnackBar,
} from "../redux store/slice/snackbarslice";
import { getRandomId } from "../utils";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  {
    _id: 1,
    name: "T-shirt",
    price: 3000,
    brand: "LVD",
    quantity: 100,
    total: 30000,
    image:
      "https://poshgarments.com/wp-content/uploads/2021/09/Mens-Shirt-MWS0001-450x450.jpg",
  },
  {
    name: "T-shirt",
    price: 3000,
    brand: "LVD",
    quantity: 100,
    total: 30000,
    image:
      "https://poshgarments.com/wp-content/uploads/2021/09/Mens-Shirt-MWS0001-450x450.jpg",
  },
  {
    name: "T-shirt",
    price: 3000,
    brand: "LVD",
    quantity: 100,
    total: 30000,
    image:
      "https://poshgarments.com/wp-content/uploads/2021/09/Mens-Shirt-MWS0001-450x450.jpg",
  },
  {
    name: "T-shirt",
    price: 3000,
    brand: "LVD",
    quantity: 100,
    total: 30000,
    image:
      "https://poshgarments.com/wp-content/uploads/2021/09/Mens-Shirt-MWS0001-450x450.jpg",
  },
];
const Cart = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCartData(),
    onError: (error) => {
      dispatch(
        openErrorSnackBar(
          error?.response?.data?.message || "Oops! Something went wrong"
        )
      );
    },
  });

  const navigate = useNavigate();
  const cartData = data?.data;
  const { mutate, isLoading: removeCartLoading } = useMutation({
    mutationKey: ["removeCart"],
    mutationFn: (id) => {
      removeItemFromCart(id);
    },
    onSuccess: () => {
      dispatch(openSuccessSnackBar("Successfully Removed from cart"));
      queryClient.invalidateQueries("cart"); //! reloads the cart
    },
  });
  if (isLoading || removeCartLoading) {
    return <CircularProgress />;
  }
  return (
    <div style={{ height: "80vh" }}>
      <Button
        onClick={() => {
          navigate("/products");
        }}
        variant="contained"
        sx={{ marginLeft: "20px" }}
      >
        Continue Shopping?
      </Button>
      <h1 style={{ textAlign: "center" }}>Cart Details</h1>{" "}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
        }}
      >
        <div style={{ width: "60vw" }}>
          <TableContainer
            sx={{
              maxHeight: "60vh",
              margin: "20px",

              boxShadow: " rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
              borderRadius: "20px",
              padding: "20px",
            }}
            component={Paper}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: "20px" }} align="center">
                    Image
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "20px" }}>
                    Name
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "20px" }}>
                    Brand
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "20px" }}>
                    Price
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "20px" }}>
                    Quantity
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "20px" }}>
                    Total
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "20px" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartData?.map((item) => (
                  <TableRow
                    key={getRandomId()}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      <img
                        style={{ width: "100px", height: "100px" }}
                        src={item.image}
                        alt=""
                      />
                    </TableCell>

                    <TableCell align="center">{item?.name}</TableCell>
                    <TableCell align="center">{item?.company}</TableCell>
                    <TableCell align="center">{item?.unitPrice}</TableCell>
                    <TableCell align="center">
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button sx={{ color: "red" }}>
                          {" "}
                          <AiFillMinusCircle />
                        </Button>
                        {item?.orderQuantity}
                        <Button sx={{ color: "green" }}>
                          {" "}
                          <AiFillPlusCircle />
                        </Button>
                      </span>
                    </TableCell>
                    <TableCell align="center">{item.totalPrice}</TableCell>
                    <TableCell align="center">
                      {" "}
                      <Button
                        color="error"
                        onClick={() => {
                          mutate(item?.productId);
                        }}
                      >
                        <AiFillDelete size="25" />{" "}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div
          style={{
            boxShadow: " rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
            padding: "20px",
            borderRadius: "20px",
            alignSelf: "center",
          }}
        >
          <h2>Order Summary</h2>
          <TableRow sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* <TableCell rowSpan={3} /> */}
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">5000</TableCell>
          </TableRow>
          <TableRow sx={{ display: "flex", justifyContent: "space-between" }}>
            <TableCell>Discount</TableCell>
            <TableCell align="right">5%</TableCell>
          </TableRow>
          <TableRow sx={{ display: "flex", justifyContent: "space-between" }}>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">4500</TableCell>
          </TableRow>
          <Button
            sx={{ marginTop: "2rem", alignSelf: "center" }}
            variant="contained"
            color="success"
          >
            Proceed to Check out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
