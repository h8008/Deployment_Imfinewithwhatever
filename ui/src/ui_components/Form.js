import { useState } from "react";
import { FormControl, FormControlLabel, FormGroup, InputLabel, Select, Switch, styled, useTheme } from "@mui/material";

import Box from "./Box";
import GridRow from "./GridRow";

const SwitchComponent = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 26,
  marginRight: 10,
  marginLeft: 10,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    // transform: 'translateX(30px)',
    transitionDuration: "300ms",
    "&.Mui-checked": {
      "& + .MuiSwitch-track": {
        opacity: 1,
        border: 0,
      },
    },
    "&.Mui-disabled": {
      "& + .MuiSwitch-thumb": {
        opacity: 0.1,
      },
      "& + .MuiSwitch-track": {
        opacity: 0.1,
        // color: "black",
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      color: "#ffff",
      border: "6px solid #fff",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      height: 22,
    },
  },
}));

const Form = (props) => {
  const { fullWidth, color, focused, options, onClick } = props;
  const [checked, setChecked] = useState(options.map(() => false));

  const onSlideCallback = (optionIdx) => {
    console.log(optionIdx);
    const newChecked = checked.slice();
    newChecked[optionIdx] = !newChecked[optionIdx];
    setChecked(newChecked);
    onClick(optionIdx);
  };

  return (
    <FormControl
      fullWidth={fullWidth}
      color={color}
      focused={focused}
      variant="outlined"
      data_id="form-control-component"
    >
      <FormGroup
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {options.map((option, index) => (
          <GridRow>
            <Box>
              <FormControlLabel
                control={<SwitchComponent color={"error"} checked={checked[index]} />}
                label={option}
                onClick={() => onSlideCallback(index)}
              />
            </Box>
          </GridRow>
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default Form;
