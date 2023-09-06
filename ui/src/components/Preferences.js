import styled from "@emotion/styled";
import Text from "../ui_components/Text";
import { Grid } from "@mui/material";

const PreferenceComponent = styled(Grid)({
  height: "45%",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

const Preferences = (props) => {
  const { preferences } = props;

  return (
    <PreferenceComponent>
      <Text text={"Your liked restaurants"} />
    </PreferenceComponent>
  );
};

export default Preferences;
