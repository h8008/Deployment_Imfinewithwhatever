import { Grid } from '@mui/material';

const GridRow = (props) => {
  return (
    <Grid
      gridRow
      sx={props.style}
      columns={props.columns}
      columnGap={props.columnGap}
      data_id={props.data_id}
    >
      {props.children}
    </Grid>
  );
};

export default GridRow;
