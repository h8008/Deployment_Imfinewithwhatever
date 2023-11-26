import { useState, createContext } from "react";

import backdropOne from "../Assets/Profiles/erik-mclean-kPYQyUvjS4w-unsplash.jpg";
import backdropTwo from "../Assets/Profiles/tungsten-rising-DaOE1R832Uc-unsplash.jpg";
import backdropThree from "../Assets/Profiles/catgirlmutant-VcgZPE6qRCg-unsplash.jpg";
import backdropFive from "../Assets/Profiles/jojo-yuen-sharemyfoodd-0Rz4GzuBOVc-unsplash.jpg";
import backdropSix from "../Assets/Profiles/jon-spectacle-ho24w5XM0sw-unsplash.jpg";
import backdropFour from "../Assets/Logo.png";

import {
  GiSushis,
  BiSolidSushi,
  GiRiceCooker,
  GiBowlOfRice,
  PiPizzaDuotone,
  GiFullPizza,
  GiHamburger,
  GiShrimp,
  GiDumplingBao,
  GiBaobab,
  GiDumpling,
  GiCabbage,
  GiPlantSeed,
  GiTomato,
} from "react-icons/gi";
import { FaShrimp } from "react-icons/fa6";
import { PiHamburgerBold, PiEggCrackFill } from "react-icons/pi";
import { TbMeat } from "react-icons/tb";
import { LuBeef } from "react-icons/lu";

const AssetsContext = createContext();

const AssetsProvider = (props) => {
  const [assets, setAssets] = useState({
    backdrops: [backdropFour, backdropTwo, backdropOne, backdropThree, backdropFive, backdropSix],
  });

  return <AssetsContext.Provider value={{ assets, setAssets }}>{props.children}</AssetsContext.Provider>;
};

export { AssetsContext, AssetsProvider };
