import { Chip, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../lib/product.api";
import SkeletonLoader from "./SkeletonLoader";

const ProductCard = (props) => {
  console.log(props);
  const queryClient = useQueryClient(); //? for automatic fetch of new data after deletion
  const { _id, name, price, category, company } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //! delete using react query
  const deleteProductMutation = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: () => deleteProduct(_id),
    onSuccess: () => {
      queryClient.invalidateQueries("seller-products"); //? yo vaneko chai yedi delete thichyo bhaney kun api hit hanney bhaneko ho!!
    },
  });
  //delete
  // const deleteProduct = async (_id) => {
  //   try {
  //     setLoading(true);
  //     await $axios.delete(`product/delete/${_id}`);

  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error.message);
  //   }
  // };

  if (deleteProductMutation.isLoading) {
    // return <CircularProgress />;
    return <SkeletonLoader />;
  }
  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <Card
          className="card"
          sx={{
            maxWidth: 345,
            // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            borderRadius: "10px",
            // background: "linear-gradient(to left, wheat, white)",
          }}
        >
          <CardMedia
            onClick={() => navigate(`/products/details/${_id}`)}
            style={
              {
                // width: "250px",
                // height: "200px",
                // borderRadius: "20px",
                // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                // background: "linear-gradient(to left, wheat, white)",
              }
            }
            className="product-card"
            component="img"
            alt="green iguana"
            height="140"
            image="https://cdn.originpc.com/img/compare-all/gaming-desktops/genesis-7000-series-system-image.png"
            sx={{ objectFit: "contain" }}
          />
          <CardContent>
            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                <Chip label="primary" color="primary" />
              </Typography>
            </div>
            <Typography
              style={{
                fontSize: "20px",
                fontWeight: "800",
                marginBottom: "5px",
              }}
            >
              Rs. {price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Button
              size="small"
              sx={{ color: "green", fontSize: "15px" }}
              onClick={() => navigate(`/products/details/${_id}`)}
            >
              Explore{" "}
              <span style={{ marginLeft: "10px" }}>
                {" "}
                <BsSearch size={18} />
              </span>
            </Button>
            {userRole === "seller" && (
              <Button size="small" onClick={handleClick}>
                <AiTwotoneDelete size={30} style={{ color: "red" }} />
              </Button>
            )}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <img src="../.././public/Image resources/bin.svg" alt="" />
                </div>
                <Typography sx={{ p: 2 }}>
                  Are you sure you want to delete?
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "20px",
                  }}
                >
                  <Button
                    onClick={() => {
                      handleClose();
                      deleteProduct(_id);
                    }}
                    variant="contained"
                    color="error"
                  >
                    Yes
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleClose}
                  >
                    No
                  </Button>
                </div>
              </div>
            </Popover>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default ProductCard;
