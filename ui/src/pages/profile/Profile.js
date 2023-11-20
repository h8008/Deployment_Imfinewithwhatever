import { useState, useEffect, useContext } from "react";
import Reviews from "../../components/Reviews";
import Preferences from "../../components/Preferences";

import { Grid, styled, useTheme } from "@mui/material";
import Text from "../../ui_components/Text";
import Box from "../../ui_components/Box";
import BorderedBox from "../../ui_components/BorderedBox";
import RowComponent from "../../ui_components/RowComponent";
import BarChart from "../../components/BarChart/BarChart";

import API from "../../API_Interface";

import { UserContext } from "../../providers/UserProvider";
import { MessageContext } from "../../providers/MessageProvider";
import quicksort from "../../utils/Sorting/Quicksort";

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

const BodyComponent = styled(Grid)({
  container: true,
  rowGap: 50,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
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

const PreferencesComponent = styled(Grid)({
  container: true,
  gridRow: true,
  // height: "500px",
  // width: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
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

const sortObject = async (dict) => {
  const input = Object.entries(dict).map((key) => [key[0], key[1]]);
  const sorted = await quicksort(input, 0, input.length - 1);
  return sorted;
};

const getStatistics = async (input) => {
  const obj = {};
  await input.forEach((p) => {
    const cat = p.categories;
    if (obj[cat] == null) {
      obj[cat] = 1;
    } else {
      obj[cat]++;
    }
  });
  return obj;
};

const getFavorites = async (preferences) => {
  const favorites = await preferences.filter((p) => p.like === "true");
  return await getStatistics(favorites);
};

const getDislikes = async (preferences) => {
  const dislikes = preferences.filter((p) => p.like === "false");
  return await getStatistics(dislikes);
};

const useSortPreferences = (preferences) => {
  const [sorted, setSorted] = useState({});
  useEffect(() => {
    const sort = async () => {
      let likes = await getFavorites(preferences);
      let dislikes = await getDislikes(preferences);
      likes = await sortObject(likes);
      dislikes = await sortObject(dislikes);
      setSorted({ likes, dislikes, totalDataLength: likes.length + dislikes.length });
    };
    if (preferences.length > 0) {
      sort();
    }
  }, [preferences]);
  return [sorted, setSorted];
};

const Profile = (props) => {
  const { userState, userDispatch } = useContext(UserContext);
  const { messageState, messageDispatch } = useContext(MessageContext);

  const [reviews, setReviews] = useState([]);
  const [preferences, setPreferences] = useGetPreferences(userState.email);
  const [sortedPreferences, setSortedPreferences] = useSortPreferences(preferences);

  const theme = useTheme();

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

  return (
    <ProfileComponent>
      <HeaderComponent>
        <ColumnComponent>
          <Text text={"User Page"} />
          <RowComponent>
            <Text text={"Email: "} style={{ marginRight: "5px" }} />
            <Text text={userState.email} style={{ textDecoration: "underline" }} />
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
      <BodyComponent>
        <PreferencesComponent>
          {Object.keys(sortedPreferences).length > 0 && <Preferences preferences={sortedPreferences} />}
        </PreferencesComponent>
        {/* <ReviewsComponent>{reviews.length > 0 && <Reviews reviews={reviews} />}</ReviewsComponent> */}
      </BodyComponent>
    </ProfileComponent>
  );
};

export default Profile;
