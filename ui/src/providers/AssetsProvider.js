import { useState, createContext } from "react";

import backdropOne from "../Assets/Profiles/erik-mclean-kPYQyUvjS4w-unsplash.jpg";
import backdropTwo from "../Assets/Profiles/tungsten-rising-DaOE1R832Uc-unsplash.jpg";
import backdropThree from "../Assets/Profiles/catgirlmutant-VcgZPE6qRCg-unsplash.jpg";
import backdropFive from "../Assets/Profiles/jojo-yuen-sharemyfoodd-0Rz4GzuBOVc-unsplash.jpg";
import backdropSix from "../Assets/Profiles/jon-spectacle-ho24w5XM0sw-unsplash.jpg";

const AssetsContext = createContext();

const AssetsProvider = (props) => {
  const [assets, setAssets] = useState({
    backdrops: [backdropTwo, backdropOne, backdropThree, backdropFive, backdropSix],
  });

  return <AssetsContext.Provider value={{ assets, setAssets }}>{props.children}</AssetsContext.Provider>;
};

export { AssetsContext, AssetsProvider };
