import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { grey } from "@mui/material/colors";
import "./App.css";

import Home from "./pages/home/Home";
import Backdrop from "./components/Backdrop";
import Navigation from "./components/Navigation";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Feedback from "./pages/feedback/Feedback";
import Restaurants from "./pages/restaurants/Restaurants";
import MultiDecisionMaker from "./pages/multiDecisionMaker/MultiDecisionMaker";

import { RestaurantsProvider } from "./providers/RestaurantsProvider";
import { UserProvider } from "./providers/UserProvider";
import { GameProvider } from "./providers/GameProvider";
import { MessageProvider } from "./providers/MessageProvider";

import { ThemeProvider, createTheme } from "@mui/material";
import { main_config } from "./styles/shared";
import Main from "./pages/main/Main";
import Plinko from "./components/Games/Plinko/Plinko";
import SpringModal from "./ui_components/Modal";
import Wheel from "./components/Games/Wheel/Wheel";

const theme = createTheme({
  typography: {
    fontFamily: "'Caveat', cursive ",
    fontSize: "20",
    fontWeightBold: "bolder",
  },
  palette: {
    primary: {
      main: grey[900],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme} data_id="theme provider">
      <UserProvider>
        <MessageProvider>
          <RestaurantsProvider>
            <GameProvider>
              <div className="App">
                <Backdrop>
                  <Router>
                    <Navigation />
                    <SpringModal />
                    <Routes>
                      <Route exact path="/" element={<Home />} />
                      <Route exact path="/Main" element={<Main />} />
                      <Route
                        exact
                        path="/Login"
                        element={<Login theme={main_config} />}
                      />
                      <Route
                        exact
                        path="/Feedback"
                        element={<Feedback theme={main_config} />}
                      />
                      <Route
                        exact
                        path="/Restaurants"
                        element={<Restaurants theme={main_config} />}
                      />
                      <Route exact path="/Profile" element={<Profile />} />
                      <Route
                        exact
                        path="/MultiDecisionMaker"
                        element={<MultiDecisionMaker />}
                      />
                      <Route exact path="/Games/Plinko" element={<Plinko />} />
                      <Route exact path="/Games/Wheel" element={<Wheel />} />
                    </Routes>
                  </Router>
                </Backdrop>
              </div>
            </GameProvider>
          </RestaurantsProvider>
        </MessageProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
