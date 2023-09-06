import { Box, Grid } from '@mui/material';

const GridItem = (props) => {
  const { index, onHoverCallback, onClickCallback, style, xs } = props;

  return (
    <Grid
      xs={xs}
      style={style}
      key={index}
      item
      onMouseEnter={
        props.onHoverCallback ? () => onHoverCallback(index) : () => {}
      }
      onClick={props.onClickCallback ? () => onClickCallback() : () => {}}
    >
      {/* <Box sx={style} /> */}
      {props.children}
    </Grid>
  );
};

export default GridItem;
