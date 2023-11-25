import { grey } from "@mui/material/colors";

import backdropOne from "../Assets/Profiles/erik-mclean-kPYQyUvjS4w-unsplash.jpg";
import backdropTwo from "../Assets/Profiles/tungsten-rising-DaOE1R832Uc-unsplash.jpg";
import backdropThree from "../Assets/Profiles/catgirlmutant-VcgZPE6qRCg-unsplash.jpg";
import backdropFive from "../Assets/Profiles/jojo-yuen-sharemyfoodd-0Rz4GzuBOVc-unsplash.jpg";
import backdropSix from "../Assets/Profiles/jon-spectacle-ho24w5XM0sw-unsplash.jpg";
import backdropFour from "../Assets/Logo.png";

const attributes = {
  app: "Fine With Whatever",
  games: {
    names: ["Wheel", "Flip", "Plinko"],
  },
  backgroundColor: grey[100],
  homeBackgroundColor: "#343F44",
  images: {
    home: backdropFour,
    restaurants: backdropFour,
  },
};

const textStyle = {
  main: {
    title: {
      color: "white",
    },
    options: {
      color: "black",
    },
    buttons: {
      color: "white",
    },
  },
};

export default attributes;
