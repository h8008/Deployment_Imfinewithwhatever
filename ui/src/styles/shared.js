import { grey } from "@mui/material/colors";
import attributes from "../config";

const display = (
  direction,
  justifyContent = "center",
  alignItems = "center"
) => ({
  display: "flex",
  flexDirection: direction,
  justifyContent: justifyContent,
  alignItems: alignItems,
});

// The style for the main render area below title
const main_config = {
  height: "90vh",
  // width: "300px",
  width: "300px",
  backgroundColor: attributes.backgroundColor,
  display,
};

export { main_config };
