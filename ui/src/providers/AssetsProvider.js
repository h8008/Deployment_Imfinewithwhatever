import { useState, createContext, useMemo } from "react";

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
const icons = require.context("../Assets/icons", true);
const getIcons = () => {
  const iconList = icons.keys().map((icon) => icons(icon));
  return iconList;
};

console.log("icons", icons);

const AssetsProvider = (props) => {
  const assets = useMemo(
    () => ({
      backdrops: [backdropFour, backdropTwo, backdropOne, backdropThree, backdropFive, backdropSix],
      icons: getIcons(),
    }),
    []
  );

  return <AssetsContext.Provider value={{ assets }}>{props.children}</AssetsContext.Provider>;
};

export { AssetsContext, AssetsProvider };
