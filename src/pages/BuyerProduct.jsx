import { Box, Grid, Pagination } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmptyPage from "../components/EmptyPage";
import ProductCard from "../components/ProductCard";
import { getBuyerProducts } from "../lib/product.api";
import { openErrorSnackBar } from "../redux store/slice/snackbarslice";

const BuyerProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const paginationData = (event, data) => {
    setPage(data);
  };

  const { searchText, minPrice, maxPrice, category } = useSelector(
    (state) => state.product
  );

  const { isLoading, error, isError, data } = useQuery({
    queryKey: [
      "buyer-products",
      page,
      searchText,
      minPrice,
      maxPrice,
      category,
    ],
    queryFn: () =>
      getBuyerProducts({
        page: page,
        limit: 10,
        searchText: searchText || "",
        minPrice: minPrice || 0,
        maxPrice: maxPrice || 0,
        category: category,
      }),
  });

  if (isError) {
    dispatch(
      openErrorSnackBar(
        error?.response?.data?.message ||
          "Product cannot be fetched at the moment"
      )
    );
  }

  <Box>
    <div>
      <Box>
        {data?.data?.products?.length === 0 ? (
          <div>
            <EmptyPage />
            <h1 style={{ textAlign: "center" }}>
              OOPS! <br /> No products found
            </h1>
          </div>
        ) : (
          <>
            <Grid
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "25px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {data?.data?.products?.map((item) => {
                // console.log("item", item);

                return <ProductCard key={item._id} {...item} />;
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
            count={data?.data?.totalPage}
            page={page}
            shape="rounded"
          />
        </div>
      </Box>
    </div>
  </Box>;
  return <div></div>;
};

export default BuyerProduct;
