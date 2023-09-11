import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

function valuetext(value) {
  return `${value}°C`;
}

export default function PriceRange() {
  const [value, setValue] = React.useState([1, 10000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography>Price</Typography>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        max={10000000}
        step={10000}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
