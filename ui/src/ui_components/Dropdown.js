import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { InputLabel, Select, MenuItem } from "@mui/material";
import { Fragment } from "react";

const Dropdown = (props) => {
  const { index: dropDownIndex, options, handleChange, inputs } = props;
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (index, option) => {
    setValue(index);
    setSelectedOption(option);
    handleChange(dropDownIndex, option);
  };

  return (
    <Fragment>
      {inputs.map((input) => (
        <FormControl focused={true} color="primary" fullWidth>
          <InputLabel id="dropdown-menu">Restaurant</InputLabel>
          <Select labelId="dropdown-menu-label" id="dropdown-menu-select" value={value} label="restaurant">
            {options != null &&
              options.length > 0 &&
              options.map((option, index) => {
                return (
                  <MenuItem
                    sx={{ backgroundColor: "grey" }}
                    value={index}
                    onClick={() => handleOptionClick(index, option)}
                  >
                    {option.name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      ))}
    </Fragment>
  );
};

export default Dropdown;
