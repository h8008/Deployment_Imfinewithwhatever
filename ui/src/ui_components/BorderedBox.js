import { styled, Box as MUIBox } from "@mui/material";

const BorderedBox = styled(MUIBox)(({ children, style = {}, ...otherProps }) => ({
  ...style,
  width: style.width == null ? "100%" : style.width,
  height: style.height == null ? "100%" : style.height,
  border: style == null || style.border == null ? "8px solid black" : style.border,
  ...otherProps,
}));

export default BorderedBox;
