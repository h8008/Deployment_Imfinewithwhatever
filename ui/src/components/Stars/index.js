import { useState } from "react";
import { Rating } from "react-simple-star-rating";

const Stars = (props) => {
  const { rating, onBarCellHoverCallback, onBarCellClickCallback } = props;
  const [stars, setStars] = useState(Math.round(rating / 2));

  return (
    <Rating
      initialValue={stars}
      onPointerMove={(value, index) => onBarCellHoverCallback(value)}
      onClick={() => onBarCellClickCallback()}
    />
  );
};

export default Stars;
