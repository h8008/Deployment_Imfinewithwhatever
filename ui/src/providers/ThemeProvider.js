import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
import attributes from "../config";

const palette = createTheme();

const GlobalTheme = createTheme({
  typography: {
    fontFamily: "'Caveat', cursive",
    fontSize: 18,
    fontWeightMedium: "bolder",
  },
  palette: {
    primary: {
      main: grey[600],
      contrastText: grey[400],
      light: palette.palette.augmentColor({
        color: { main: attributes.backgroundColor },
      }),
      // light: grey[100],
      dark: palette.palette.augmentColor({
        color: { main: "#3B464A" },
      }),
    },
    error: {
      main: red.A100,
      light: palette.palette.augmentColor({
        color: { main: "#E48A85" },
      }),
    },
    success: {
      main: green[200],
    },
  },
});

const Theme = (props) => {
  <ThemeProvider theme={GlobalTheme}>{props.children}</ThemeProvider>;
};

export { Theme, GlobalTheme };
