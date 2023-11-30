import attributes from "../../config";
// import Logo from "../../components/Logo";
import Logo from "../../Assets/Logo.png";
import Developers from "../../components/Developers";

import CardMedia from "@mui/material/CardMedia";
import Backdrop from "@mui/material/Backdrop";

import { Grid, useTheme } from "@mui/material";
import { styled } from "@mui/system";

const HomeComponent = styled(Grid)({});

const HomeBackDropComponent = styled(Backdrop)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  position: "relative",
  height: "90vh",
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
  console.log("Home Page");
  const theme = useTheme();

  return (
    <HomeComponent data_id="home-container">
      <HomeBackDropComponent data_id="home" theme={theme} open={true}>
        <LogoComponent src={Logo} />
        <Developers
          style={{
            position: "absolute",
            top: "95%",
            left: "50%",
            transform: `translate(-50%, -50%)`,
          }}
          color={theme.palette.primary.light}
        />
      </HomeBackDropComponent>
    </HomeComponent>
  );
};

export default Home;
