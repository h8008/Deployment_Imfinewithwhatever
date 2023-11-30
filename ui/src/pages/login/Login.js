import { useState, useEffect, useContext } from "react";
import { FormControl, IconButton, InputAdornment, TextField, OutlinedInput, InputLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import Text from "../../ui_components/Text";
import Button from "../../ui_components/Button";
import Grid from "@mui/material/Grid";
import GridRow from "../../ui_components/GridRow";
import GridItem from "../../ui_components/GridItem";

import styled from "@emotion/styled";

import API from "../../API_Interface";

import { UserContext } from "../../providers/UserProvider";
import { MessageContext } from "../../providers/MessageProvider";
import { UPDATE_PREFERENCES } from "../../reducer/User/UserActions";
import useNavigator from "../../hooks/useNavigator";

const FormComponent = styled("form")(() => ({
  width: "100%",
}));

const TextFieldComponet = styled(TextField)(() => ({
  display: "flex",
  margin: "10px",
  color: "primary",
}));

const FormControlComponent = styled(FormControl)(() => ({
  display: "flex",
  margin: "10px",
  color: "primary",
}));

const TextFields = (props) => {
  const getCompName = (compName) =>
    compName
      .split()
      .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
      .join();

  return (
    <Grid
      container
      rowGap={4}
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItem: "space-between",
      }}
    >
      {props.components.map((component, index) => (
        <Grid
          key={index}
          row={"true"}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            columns: 12,
          }}
        >
          <GridItem xs={2}>
            <Text text={getCompName(component)} style={{ color: "error" }} />
          </GridItem>
          <GridItem xs={4}>
            {component === "password" ? (
              <FormControlComponent focused={true}>
                <OutlinedInput
                  id={`${component}_input_field`}
                  name={`${component}`}
                  type={props.showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={props.handleShowPassword}
                        onMouseDown={props.handleHidePassword}
                        edge="end"
                      >
                        {props.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  notched={false}
                  autoFocus={true}
                />
              </FormControlComponent>
            ) : (
              <TextFieldComponet id={`${component}_input_field`} name={`${component}`} focused={true} />
            )}
          </GridItem>
        </Grid>
      ))}
    </Grid>
  );
};

const LoginComponent = styled(Grid)(() => ({
  height: "100vh",
  width: "80%",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItem: "center",
  container: true,
  rowGap: 20,
}));

const Buttons = styled(Grid)(() => ({
  gridRow: "true",
  columns: 6,
  columnGap: 2,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}));

const LoginButton = (props) => {
  const buttonTextColor = "error";
  return (
    <GridItem xs={3} onClickCallback={props.onClick}>
      <Button text="Login" color={buttonTextColor} />
    </GridItem>
  );
};

const SignUpButton = (props) => {
  const buttonTextColor = "error";
  return (
    <GridItem xs={3} onClickCallback={props.onClick}>
      <Button text="SignUp" color={buttonTextColor} />
    </GridItem>
  );
};

const Login = (props) => {
  console.log("login page");
  const [formState, setFormState] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const { userDispatch } = useContext(UserContext);
  const { messageDispatch } = useContext(MessageContext);

  const components = ["email", "firstname", "lastname", "password"];

  const handleChange = (event) => {
    event.preventDefault();
    var fieldName = event.target.name;
    setFormState({
      ...formState,
      [fieldName]: event.target.value,
    });
  };

  const handleLogin = async (event) => {
    // set content of formState to database
    // event.preventDefault();
    console.log("sending credentials to database");
    if (formState.email === "" || formState.password === "") {
      return;
    }
    let res = await API.Users.login({ ...formState });
    const loginData = API.apiResHandling(res, messageDispatch, res.message);
    if (loginData) {
      res = await API.Users.getAllRestaurantPreferencesForUser({
        email: formState.email,
      });
      const preferences = API.apiResHandling(res, messageDispatch, res.message);
      userDispatch({
        type: "LOGIN",
        email: formState.email,
      });
      userDispatch({
        type: UPDATE_PREFERENCES,
        preferences: preferences,
      });
      console.log("Signed In");
      setAuthenticated(true);
    }
  };

  const handleSignup = async (event) => {
    // event.preventDefault();
    console.log("signing up");
    if (Object.values(formState).filter((val) => val !== "").length === 0) {
      return;
    }
    const res = await API.Users.signup({ ...formState });
    if (res.status === "Already Signed Up") {
      // TODO: modal message
      console.log("Account already exists. Please Log In");
    } else if (res.status === "OK") {
      // TODO: modal message
      console.log("Signed Up");
      setAuthenticated(true);
      userDispatch({
        type: "LOGIN",
        email: formState.email,
      });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(true);
  };

  const handleHidePassword = () => {
    setShowPassword(false);
  };

  // useNavigation("/", authenticated === true);
  useNavigator({ dest: "/", cond: authenticated === true });

  return (
    <LoginComponent data_id="login-component">
      <GridRow>
        <FormComponent onChange={handleChange} data_id="login-form">
          <TextFields
            components={components}
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
            handleHidePassword={handleHidePassword}
          />
        </FormComponent>
      </GridRow>
      <GridRow>
        <Buttons data_id="interactive-buttons">
          <LoginButton onClick={handleLogin} />
          <SignUpButton onClick={handleSignup} />
        </Buttons>
      </GridRow>
    </LoginComponent>
  );
};

export default Login;
