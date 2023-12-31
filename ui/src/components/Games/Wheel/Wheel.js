// Importing necessary modules and components
import React, { useState, useEffect, useRef, useContext, createRef } from "react";
import { Grid, styled } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { RestaurantsContext } from "../../../providers/RestaurantsProvider";
import Modal from "../../../pages/modal";

import { GameContext } from "../../../providers/GameProvider";

import "./Wheel.css";
import { UPDATE_RESTAURANTS } from "../../../reducer/Main/actions";

const WheelContainerComponent = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.warning.main,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
}));

const Wheel = (props) => {
  // const { gameState } = useContext(GameContext);
  // const items = [...gameState.restaurants];
  // const onGameEndCallback = gameState.onGameEndCallback;
  // const handleGameEnd = (selected) => {};
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location?.state || [];
  const [choice, setChoice] = useState(null);
  const [run, setRun] = useState(true);
  const [next, setNext] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { restaurantDispatch } = useContext(RestaurantsContext);

  const onGameEndCallback = (selected) => {
    const choice = data[selected];
    const message = `You selected: ${choice.name}`;
    setChoice(choice);
    setNext("/Restaurants");
    setModalOpen(true);
    setMessage(message);
    setRun(false);
  };

  const handleModalClick = () => {
    setModalOpen(false);
    // restaurantDispatch({
    //   type: UPDATE_RESTAURANTS,
    //   payload: {
    //     restaurants: [choice],
    //   },
    // });
    navigate(next, { state: { restaurants: [choice] }});
  };

  return (
    <>
      {run && <WheelComponent items={data} onSelectItem={onGameEndCallback} />}
      <Modal open={modalOpen} onClickCallback={handleModalClick} interactive={true} message={message} />
    </>
  );
};

// Defining and exporting a class component named "Wheel"
class WheelComponent extends React.Component {
  // Defining the constructor method and initializing the state
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      selectedItem: null,
      selectionHistory: [],
      spinningWheel: createRef(),
      // run: false,
    };
    // Binding the "selectItem" method to the current instance of the component
    this.selectItem = this.selectItem.bind(this);
  }

  onSelectItem = (selectedItem) => {
    // this.props.onSelectItem(this.props.items[selectedItem]);
    this.props.onSelectItem(selectedItem);
  };

  componentDidUpdate(_, prevState) {
    console.log("previous state of wheel", prevState);
  }

  // Defining the "selectItem" method to select a random item from the wheel
  async selectItem() {
    // If an item has not been selected yet
    if (this.state.selectedItem === null) {
      // Generate a random index number to select an item
      const selectedItem = Math.floor(Math.random() * this.props.items.length);
      // console.log('selected item index in Wheel', selectedItem);
      // console.log('selected item in Wheel', this.props.items[selectedItem]);
      // Set the selected item index as the "selectedItem" state and increment the "counter" state
      // this.setState({ selectedItem });
      this.setState((state) => ({
        ...state,
        selectedItem,
        selectionHistory: [...state.selectionHistory, selectedItem],
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
      <WheelContainerComponent>
        <div className="wheel-container">
          {/* /* Rendering the wheel  */}
          <div
            className={`wheel ${spinning}`}
            style={wheelVars}
            onClick={this.selectItem}
            ref={this.state.spinningWheel}
          >
            {items.map((item, index) => (
              <div className="wheel-item" key={index} style={{ "--item-nb": index }}>
                {item}
              </div>
            ))}
          </div>
          {/* Rendering the selected item */}
          {/* {items[selectedItem]} */}
        </div>
      </WheelContainerComponent>
    );
  }
}

export default Wheel;
