import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { InputLabel, Select, MenuItem, Grid, styled } from "@mui/material";
import Text from "./Text";

const DropdownComponent = styled(Grid)((props) => ({
  display: "flex",
  flexDirection: "column",
  gridRow: true,
  container: true,
  rowGap: 20,
}));

const DropdownItemComponent = styled(Grid)((props) => ({
  gridRow: true,
}));

// const MenuItemComponent = styled(Grid)((props) => ({
//   gridRow: true,
// }));

const initializeStyle = (ref) =>
  ref
    ? Array(ref.length)
        .fill(true)
        .map(() => ({ backgroundColor: "white" }))
    : [];

const Options = (props) => {
  const { options, handleChange, slot } = props;
  const [value, setValue] = useState("");
  const [style, setStyle] = useState(() => initializeStyle(options));
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (e) => {
    const index = e.target.value;
    const value = selectedOption;
    setValue(index);
    handleChange(slot, value);
  };

  const handleHover = (idx, option) => {
    setSelectedOption(option);
  };

  return (
    <DropdownItemComponent data_id={"dropdown-item-component"}>
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
                  width={"100%"}
                  sx={{
                    ...style[index],
                    width: "100%",
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "white" },
                  }}
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
    <DropdownComponent data_id={"dropdown-component"}>
      {inputs.map((_, availableSlot) => (
        <Options options={options} handleChange={handleChange} slot={availableSlot} />
      ))}
    </DropdownComponent>
  );
};

export default Dropdown;
