import { TextField as MUITextField } from "@mui/material";

const TextField = (props) => {
  const { index, handleChange, ...otherProps } = props;

  return <MUITextField multiline focused {...otherProps} onChange={(event) => handleChange(event, index)} />;
};

export default TextField;
