import { CardMedia, styled } from "@mui/material";

const Image = styled(CardMedia)(({ imageUrl, height, width }) => ({
  component: "img",
  alt: "image",
  height: height,
  width: width,
  backgroundImage: `url(${imageUrl})`,
  backgroundSize: "cover",
  image: imageUrl,
}));

export default Image;
