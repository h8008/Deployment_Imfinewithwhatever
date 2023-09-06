import { TextField as MUITextField } from "@mui/material";

const TextField = (props) => {
  const { index, value, color, style, rows, fullWidth, handleChange } = props;

  return (
    <MUITextField
      multiline
      focused
      {...props}
      onChange={(event) => handleChange(event, index)}
    />
  );
};

export default TextField;
