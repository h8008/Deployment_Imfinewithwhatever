import { useState, useEffect, useContext, cloneElement, useMemo } from "react";
import { Grid, styled, useTheme } from "@mui/material";

import Preferences from "../../components/Preferences";
import SideMenu from "../../components/SideMenu";
import Box from "../../ui_components/Box";

import API from "../../API_Interface";

import { AssetsContext } from "../../providers/AssetsProvider";
import { UserContext } from "../../providers/UserProvider";
import { MessageContext } from "../../providers/MessageProvider";

import quicksort from "../../utils/Quicksort";
import Reviews from "../../components/Reviews";
import attributes from "../../config";
import icons from "../../icons/foods";
import RandomPositions from "../../components/RandomPositions";

const ProfileComponent = styled(Grid)({
  height: "90vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  // backgroundColor: attributes.colors.pages.profile.background.color,
});

const DefaultStyledComponent = styled(Grid)((props) => ({
  height: "100%",
  width: "80%",
  // backgroundImage: `url(${props.backdrop})`,
  backgroundPosition: "center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
}));

const DefaultComponent = (props) => {
  const { backdrop } = props;

  // return <DefaultStyledComponent backdrop={backdrop}>{/* <RandomPositions /> */}</DefaultStyledComponent>;
  return <DefaultStyledComponent />;
};

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

const ReviewsStyledComponent = styled(Box)({
  gridRow: true,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "45%",
});

const PreferencesStyledComponent = styled(Grid)({
  container: true,
  gridRow: true,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const ReviewsComponent = (props) => {
  const { reviews } = props;

  return (
    <ReviewsStyledComponent>
      <Reviews reviews={reviews} />
    </ReviewsStyledComponent>
  );
};

const PreferencesComponent = (props) => {
  const { preferences } = props;

  return <Preferences preferences={preferences} />;
};

const useGetPreferences = (email) => {
  const [preferences, setPreferences] = useState([]);
  useEffect(() => {
    const getPreferences = async () => {
      const res = await API.Preference.getAllForCurrentUser({ email: email });
      if (res.status === "OK") {
        setPreferences([...res.data]);
      }
    };
    if (email) {
      getPreferences();
    }
  }, [email]);

  return [preferences];
};

const useGetReviews = (email) => {
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    const getReviews = async () => {
      const res = await API.UserReviews.getReviews({ email: email });
      if (res.status === "OK") {
        setReviews({ reviews: [...res.data] });
      }
    };
    if (email) {
      getReviews();
    }
  }, [email]);

  return [reviews];
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
  const [sorted, setSorted] = useState(null);
  useEffect(() => {
    const sort = async () => {
      let likes = await getFavorites(preferences);
      let dislikes = await getDislikes(preferences);
      likes = await sortObject(likes);
      dislikes = await sortObject(dislikes);
      setSorted({ preferences: { likes, dislikes, totalDataLength: likes.length + dislikes.length } });
    };
    if (preferences.length > 0) {
      sort();
    }
  }, [preferences]);
  return [sorted];
};

const getActiveComponent = (activeComponentIdx, components) => {
  return components[activeComponentIdx];
};

const getComponents = () => [<DefaultComponent />, <PreferencesComponent />, <ReviewsComponent />];

const useGetComponents = (ready, componentProps) => {
  const components = useMemo(() => {
    if (ready) {
      const components = getComponents();
      const curriedComponents = components.map((component, idx) => cloneElement(component, { ...componentProps[idx] }));
      return curriedComponents;
    }
  }, [componentProps, ready]);

  return [components];
};

const useGetComponentProps = (props) => {
  const [componentProps, setComponentProps] = useState(
    Array(props.length)
      .fill(null)
      .map((el) => el)
  );
  useEffect(() => {
    const cp = [...componentProps];
    props.forEach((p, i) => {
      if (p != null && cp[i] == null) {
        cp[i] = p;
      }
    });
    const update = cp.filter((p, i) => p !== componentProps[i]).length > 0;
    if (update) {
      setComponentProps(cp);
    }
  }, [componentProps, props]);

  return [componentProps];
};

const useGetReadyState = (props) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const condition = props.every((p) => p != null);
    if (condition) {
      setReady(true);
    }
  }, [props]);
  return [ready];
};

const useGetBackdropOfTheDay = (assets) => {
  const pick = useMemo(() => {
    const { backdrops } = assets;
    const idx = Math.floor(Math.random() * (backdrops.length - 1));
    return { backdrop: backdrops[idx] };
  }, [assets]);
  return [pick];
};

const Profile = (props) => {
  console.log("Profile Page");

  const theme = useTheme();
  const { assets } = useContext(AssetsContext);
  const { userState, userDispatch } = useContext(UserContext);
  const { messageState, messageDispatch } = useContext(MessageContext);

  const [backdrop] = useGetBackdropOfTheDay(assets);
  const [reviews] = useGetReviews(userState.email);
  const [preferences] = useGetPreferences(userState.email);
  const [sortedPreferences] = useSortPreferences(preferences);
  const [componentProps] = useGetComponentProps([backdrop, sortedPreferences, reviews]);
  const [ready] = useGetReadyState(componentProps);
  const [components] = useGetComponents(ready, componentProps);
  const [componentNames, setComponentNames] = useState(["Default", "Preferences", "Reviews"]);
  const [activeComponentIdx, setActiveComponentIdx] = useState(0);

  const onSelectMenuItemCallback = (idx) => {
    setActiveComponentIdx(idx);
  };

  return (
    <ProfileComponent data_id={"Profile-Page"}>
      <SideMenu user={{ ...userState }} items={componentNames} onSelectMenuItemCallback={onSelectMenuItemCallback} />
      {/* <HeaderComponent>
        <ColumnComponent> */}
      {/* <Text text={"User Page"} />
          <RowComponent>
            <Text text={"Email: "} style={{ marginRight: "5px" }} />
            <Text text={userState.email} style={{ textDecoration: "underline" }} />
          </RowComponent> */}
      {/* </ColumnComponent> */}
      {/* <ColumnComponent>
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
        </ColumnComponent> */}
      {/* // </HeaderComponent> */}
      <BodyComponent>
        {/* <DefaultComponent image={assets.backdrops[0]} /> */}
        {/* <PreferencesComponent>
          {Object.keys(sortedPreferences).length > 0 && <Preferences preferences={sortedPreferences} />}
        </PreferencesComponent> */}
        {components != null && getActiveComponent(activeComponentIdx, components)}
      </BodyComponent>
    </ProfileComponent>
  );
};

export default Profile;
