import { Typography } from "@mui/material";

const Text = ({ style, text, ...otherProps }) => {
  return (
    <Typography sx={style} {...otherProps}>
      {text}
    </Typography>
  );
};

export default Text;
