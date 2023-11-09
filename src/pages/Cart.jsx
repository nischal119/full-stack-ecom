import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, CircularProgress } from "@mui/material";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";
import {
  getCartData,
  removeItemFromCart,
  updateCartQuantity,
} from "../lib/cart.api";
import { useDispatch } from "react-redux";
import {
  openErrorSnackBar,
  openSuccessSnackBar,
} from "../redux store/slice/snackbarslice";
import { getRandomId } from "../utils";
import EmptyCart from "../components/EmptyCart";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

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
  const cartData = data?.data?.cartList;

  const grandTotal = data?.data?.grandTotal;
  const { mutate, isLoading: removeCartLoading } = useMutation({
    mutationKey: ["removeCart"],
    mutationFn: (id) => {
      removeItemFromCart(id);
    },
    onSuccess: () => {
      dispatch(openSuccessSnackBar("Successfully Removed from cart"));
      queryClient.invalidateQueries("cart");
      queryClient.invalidateQueries("cart-item-count"); //! reloads the cart
    },
  });

  //? update quantity mutation

  const { mutate: updateQuantityMutate, isLoading: updateQuantityLoading } =
    useMutation({
      mutationKey: ["updateQuantity"],
      mutationFn: (values) => {
        updateCartQuantity(values.productId, { action: values.action });
      },
    });
  if (isLoading || removeCartLoading || updateQuantityLoading) {
    return <CircularProgress />;
  }
  return (
    <div style={{ height: "80vh" }}>
      {cartData.length === 0 && <EmptyCart />}

      {cartData.length >= 1 && (
        <Box>
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
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          <img
                            style={{ width: "100px", height: "100px" }}
                            src={item.image}
                            alt="image"
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
                            {/* <Button
                              onClick={() =>
                                updateQuantityMutate({
                                  productId: item?.productId,
                                  action: "decrease",
                                })
                              }
                              sx={{ color: "red" }}
                            >
                              {" "}
                              <AiFillMinusCircle />
                            </Button> */}
                            {item?.orderQuantity}
                            {/* <Button
                              onClick={() =>
                                updateQuantityMutate({
                                  productId: item?.productId,
                                  action: "increase",
                                })
                              }
                              sx={{ color: "green" }}
                            >
                              <AiFillPlusCircle />
                            </Button> */}
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

              <TableRow
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{grandTotal || "0"}</TableCell>
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
        </Box>
      )}
    </div>
  );
};

export default Cart;
