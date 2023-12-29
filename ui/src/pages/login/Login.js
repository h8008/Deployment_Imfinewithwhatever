import { useState, useEffect, useContext } from "react";
import { FormControl, IconButton, InputAdornment, TextField, OutlinedInput, InputLabel, useTheme } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import Text from "../../ui_components/Text";
// import Button from "../../ui_components/Button";
import GridRow from "../../ui_components/GridRow";
import GridItem from "../../ui_components/GridItem";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

import API from "../../API_Interface";

import { UserContext } from "../../providers/UserProvider";
import { MessageContext } from "../../providers/MessageProvider";
import { UPDATE_PREFERENCES } from "../../reducer/User/UserActions";
import useNavigator from "../../hooks/useNavigator";
import { UPDATE_MESSAGE } from "../../reducer/Message/MessageAction";

import Modal from "../modal"

const FormComponent = styled("form")(() => ({
  width: "100%",
}));

const TextFieldComponent = styled(TextField)({
  display: "flex",
  margin: "10px",
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

// const OutlinedInputComponent = styled(OutlinedInput)(({ theme }) => ({
//   "& .MuiOutlinedInput-input": {
//     "& fieldset": {
//       borderColor: "white",
//     },
//   },
//   "& .MuiInputBase-formControl": {
//     "& fieldset": {
//       borderColor: "white",
//     },
//   },
//   "& .MuiOutlinedInput-multiline": {
//     "& fieldset": {
//       borderColor: "white",
//     },
//   },
// }));

const TextFields = ({ theme, ...otherProps }) => {
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
      {otherProps.components.map((component, index) => (
        <Grid
          key={index}
          row={"true"}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            columns: 8,
          }}
        >
          <Grid xs={3}>
            <Text text={getCompName(component)} style={{ color: "error" }} />
          </Grid>
          <Grid xs={6}>
            {component === "password" ? (
              <TextFieldComponent
                name="password"
                // fullWidth={true}
                focused={true}
                type={otherProps.showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color={"error"}
                        aria-label="toggle password visibility"
                        onClick={otherProps.handleShowPassword}
                        onMouseDown={otherProps.handleHidePassword}
                        edge="end"
                      >
                        {otherProps.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <TextFieldComponent
                // fullWidth={true}
                id={`${component}_input_field`}
                name={`${component}`}
                focused={true}
              />
            )}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

const LoginComponent = styled(Grid)(({ theme }) => ({
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

const LoginButton = ({ onClick, theme }) => {
  const color = theme.palette.primary.light.main;

  return (
    <GridItem xs={3} onClickCallback={onClick}>
      <Button height={"100%"}>
        <Text text={"Login"} color={color} />
      </Button>
    </GridItem>
  );
};

// const LoginButton = styled(Button)(({ theme }) => ({

// }))

const SignUpButton = ({ onClick, theme }) => {
  const color = theme.palette.primary.light.main;
  return (
    <GridItem xs={3} onClickCallback={onClick}>
      <Button height={"100%"}>
        <Text text={"Signup"} color={color} />
      </Button>
    </GridItem>
  );
};

const Login = (props) => {
  console.log("login page");
  const theme = useTheme();
  const [formState, setFormState] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [message, setMessage] = useState('')
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
      const preferences = await API.apiResHandling(res, messageDispatch, res.message);
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
    } else {
      setMessage("Please sign up to continue.")
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
      messageDispatch({
        type: UPDATE_MESSAGE,
        message: "Account already exists. Please Log In",
      });
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

  useNavigator({ dest: "/Profile", cond: authenticated === true });

  console.log("theme", theme);

  return (
    <LoginComponent data_id="login-component">
      <GridRow>
        <FormComponent onChange={handleChange} data_id="login-form">
          <TextFields
            theme={theme}
            components={components}
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
            handleHidePassword={handleHidePassword}
          />
        </FormComponent>
      </GridRow>
      <GridRow>
        <Buttons data_id="interactive-buttons">
          <LoginButton onClick={handleLogin} theme={theme} />
          <SignUpButton onClick={handleSignup} theme={theme} />
        </Buttons>
      </GridRow>
      <Modal interactive={false} open={message !== ''} message={message} onClickCallback={() => setMessage("")}/>
    </LoginComponent>
  );
};

export default Login;
