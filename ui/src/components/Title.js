import attributes from '../config';
import Text from '../ui_components/Text';

import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material';

// import Caveat from '../fonts/Caveat/static/Caveat-SemiBold.ttf';
const font = "'Caveat', cursive";

// const theme = createTheme({
//   typography: {
//     fontFamily: 'Caveat, cursive',
//   },
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: `
//         @font-face {
//           font-family: 'Caveat';
//           font-style: cursive;
//           font-display: swap;
//           font-weight: 400;
//           src: local('Caveat'), local('Caveat-SemiBold'), url(${Caveat}) format('ttf');
//           unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
//         }
//       `,
//     },
//   },
// });

const TitleComponnet = styled(Grid)((theme) => ({
  // marginTop: '100px',
  // marginBottom: '300px'
  fontFamily: font,
  height: '25%',
  gridRow: true,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItem: 'center',
}));

const Title = (props) => {
  const theme = useTheme();

  return (
    <TitleComponnet data_id='title-component' theme={props.theme}>
      <Text text={attributes.app} style={{ ...theme.typography }} />
    </TitleComponnet>
  );
};

export default Title;
