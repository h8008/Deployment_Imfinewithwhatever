import { useState } from "react";
import { Rating } from "react-simple-star-rating";

const Stars = (props) => {
  const { rating } = props;
  const [stars, setStars] = useState([Math.round(rating / 2)]);

  const readonly = props.onBarCellHoverCallback && props.onBarCellClickCallback ? false : true;
  const onBarCellHoverCallback = readonly ? () => {} : props.onBarCellHoverCallback;
  const onBarCellClickCallback = readonly ? () => {} : props.onBarCellClickCallback;

  return (
    <Rating
      readonly={readonly}
      initialValue={stars[0]}
      onPointerMove={(value) => onBarCellHoverCallback(value)}
      onClick={() => onBarCellClickCallback()}
    />
  );
};

export default Stars;
