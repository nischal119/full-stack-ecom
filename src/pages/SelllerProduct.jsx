import { Box, Button, CircularProgress, Grid, Pagination } from "@mui/material";
import React, { useState } from "react";

import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../components/CustomSnackbar";
import EmptyPage from "../components/EmptyPage";
import ProductCard from "../components/ProductCard";
import { fetchSellerProducts } from "../lib/product.api";
import { useDispatch, useSelector } from "react-redux";
import { openErrorSnackBar } from "../redux store/slice/snackbarslice";
import SkeletonLoader from "../components/SkeletonLoader";
const SelllerProduct = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isItemDeleted, setisItemDeleted] = useState(false);
  const paginationData = (event, data) => {
    setPage(data);
  };

  const { searchText } = useSelector((state) => state.product);
  //! react query
  const getSellerProductQuery = useQuery({
    queryKey: ["seller-products", { page, searchText: searchText }],
    queryFn: () =>
      fetchSellerProducts({
        page: page,
        limit: 10,
        searchText: searchText || "",
      }),
    keepPreviousData: true,
  });

  // const fetchSellerProducts = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await $axios.post("/product/seller/all", {
  //       page: 1, //page from usestate
  //       limit: 10,
  //     });
  //     console.log(response);

  //     setProducts(response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     setError(true);
  //     console.log(error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchSellerProducts();
  // }, [page, isItemDeleted]);

  if (getSellerProductQuery.isError) {
    dispatch(openErrorSnackBar("Product cannot be fetched at the moment"));
  }

  if (getSellerProductQuery.isLoading) {
    return (
      <div
        style={{
          height: "77vh",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Box>
        {getSellerProductQuery?.data?.data?.products?.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <EmptyPage />
            <h1 style={{ textAlign: "center" }}>
              OOPS! <br /> No products found
            </h1>
            <Button
              onClick={() => {
                navigate("/products/add");
              }}
              variant="contained"
            >
              Add some now?
            </Button>
          </div>
        ) : (
          <>
            <Grid
              container
              sx={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Grid item sx={{}}>
                {" "}
                <Button
                  variant="contained"
                  onClick={() => navigate("/products/add")}
                >
                  Add Product
                </Button>
              </Grid>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "25px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {getSellerProductQuery?.data?.data?.products.map((item) => {
                // if (getSellerProductQuery.isLoading) return <SkeletonLoader />;
                return (
                  <ProductCard
                    key={item._id}
                    {...item}
                    isItemDeleted={isItemDeleted}
                    setisItemDeleted={setisItemDeleted}
                  />
                );
              })}
            </Grid>
          </>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "40px 0px 0px 0px",
          }}
        >
          <Pagination
            onChange={paginationData}
            count={getSellerProductQuery?.data?.data?.totalpage}
            page={page}
            shape="rounded"
          />
        </div>
      </Box>
    </div>
  );
};

export default SelllerProduct;
