import { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Checkboxes = (props) => {
  const { labels, onSelectGameCallback, checked } = props;

  return (
    <FormGroup>
      {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      <FormControlLabel required control={<Checkbox />} label="Required" />
      <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
      {labels.map((label, index) => (
        <FormControlLabel
          control={<Checkbox />}
          label={label}
          onClick={() => onSelectGameCallback(label, index)}
          checked={checked[index]}
        />
      ))}
    </FormGroup>
  );
};

export default Checkboxes;
