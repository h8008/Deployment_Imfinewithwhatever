import { createTheme } from "@mui/material";
import { green, grey, red, yellow } from "@mui/material/colors";
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
        color: { main: attributes.colors.grey.light },
      }),
      dark: palette.palette.augmentColor({
        color: { main: "#3B464A" },
      }),
    },
    error: {
      main: red.A100,
      dark: palette.palette.augmentColor({
        color: { main: attributes.colors.red.dark },
      }),
      light: palette.palette.augmentColor({
        color: { main: "#E48A85" },
      }),
    },
    warning: {
      main: yellow[800],
      dark: palette.palette.augmentColor({
        color: { main: attributes.colors.yellow.background },
      }),
    },
    success: {
      main: green[200],
    },
    background: {
      default: red.A200,
      paper: palette.palette.augmentColor({
        color: { main: "#E48A85" },
      }),
    },
  },
  // components: {
  //   MuiInputBase: {
  //     styleOverrides: {
  //       input: {
  //         color: "black",
  //         "&::before": {
  //           border: `1px solid white`,
  //         },
  //       },
  //     },
  //   },
  // },
});

// const ThemeProvider = (props) => {
//   <MUIThemeProvider theme={GlobalTheme}>{props.children}</MUIThemeProvider>;
// };

// export { ThemeProvider, GlobalTheme };

export default GlobalTheme;
