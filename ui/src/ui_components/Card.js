import { useEffect, useState } from "react";
import {
  Grid,
  Card as MUICard,
  CardMedia,
  CardContent,
  Typography,
  Button,
  styled,
} from "@mui/material";
import Text from "../ui_components/Text";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CheckIcon from "@mui/icons-material/Check";
import Icon from "@mui/material/Icon";

const CardMediaComponent = styled(CardMedia)(({ imageUrl }) => ({
  component: "img",
  alt: "card background img",
  height: "300px",
  width: "300px",
  backgroundImage: `url(${imageUrl})`,
}));

const Card = (props) => {
  const { cardData, index, onClickCallback } = props;

  return (
    <MUICard sx={{ maxWidth: 345 }}>
      <CardMediaComponent imageUrl={cardData.image_url} />
      <CardContent>
        <Text text={cardData.name} color="primary" />
      </CardContent>
      <CheckIcon color="error" onClick={() => onClickCallback(index)} />
    </MUICard>
  );
};

export default Card;
