import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { InputLabel, Select, MenuItem } from "@mui/material";

const Dropdown = (props) => {
  const { index: dropDownIndex, options, handleChange } = props;
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (index, option) => {
    setValue(index);
    setSelectedOption(option);
    handleChange(dropDownIndex, option);
  };

  return (
    <FormControl focused color="primary" fullWidth>
      <InputLabel id="dropdown-menu">Restaurant</InputLabel>
      <Select
        labelId="dropdown-menu-label"
        id="dropdown-menu-select"
        value={value}
        label="restaurant"
        // onChange={() => handleChange(index, selectedOption)}
      >
        {options != null &&
          options.length > 0 &&
          options.map((option, index) => {
            return (
              <MenuItem
                value={index}
                onClick={() => handleOptionClick(index, option)}
              >
                {option.name}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
