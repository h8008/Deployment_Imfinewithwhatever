import { Typography } from "@mui/material";

const Text = ({ children, style, text, ...otherProps }) => {
  return (
    <Typography sx={style} {...otherProps}>
      {text}
    </Typography>
  );
};

export default Text;
