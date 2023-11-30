import { BackgroundDispatchContext } from "../providers/DeHydrateProvider";
import { UserContext } from "../providers/UserProvider";
import { MessageContext } from "../providers/MessageProvider";
import { RestaurantsContext } from "../providers/RestaurantsProvider";
import { GameContext } from "../providers/GameProvider";

const names = ["Hydrate", "User", "Navigate", "Restaurants", "Game"];
const contexts = [
  BackgroundDispatchContext,
  UserContext,
  // NavigationContext,
  MessageContext,
  RestaurantsContext,
  GameContext,
];

const contextSelector = (name) => {
  const contextsObject = Object.fromEntries(names.map((name, index) => [name, contexts[index]]));
  return contextsObject[name];
};

export default contextSelector;
