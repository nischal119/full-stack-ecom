import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function Variants() {
  return (
    <Stack spacing={1} sx={{ width: "100px" }}>
      {/* For variant="text", adjust the height via font-size */}
      {/* For other variants, adjust the size with `width` and `height` */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "200px",
        }}
      >
        <Skeleton variant="rectangular" width={100} height={120} />
      </div>
      <div
        style={{
          width: "200px",
          display: "flex",
          gap: "1.5rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Skeleton variant="text" width={100} sx={{ fontSize: "20px" }} />
        <Skeleton
          variant="rounded"
          width={50}
          sx={{ borderRadius: "50% /30%" }}
        />
      </div>
      <Skeleton variant="text" width={100} sx={{ fontSize: "1rem" }} />
      <Skeleton variant="rounded" width={210} height={60} />
      <div
        style={{
          display: "flex",
          width: "200px",
          gap: "20px",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Skeleton variant="rectangular" width={600} />
        <Skeleton variant="rectangular" width={200} />
      </div>
    </Stack>
  );
}
