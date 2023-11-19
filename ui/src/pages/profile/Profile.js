import { useState, useEffect, useContext } from "react";
import Reviews from "../../components/Reviews";
import Preferences from "../../components/Preferences";

import { Grid, styled, useTheme } from "@mui/material";
import Text from "../../ui_components/Text";
import Box from "../../ui_components/Box";
import BorderedBox from "../../ui_components/BorderedBox";
import RowComponent from "../../ui_components/RowComponent";

import API from "../../API_Interface";

import { UserContext } from "../../providers/UserProvider";
import { MessageContext } from "../../providers/MessageProvider";

const ProfileComponent = styled(Grid)({
  height: "90%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
});

const HeaderComponent = styled(Grid)({
  gridRow: true,
  container: true,
  width: "100%",
  height: "10%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const ColumnComponent = styled(Grid)({
  gridRow: true,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const ReviewsComponent = styled(Box)({
  gridRow: true,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "45%",
});

const ReviewComponent = styled(BorderedBox)({
  width: "90%",
  height: "200px",
});

const useGetPreferences = (email) => {
  const [preferences, setPreferences] = useState([]);
  useEffect(() => {
    const getPreferences = async () => {
      const res = await API.Preference.get({ email: email });
      if (res.status === "OK") {
        setPreferences([...res.data]);
      }
    };
    if (email) {
      getPreferences();
    }
  }, [email]);

  return [preferences, setPreferences];
};

const getFavorites = (preferences) => {
  const dict = {};
  preferences.forEach((p, i) => {
    if (dict[p] == null) {
      dict[p] = 1;
    } else {
      dict[p]++;
    }
  });
  // sort preferences
};

const Profile = (props) => {
  const { userState, userDispatch } = useContext(UserContext);
  const { messageState, messageDispatch } = useContext(MessageContext);
  const [reviews, setReviews] = useState([]);
  const [preferences, setPreferences] = useGetPreferences(userState.email);
  const theme = useTheme();

  // console.log("preferences", preferences);

  useEffect(() => {
    const getReviews = async () => {
      const res = await API.UserReviews.getReviews({ email: userState.email });
      if (res.status === "OK") {
        const reviews = API.apiResHandling(res, messageDispatch, res.message);
        setReviews([...reviews]);
      }
    };
    getReviews();
  }, [messageDispatch, userState.email]);

  // useEffect(() => {
  //   const getPreferences = async () => {
  //     const res = await API.Users.getAllRestaurantPreferencesForUser({
  //       email: userState.email,
  //     });
  //     if (res.status === 'OK') {
  //       const preferences = API.apiResHandling(
  //         res,
  //         messageDispatch,
  //         res.message
  //       );
  //       setPreferences([...preferences]);
  //     }
  //   };
  //   getPreferences();
  // }, [messageDispatch, userState.email]);

  return (
    <ProfileComponent>
      <HeaderComponent>
        <ColumnComponent>
          <Text text={"User Page"} />
          <RowComponent>
            <Text text={"Email: "} style={{ marginRight: "5px" }} />
            <Text text={userState.email} style={{ textDecoration: "underline" }} />
            {/* </RowComponent> */}
          </RowComponent>
        </ColumnComponent>
        <ColumnComponent>
          <Text text={"Reset Preferences?"} />
          <BorderedBox
            style={{
              backgroundColor: theme.palette.error.main,
              border: `6px solid black`,
              borderRadius: `10px`,
              width: "70px",
            }}
          >
            <Text text={"Reset"} />
          </BorderedBox>
        </ColumnComponent>
      </HeaderComponent>
      <ReviewsComponent>{reviews.length > 0 && <Reviews reviews={reviews} />}</ReviewsComponent>
      {/* {preferences.length > 0 && <Preferences preferences={preferences} />} */}
    </ProfileComponent>
  );
};

export default Profile;
