import { grey } from "@mui/material/colors";

import backdropOne from "../Assets/Profiles/erik-mclean-kPYQyUvjS4w-unsplash.jpg";
import backdropTwo from "../Assets/Profiles/tungsten-rising-DaOE1R832Uc-unsplash.jpg";
import backdropThree from "../Assets/Profiles/catgirlmutant-VcgZPE6qRCg-unsplash.jpg";
import backdropFive from "../Assets/Profiles/jojo-yuen-sharemyfoodd-0Rz4GzuBOVc-unsplash.jpg";
import backdropSix from "../Assets/Profiles/jon-spectacle-ho24w5XM0sw-unsplash.jpg";
import backdropFour from "../Assets/Logo.png";

const colors = {
  pages: {
    main: {
      title: {
        color: "white",
      },
    },
    profile: {
      background: {
        light: "#dddddd",
        red: "#ff0000",
      },
      buttons: {
        color: "#ffffff",
      },
    },
  },
  red: {
    ligth: "#dddddd",
    dark: "#ff0000",
  },
  yellow: {
    background: "#eeab0c",
    light: "#fff2d9",
  },
  grey: {
    // light: "#959394",
    light: "#ffffff",
  },
  components: {
    options: {
      color: "black",
    },
    buttons: {
      color: "white",
    },
  },
};

const attributes = {
  app: "Fine With Whatever",
  games: {
    // names: ["Wheel", "Flip", "Plinko"],
    names: ["Wheel", "Plinko"],
  },
  backgroundColor: grey[100],
  homeBackgroundColor: "#343F44",
  images: {
    home: backdropFour,
    restaurants: backdropFour,
  },
  colors: colors,
};

export default attributes;
