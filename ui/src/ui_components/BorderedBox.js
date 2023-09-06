import { styled, Box as MUIBox } from "@mui/material";

const BorderedBox = styled(MUIBox)(({ style }) => ({
  ...style,
  border:
    style == null || style.border == null ? "8px solid black" : style.border,
}));

// const BorderedBox = (props) => {
//   const addOnStyle = {
//     display: "flex",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     border: "8px solid black",
//   };
//   return (
//     <MUIBox {...props} {...addOnStyle}>
//       {props.children}
//     </MUIBox>
//   );
// };

export default BorderedBox;
