import { Typography } from "@mui/material";

const Text = (props) => {
  const { text, style, color } = props;

  return (
    <Typography sx={style} color={color}>
      {text}
    </Typography>
  );
};

export default Text;
