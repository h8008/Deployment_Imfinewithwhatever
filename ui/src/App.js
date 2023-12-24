import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
import Main from "./pages/main/Main";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import Feedback from "./pages/feedback/Feedback";
import Restaurants from "./pages/restaurants/Restaurants";
// import Navigation from "./pages/navigation/Navigation";
import MultiDecisionMaker from "./pages/multiDecisionMaker/MultiDecisionMaker";

import UseHydrateWrapper from "./wrappers/UseHydrateWrapper";

import { AssetsProvider } from "./providers/AssetsProvider";
import { BackgroundDispatchProvider } from "./providers/BackgroundDispatchProvider";
import { UserProvider } from "./providers/UserProvider";
// import { NavigationProvider } from "./providers/NavigationProvider";
import { MessageProvider } from "./providers/MessageProvider";
import { RestaurantsProvider } from "./providers/RestaurantsProvider";
import { GameProvider } from "./providers/GameProvider";

import { ThemeProvider } from "@mui/material";
import { main_config } from "./styles/shared";

// import Plinko from "./components/Games/Plinko/Plinko2";
import Plinko from "./components/Games/A_Better_Plinko";
import SpringModal from "./ui_components/Modal";
import Wheel from "./components/Games/Wheel/Wheel";
import Menu from "./components/Menu";

import GlobalTheme from "./providers/ThemeProvider";
import BackgroundDispatcher from "./wrappers/BackgroundDispatcher";
import Backdrop from "./components/Backdrop";
import InteractiveModel from "./components/InteractiveModal";
import Modal from "./pages/modal";

function App() {
  return (
    <ThemeProvider theme={GlobalTheme}>
      <AssetsProvider>
        <BackgroundDispatchProvider>
          <UserProvider>
            {/* <NavigationProvider> */}
            <MessageProvider>
              <RestaurantsProvider>
                <UseHydrateWrapper>
                  <GameProvider>
                    <div className="App">
                      <Router>
                        <Menu />
                        <Modal />
                        <BackgroundDispatcher />
                        <Routes>
                          <Route exact path="/" element={<Home />} />
                          <Route exact path="/Main" element={<Main />} />
                          <Route exact path="/Login" element={<Login theme={main_config} />} />
                          <Route exact path="/Logout" element={<Logout />} />
                          <Route exact path="/Feedback" element={<Feedback theme={main_config} />} />
                          <Route exact path="/Restaurants" element={<Restaurants theme={main_config} />} />
                          <Route exact path="/Profile" element={<Profile />} />
                          <Route exact path="/MultiDecisionMaker" element={<MultiDecisionMaker />} />
                          <Route exact path="/Games/Plinko" element={<Plinko />} />
                          <Route exact path="/Games/Wheel" element={<Wheel />} />
                        </Routes>
                      </Router>
                    </div>
                  </GameProvider>
                </UseHydrateWrapper>
              </RestaurantsProvider>
            </MessageProvider>
            {/* </NavigationProvider> */}
          </UserProvider>
        </BackgroundDispatchProvider>
      </AssetsProvider>
    </ThemeProvider>
  );
}

export default App;
