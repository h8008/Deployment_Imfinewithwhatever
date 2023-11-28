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

const initializeStyle = (num) =>
  Array(num)
    .fill(true)
    .map(() => ({ backgroundColor: "grey" }));

const Options = (props) => {
  const { options, handleChange, slot } = props;
  const [value, setValue] = useState("");
  const [style, setStyle] = useState(() => initializeStyle(options.length));
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (e) => {
    const index = slot;
    const value = selectedOption;
    setValue(index);
    handleChange(index, value);
  };

  const handleHover = (idx, option) => {
    setSelectedOption(option);
    return style.map((s, i) => (i === idx ? { ...s, backgroundColor: "red" } : { ...s }));
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
          onChange={(e) => handleSelect(e)}
        >
          {options != null &&
            options.length > 0 &&
            options.map((option, index) => {
              return (
                <MenuItem
                  key={index}
                  index={index}
                  height={"100px"}
                  sx={{ ...style[index] }}
                  value={index}
                  onMouseEnter={() => handleHover(index, option)}
                >
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
  const { inputs, options, handleChange } = props;

  return (
    <DropdownComponent>
      {inputs.map((_, availableSlot) => (
        <Options options={options} handleChange={handleChange} slot={availableSlot} />
      ))}
    </DropdownComponent>
  );
};

export default Dropdown;
