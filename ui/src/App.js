import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
import Main from "./pages/main/Main";
import Backdrop from "./components/Backdrop";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Feedback from "./pages/feedback/Feedback";
import Restaurants from "./pages/restaurants/Restaurants";
import Navigation from "./pages/navigation/Navigation";
import MultiDecisionMaker from "./pages/multiDecisionMaker/MultiDecisionMaker";

import { DehydrateProvider } from "./providers/DeHydrateProvider";
import { UserProvider } from "./providers/UserProvider";
import { NavigationProvider } from "./providers/NavigationProvider";
import { MessageProvider } from "./providers/MessageProvider";
import { RestaurantsProvider } from "./providers/RestaurantsProvider";
import { GameProvider } from "./providers/GameProvider";

import { HydrateWrapper } from "./wrappers/HydrateWrapper";

import { ThemeProvider } from "@mui/material";
import { main_config } from "./styles/shared";

import Plinko from "./components/Games/Plinko/Plinko";
import SpringModal from "./ui_components/Modal";
import Wheel from "./components/Games/Wheel/Wheel";
import Menu from "./components/Menu";

import GlobalTheme from "./providers/ThemeProvider";
import BackgroundDispatcher from "./components/BackgroundDispatcher";

function App() {
  return (
    <ThemeProvider theme={GlobalTheme}>
      <DehydrateProvider>
        <UserProvider>
          <NavigationProvider>
            <MessageProvider>
              <RestaurantsProvider>
                <HydrateWrapper>
                  <GameProvider>
                    <div className="App">
                      <Backdrop>
                        <Router>
                          <Navigation />
                          <Menu />
                          <SpringModal />
                          <BackgroundDispatcher />
                          <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route exact path="/Main" element={<Main />} />
                            <Route exact path="/Login" element={<Login theme={main_config} />} />
                            <Route exact path="/Feedback" element={<Feedback theme={main_config} />} />
                            <Route exact path="/Restaurants" element={<Restaurants theme={main_config} />} />
                            <Route exact path="/Profile" element={<Profile />} />
                            <Route exact path="/MultiDecisionMaker" element={<MultiDecisionMaker />} />
                            <Route exact path="/Games/Plinko" element={<Plinko />} />
                            <Route exact path="/Games/Wheel" element={<Wheel />} />
                          </Routes>
                        </Router>
                      </Backdrop>
                    </div>
                  </GameProvider>
                </HydrateWrapper>
              </RestaurantsProvider>
            </MessageProvider>
          </NavigationProvider>
        </UserProvider>
      </DehydrateProvider>
    </ThemeProvider>
  );
}

export default App;
