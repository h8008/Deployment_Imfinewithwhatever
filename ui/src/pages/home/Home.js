import attributes from "../../config";
// import Logo from "../../components/Logo";
import Logo from "../../Assets/Logo.png";
import Developers from "../../components/Developers";

import CardMedia from "@mui/material/CardMedia";
import Backdrop from "@mui/material/Backdrop";

import { Grid, useTheme } from "@mui/material";
import { styled } from "@mui/system";

const HomeComponent = styled(Backdrop)(({ theme }) => ({
  backgroundColor: attributes.homeBackgroundColor,
  position: "relative",
  height: "95vh",
  width: "75vw",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  container: true,
  rowGap: 50,
  invisible: false,
}));

const LogoComponent = styled(CardMedia)({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: `translate(-50%, -50%)`,
  backgroundImage: `url(${Logo})`,
  alt: "logo",
  height: "500px",
  width: "500px",
});

const Home = (props) => {
  const theme = useTheme();

  return (
    <Grid data_id="home-container">
      <HomeComponent data_id="home" theme={theme} open={true}>
        <LogoComponent src={Logo} />
        <Developers
          style={{
            position: "absolute",
            top: "95%",
            left: "50%",
            transform: `translate(-50%, -50%)`,
          }}
          color={theme.palette.primary.light}
          // color={"white"}
        />
      </HomeComponent>
    </Grid>
  );
};

export default Home;
