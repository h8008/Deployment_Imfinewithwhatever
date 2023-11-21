import { useState } from "react";
import { Rating } from "react-simple-star-rating";

const Stars = (props) => {
  const { rating } = props;
  const [stars, setStars] = useState(Math.round(rating / 2));

  return <Rating initialValue={stars} />;
};

export default Stars;
