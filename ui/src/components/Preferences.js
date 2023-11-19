import styled from "@emotion/styled";
import Text from "../ui_components/Text";
import { Grid } from "@mui/material";

const PreferenceComponent = styled(Grid)({
  height: "45%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Preferences = (props) => {
  const { preferences } = props;

  return (
    <PreferenceComponent>
      {preferences.map((preference, index) => (
        <Text key={index} text={preference} />
      ))}
    </PreferenceComponent>
  );
};

export default Preferences;
