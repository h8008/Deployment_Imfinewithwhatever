import { Button as MUIButton } from "@mui/material";

const Button = (props) => {
  const borderStyle = {
    border: "2px solid black",
    borderRadius: "15px",
  };

  return <MUIButton {...props}>{props.text}</MUIButton>;
};

export default Button;
