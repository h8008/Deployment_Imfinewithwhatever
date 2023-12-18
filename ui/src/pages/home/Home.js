import { useContext } from "react";

import Logo from "../../Assets/Logo.png";
import Developers from "../../components/Developers";

import CardMedia from "@mui/material/CardMedia";
import Backdrop from "@mui/material/Backdrop";

import { Grid, useTheme } from "@mui/material";
import { styled } from "@mui/system";

import Icons from "../../components/Icons";
import { AssetsContext } from "../../providers/AssetsProvider";
import FoodWalls from "../../components/Three/FoodWalls";

const HomeComponent = styled(Grid)(({ theme }) => ({
  container: true,
  height: "90vh",
  width: "80vw",
  display: "flex",
  margin: "auto",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  zIndex: 1,
  // backgroundColor: theme.palette.background.default,
  backgroundColor: "indianred",
}));

const LogoComponent = styled(CardMedia)({
  backgroundImage: `url(${Logo})`,
  alt: "logo",
  height: "600px",
  width: "600px",
});

const Home = (props) => {
  console.log("Home Page");

  return (
    <HomeComponent data_id="home-container">
      <LogoComponent src={Logo} />
      {/* <Developers
        style={{s
          height: "50px",
          width: "100%",
        }}
        color="white"
      /> */}
    </HomeComponent>
  );
};

export default Home;
