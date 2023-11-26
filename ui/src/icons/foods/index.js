import {
  GiSushis,
  GiRiceCooker,
  GiBowlOfRice,
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
import { BiSolidSushi } from "react-icons/bi";
import { FaShrimp } from "react-icons/fa6";
import { PiHamburgerBold, PiEggCrackFill, PiPizzaDuotone } from "react-icons/pi";
import { TbMeat } from "react-icons/tb";
import { LuBeef } from "react-icons/lu";

const icons = {
  sushi: [GiSushis, BiSolidSushi, GiRiceCooker, GiBowlOfRice, GiDumplingBao, GiDumpling],
  proteins: [
    PiPizzaDuotone,
    GiFullPizza,
    GiHamburger,
    GiShrimp,
    FaShrimp,
    PiHamburgerBold,
    PiEggCrackFill,
    TbMeat,
    LuBeef,
  ],
  vegetables: [GiCabbage, GiPlantSeed, GiTomato, GiBaobab],
};

export default icons;
