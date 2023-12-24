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
// import Reviews from "../../components/Reviews";
import Reviews from "../../components/Swiper_Reviews";
import Summary from "../../components/Summary";
import EggYolks from "../../components/Three/TomatoEggs";

import useGetSummary from "./Hooks/useGetSummary";

const ProfileComponent = styled(Grid)({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#ffffff",
});

const DefaultComponent = ({ summary, active }) => {
  const style = {
    height: "90vh",
    width: "100vw",
    backgroundColor: "red",
  };

  return (
    <>
      {active && (
        <Grid sx={style}>
          <EggYolks zIndex={1} />
          <Summary width="50%" height="50%" summary={summary} zIndex={1} />
        </Grid>
      )}
    </>
  );
};

const BodyComponent = styled(Grid)(({ theme }) => ({
  container: true,
  rowGap: 50,
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
  // backgroundColor: theme.palette.error.dark.main,
}));

const ReviewsStyledComponent = styled(Box)({
  gridRow: true,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "80%",
  height: "100%",
});

const ReviewsComponent = ({ reviews, active }) => {
  return (
    <>
      {active && (
        <ReviewsStyledComponent>
          <Reviews reviews={reviews} />
        </ReviewsStyledComponent>
      )}
    </>
  );
};

const PreferencesComponent = ({ preferences, active }) => {
  return <>{active && <Preferences preferences={preferences} />}</>;
};

const useGetPreferences = (email) => {
  const [preferences, setPreferences] = useState([]);
  useEffect(() => {
    const getPreferences = async () => {
      const res = await API.Preference.getAllForCurrentUser({ email: email });
      if (res.status === "OK") {
        console.log("preferences", res.data);
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
        setReviews([...res.data]);
      }
    };
    if (email) {
      getReviews();
    }
  }, [email]);

  return [reviews];
};

const sortObject = async (dict) => {
  if (Object.keys(dict).length === 0) {
    return [];
  }
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
      setSorted({ likes, dislikes, totalDataLength: likes.length + dislikes.length });
    };
    if (preferences.length > 0) {
      sort();
    }
  }, [preferences]);
  return [sorted];
};

// const getActiveComponent = (activeComponentIdx, components) => {
//   return components[activeComponentIdx];
// };

const getComponents = () => [<DefaultComponent />, <PreferencesComponent />, <ReviewsComponent />];

const useGetComponents = (ready, componentProps) => {
  const components = useMemo(() => {
    if (ready) {
      const curriedProps = componentProps.reduce((acc, cur, i) => {
        const { name: key, props: val } = componentProps[i];
        const props = {};
        props[key] = val;
        return [...acc, props];
      }, []);

      const components = getComponents();
      const curriedComponents = components.map((component, i) => cloneElement(component, { ...curriedProps[i] }));
      return curriedComponents;
    }
    return [];
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
        // cp[i] = { ...p };
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

  const [backdrop] = useGetBackdropOfTheDay(assets);
  const [reviews] = useGetReviews(userState.email);
  const [preferences] = useGetPreferences(userState.email);
  const [sortedPreferences] = useSortPreferences(preferences);
  const [summary] = useGetSummary({ reviews, preferences: sortedPreferences });
  const [componentProps] = useGetComponentProps([summary, sortedPreferences, reviews]);
  const [ready] = useGetReadyState(componentProps);
  // const [summary] = useGetSummary(ready, reviews, preferences);

  const [componentNames, setComponentNames] = useState(["summary", "preferences", "reviews"]);
  const [components] = useGetComponents(
    ready,
    componentProps.map((cp, i) => ({ name: componentNames[i], props: cp }))
  );
  const [activeComponentIdx, setActiveComponentIdx] = useState(0);

  const onSelectMenuItemCallback = (idx) => {
    setActiveComponentIdx(idx);
  };

  return (
    <ProfileComponent data_id={"Profile-Page"}>
      {/* <BodyComponent data_id={"profile body component"}>
        {components.length > 0 && components[activeComponentIdx]}
      </BodyComponent> */}
      {ready && (
        <>
          <DefaultComponent summary={summary} active={activeComponentIdx === 0} />
          <PreferencesComponent preferences={sortedPreferences} active={activeComponentIdx === 1} />
          <ReviewsComponent reviews={reviews} active={activeComponentIdx === 2} />
        </>
      )}

      <SideMenu
        position={"absolute"}
        sx={{ zIndex: 1 }}
        user={{ ...userState }}
        items={componentNames}
        slideOutButtonColor={theme.palette.primary.light.main}
        slideOutButtonPos={{ x: "0px", y: "50px" }}
        onSelectMenuItemCallback={onSelectMenuItemCallback}
      />
    </ProfileComponent>
  );
};

export default Profile;
