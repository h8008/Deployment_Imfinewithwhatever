import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { InputLabel, Select, MenuItem, Grid, styled } from "@mui/material";
import { Fragment } from "react";

const DropdownComponent = styled(Grid)((props) => ({
  container: true,
  rowGap: 20,
}));

const DropdownItemComponent = styled(Grid)((props) => ({
  gridRow: true,
}));

const Options = (props) => {
  const { options } = props;
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <DropdownItemComponent>
      <FormControl focused={true} color="primary" fullWidth>
        <InputLabel id="dropdown-menu">Restaurant</InputLabel>
        <Select
          labelId="dropdown-menu-label"
          id="dropdown-menu-select"
          label="restaurant"
          value={value}
          onChange={(e) => handleChange(e)}
          inputProps={{
            MenuProps: {
              PaperProps: {},
            },
          }}
        >
          {options != null &&
            options.length > 0 &&
            options.map((option, index) => {
              return (
                <MenuItem height={"100px"} sx={{ backgroundColor: "grey" }} value={index}>
                  {option.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </DropdownItemComponent>
  );
};

const Dropdown = (props) => {
  const { inputs, options } = props;

  return (
    <DropdownComponent>
      {inputs.map((input) => (
        <Options options={options} />
      ))}
    </DropdownComponent>
  );
};

export default Dropdown;
