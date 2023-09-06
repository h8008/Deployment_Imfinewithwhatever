// Importing necessary modules and components
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createRef,
} from "react";
import { useTheme } from "@mui/material";
import { RestaurantsContext } from "../../../providers/RestaurantsProvider";
import { GameContext } from "../../../providers/GameProvider";
import {
  UPDATE_CUISINE,
  UPDATE_RESTAURANTS,
} from "../../../reducer/MainActions";
import { useNavigate } from "react-router-dom";
import { getRestaurantsByCuisines } from "../../../functions/Functions";
import { MessageContext } from "../../../providers/MessageProvider";
import { UPDATE_MESSAGE } from "../../../reducer/Message/MessageAction";

import "./Wheel.css";

const Wheel = (props) => {
  const { gameState, gameDispatch } = useContext(GameContext);
  // const items = gameState.restaurants.map((restaurant) => restaurant.name);
  const items = [...gameState.restaurants];
  const onGameEndCallback = gameState.onGameEndCallback;

  return <WheelComponent items={items} onSelectItem={onGameEndCallback} />;
};

// Defining and exporting a class component named "Wheel"
class WheelComponent extends React.Component {
  // Defining the constructor method and initializing the state
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      selectedItem: null,
      spinningWheel: createRef(),
    };
    // Binding the "selectItem" method to the current instance of the component
    this.selectItem = this.selectItem.bind(this);
  }

  onSelectItem = (selectedItem) => {
    this.props.onSelectItem(this.props.items[selectedItem]);
  };

  componentDidUpdate(prevProps) {
    console.log(this.state.spinningWheel.current);
  }

  // Defining the "selectItem" method to select a random item from the wheel
  async selectItem() {
    // If an item has not been selected yet
    if (this.state.selectedItem === null) {
      // Generate a random index number to select an item
      const selectedItem = Math.floor(Math.random() * this.props.items.length);

      console.log("selected item index in Wheel", selectedItem);
      console.log("selected item in Wheel", this.props.items[selectedItem]);

      // Set the selected item index as the "selectedItem" state and increment the "counter" state
      this.setState({ selectedItem });
      this.setState((state) => ({
        ...state,
        counter: state.counter + 1,
      }));

      setTimeout(
        function () {
          this.onSelectItem(this.state.selectedItem);
        }.bind(this),
        3000
      );
      // // If the "onSelectItem" prop is passed in, call it and pass the selected item index as argument
      // if (this.props.onSelectItem) {
      //   this.props.onSelectItem(selectedItem);
      // }
    } else {
      // If an item has already been selected, reset the "selectedItem" state to null and call the "selectItem" method again after 500ms
      this.setState({ selectedItem: null });
      setTimeout(this.selectItem, 500);
    }
  }

  // Rendering the wheel component
  render() {
    // Destructuring the "selectedItem" and "items" states from the current state
    const { selectedItem } = this.state;
    const items = this.props.items.map((item) => item.name);

    // Defining CSS variables for the wheel based on the number of items and the selected item index
    const wheelVars = {
      "--nb-item": items.length,
      "--selected-item": selectedItem,
    };

    // Defining a "spinning" class based on whether an item has been selected or not
    const spinning = selectedItem !== null ? "spinning" : "";

    // Returning the JSX markup for the wheel component
    return (
      <div className="wheel-container">
        {/* /* Rendering the wheel  */}
        <div
          className={`wheel ${spinning}`}
          style={wheelVars}
          onClick={this.selectItem}
          ref={this.state.spinningWheel}
        >
          {items.map((item, index) => (
            <div
              className="wheel-item"
              key={index}
              style={{ "--item-nb": index }}
            >
              {item}
            </div>
          ))}
        </div>
        {/* Rendering the selected item */}
        {/* {items[selectedItem]} */}
      </div>
    );
  }
}

export default Wheel;
