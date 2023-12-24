import { styled } from "@mui/material";
import Grid from "@mui/material/Grid";

const RowComponent = styled(Grid)(({ children, style, ...otherProps }) => ({
  gridRow: true,
  display: "flex",
  ...otherProps,
  flexDirection: "row",
  justifyContent: style == null ? "flex-start" : style.justifyContent,
  alignItems: style == null ? "flex-start" : style.alignItems,
  width: style == null ? "50%" : style.width,
}));

export default RowComponent;
