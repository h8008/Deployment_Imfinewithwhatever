import { useState } from "react";
import { Box as MUIBox } from "@mui/material";

const CustomBox = (props) => {
  const addOnStyle = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  };
  return (
    <MUIBox {...props} {...addOnStyle}>
      {props.children}
    </MUIBox>
  );
};

export default CustomBox;
