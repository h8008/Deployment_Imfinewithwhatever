import { styled } from "@mui/material";
import Grid from "@mui/material/Grid";

const RowComponent = styled(Grid)(({ theme }) => ({
  gridRow: true,
  display: "flex",
  flexDirection: "row",
  justifyContent: theme == null ? "flex-start" : theme.justifyContent,
  alignItems: theme == null ? "flex-start" : theme.alignItems,
  width: theme == null ? "50%" : theme.width,
}));

export default RowComponent;
