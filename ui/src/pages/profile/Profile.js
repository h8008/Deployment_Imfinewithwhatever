import { useState, useEffect, useContext, cloneElement, useMemo } from "react";
import { Grid, Typography, styled, useTheme } from "@mui/material";

import Preferences from "../../components/Preferences";
import SideMenu from "../../components/SideMenu";
import Box from "../../ui_components/Box";
import Text from "../../ui_components/Text";

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
  // marginTop: "10vh",
  // height: "100vh",
  height: "fit-content",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  // backgroundColor: "#ffffff",
  // outline: "16px solid white",
});

const DefaultComponent = ({ summary, active }) => {
  const style = {
    height: "100vh",
    width: "100vw",
    backgroundColor: "red",
  };

  return (
    <>
      {active && summary && 
        (
        <> {
          Object.keys(summary).length > 0 ?
        (
        <Grid sx={style}>
          <>
            <EggYolks zIndex={1} />
            <Summary
              height="100%"
              sx={{ width: { xs: "100%", sm: "50%" }, marginTop: "20vh" }}
              summary={summary}
              zIndex={2}
            />
          </>
        </Grid>
      ) : (
        <PlaceHolderTextComponent>
          <Typography fontSize={"150%"}>
            {'You have no summary to view. Go explore!'}
          </Typography>
        </PlaceHolderTextComponent>
      )
}</>
      )}
    </>
  );
};

// const BodyComponent = styled(Grid)(({ theme }) => ({
//   container: true,
//   rowGap: 50,
//   width: "100vw",
//   height: "100vh",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "space-between",
//   alignItems: "center",
//   position: "relative",
//   // backgroundColor: theme.palette.error.dark.main,
// }));

const PlaceHolderTextComponent = styled(Grid)(({ theme, children, ...otherProps }) => ({
  container: true,
  width: "50vw",
  height: "50vh",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  // backgroundColor: "white",
  border: `8px solid white`,
  borderRadius: "20px",
  ...otherProps,
}))

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
      {active && reviews && (
        <>
          {reviews.length > 0 ? (
            <ReviewsStyledComponent>
              <Reviews reviews={reviews} />
            </ReviewsStyledComponent>
          ) : (
            <PlaceHolderTextComponent>
            <Typography fontSize={"150%"}>
            {"Go explore foods and tell us what you think!"}
            </Typography>          
          </PlaceHolderTextComponent>
          )}
        </>
      )}
    </>
  );
};

const PreferencesComponent = ({ preferences, active }) => {
  return (
    <>
    {active && preferences && <>
      {Object.values(preferences).length > 0 ? (
        <Preferences preferences={preferences} />
      ) : (
        <PlaceHolderTextComponent>
          <Typography fontSize={"150%"}>
          {"Go to some restaurants and tell us your preferences!"}
          </Typography>          
        </PlaceHolderTextComponent>
      )}
      </>
    }
    </>
  );
};

const useGetPreferences = (email, preferences, setPreferences) => {
  // const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    const getPreferences = async () => {
      const res = await API.Preference.getAllForCurrentUser({ email: email });
      if (res.status === "OK") {
        console.log("preferences", res.data);
        setPreferences([...res.data]);
      }
    };
    if (email && preferences == null) {
      console.log("fetching preferences");
      getPreferences();
    }
  }, [email, preferences, setPreferences]);

  return preferences;
};

// const useGetPreferences = (email) => {
//   const preferences = useMemo(async () => {
//     const res = await API.Preference.getAllForCurrentUser({ email });
//     return res.status === "OK" ? [...res.data] : [];
//   }, [email]);

//   return preferences;
// };

const useGetReviews = (email, reviews, setReviews) => {
  // const [reviews, setReviews] = useState(null);
  useEffect(() => {
    const getReviews = async () => {
      const res = await API.UserReviews.getReviews({ email: email });
      if (res.status === "OK") {
        setReviews([...res.data]);
      }
    };
    // if (email && reviews.length === 0) {
    if (email && reviews == null) {
      console.log("fetching reviews");
      getReviews();
    }
  }, [email, reviews, setReviews]);

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
  const [sorted, setSorted] = useState(undefined);
  useEffect(() => {
    const sort = async () => {
      let likes = await getFavorites(preferences);
      let dislikes = await getDislikes(preferences);
      likes = await sortObject(likes);
      dislikes = await sortObject(dislikes);
      setSorted({ likes, dislikes, totalDataLength: likes.length + dislikes.length });
    };
    // if (preferences.length > 0) {
    if (preferences != null && preferences.length > 0) {
      sort();
    }
    else if (preferences != null) {
      setSorted({})
    }
  }, [preferences]);
  return sorted;
};


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
      }
    });
    const update = cp.filter((p, i) => p !== componentProps[i]).length > 0;
    if (update) {
      setComponentProps(cp);
    }
  }, [componentProps, props]);

  return componentProps;
};

const useGetReadyState = (props) => {
  return useMemo(() => props.every((p) => p != null), [props]);
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
  const [preferences, setPreferences] = useState(undefined);
  const [reviews, setReviews] = useState(undefined);

  useGetReviews(userState.email, reviews, setReviews);
  useGetPreferences(userState.email, preferences, setPreferences);

  const sortedPreferences = useSortPreferences(preferences);
  const summary = useGetSummary({ reviews, preferences: sortedPreferences });
  const componentProps = useGetComponentProps([summary, sortedPreferences, reviews]);
  const ready = useGetReadyState(componentProps);

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
      {/* {ready && (
        <> */}
      {summary && <DefaultComponent summary={summary} active={activeComponentIdx === 0} />}
      {preferences && <PreferencesComponent preferences={sortedPreferences} active={activeComponentIdx === 1} />}
      {reviews && <ReviewsComponent reviews={reviews} active={activeComponentIdx === 2} />}
      {/* </> */}
      {/* )} */}
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
