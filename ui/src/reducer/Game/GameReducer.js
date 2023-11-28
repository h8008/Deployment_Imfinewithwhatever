import { UPDATE_RESTAURANTS_FOR_GAMES, UPDATE_SELECTED_RESTAURANT } from "./GameActions";

const initialGameState = {
  restaurants: [],
  selectedRestaurant: "",
  onGameEndCallback: () => {},
};

const gameReducer = (state = initialGameState, action) => {
  switch (action.type) {
    case UPDATE_RESTAURANTS_FOR_GAMES:
      // return {
      //   ...state,
      //   restaurants: [...action.restaurants],
      //   onGameEndCallback:
      //     action.onGameEndCallback == null
      //       ? initialGameState.onGameEndCallback
      //       : action.onGameEndCallback,
      // };
      return {
        ...state,
        restaurants: action.payload.restaurantsData,
        onGameEndCallback:
          action.payload.onGameEndCallback == null
            ? initialGameState.onGameEndCallback
            : action.payload.onGameEndCallback,
      };
    case UPDATE_SELECTED_RESTAURANT:
      return {
        ...state,
        restaurant: action.restaurant,
        onGameEndCallback:
          action.onGameEndCallback == null ? initialGameState.onGameEndCallback : action.onGameEndCallback,
      };
    default:
      return state;
  }
};

export { gameReducer, initialGameState };
