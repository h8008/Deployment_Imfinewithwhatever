import { CardContent, CardMedia, Card, Grid, styled } from "@mui/material";
import Icon from "@mui/material/Icon";
import { useEffect, useState, Fragment } from "react";

import Text from "../ui_components/Text";
import GridRow from "../ui_components/GridRow";
import RoundButton from "../ui_components/RoundButton";
import SwipeableDrawer from "../ui_components/SwipeableDrawer";
import BorderedBox from "../ui_components/BorderedBox";

import API from "../API_Interface";
import { useGetRestaurantReviews } from "../hooks/API/Yelp";
import { LOCATION_MASK_MESSAGE } from "../constants/Messages";
import BusinessLocator from "../components/Maps/Google_Maps/BusinessLocator";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { MdLocalDining } from "react-icons/md";
import { useTheme } from "@emotion/react";

const CardContainer = styled(Card)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "60%",
  height: "85%",
  backgroundColor: "white",
  id: "restaurant-container",
  border: "8px solid black",
  borderRadius: "20px",
  padding: "20px",
  margin: "20px",
});

const MapComponent = styled(Grid)((props) => ({
  GridRow: true,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "50%",
  width: "60%",
}));

const PlaceHolderMapComponent = (props) => {
  const style = {
    width: "750px",
    height: "400px",
    borderRadius: "20px",
  };

  return <BorderedBox style={style} />;
};

const CardMediaComponent = ({ children, ...otherProps }) => {
  const props = { ...otherProps, style: { borderRadius: "20px" } };
  return <BorderedBox {...props}>{children}</BorderedBox>;
};

const ButtonsComponent = styled(Grid)((props) => ({
  width: "60%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
}));

const TopComponent = styled(Grid)((props) => ({
  width: "100%",
  height: "40%",
  padding: "20px",
  gridRow: true,
  display: "flex",
  flex: props.flex,
  flexDirection: props.flexDirection,
  justifyContent: props.justifyContent,
  alignItems: "center",
}));

const TextComponent = styled(GridRow)((children, ...otherProps) => ({
  gridRow: true,
  ...otherProps,
}));

const MainDetailsComponent = styled(CardContent)(({ children, ...otherProps }) => ({
  display: "flex",
  height: "100%",
  width: "100%",
  padding: 0,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  ...otherProps,
}));

const TextStyle = {
  alignItems: "center",
  borderBottom: "2px solid black",
  textAlign: "left",
};

const attributes = ["Name", "Type", "Description"];

// Extract values from the description of a restaurant which is an object
// Because the values of an object can be arrays, object, or other primitive types
// Recursively extracts those values using helper functions: arrayToString and objectToString
const getDescription = async (description) => {
  const getValues = async (values) => {
    const arrayToString = (array) => {
      return new Promise(async (resolve, reject) => {
        const string = await Promise.all(
          array.map(async (element) => {
            if (Array.isArray(element)) {
              const str = await arrayToString(element);
              return str;
            } else if (typeof element === "object") {
              const str = await objectToString(element);
              return str;
            }
            return element;
          })
        ).then((stringArray) => stringArray.join(", "));

        return resolve(string);
      });
    };

    const objectToString = (object) => {
      return new Promise(async (resolve, reject) => {
        const keys = Object.keys(object);
        const values = Object.values(object);
        const pairs = keys.map((key, idx) => [key, values[idx]]);
        const string = await Promise.all(
          pairs.map(async ([key, value]) => {
            if (typeof value === "object") {
              const str = await objectToString(value);
              return str;
            }
            const str = key + ":" + value;
            return str;
          })
        ).then((stringArray) => stringArray.join(", "));
        return resolve(string);
      });
    };

    return new Promise(async (resolve, reject) => {
      if (Array.isArray(values)) {
        const string = await Promise.all(
          values.map(async (value) => {
            if (Array.isArray(value)) {
              return await arrayToString([...value]);
            } else if (typeof value === "object") {
              return await objectToString({ ...value });
            } else {
              return value;
            }
          })
        );
        return resolve(string);
      }

      if (typeof values === "object") {
        const string = await objectToString({ ...values });
        return resolve(string);
      }
    });
  };

  const keys = Object.keys(description);
  let values = Object.values(description);
  values = await getValues(values);

  const descriptionComponent = await Promise.all(
    keys.map((key, idx) => {
      const value = values[idx];
      const pair = `${key} : ${value}`;
      return pair;
    })
  ).then((comps) => {
    return comps.map((comp, index) => (
      <TextComponent width={"100%"} height={"15%"}>
        <Text key={index} style={TextStyle} text={comp} />
      </TextComponent>
    ));
  });

  return descriptionComponent;
};

const getAttributes = (attributes, data) => {
  return new Promise(async (resolve, reject) => {
    const attributesComponent = await Promise.all(
      attributes.map(async (attribute, index) => {
        if (attribute === "Description") {
          let component = await getDescription({ ...data[attribute] });
          return component;
        } else {
          const component = (
            <TextComponent width={"100%"} height={"15%"}>
              <Text key={index} style={TextStyle} text={data[attribute]} />
            </TextComponent>
          );
          return component;
        }
      })
    ).then((result) => result);

    return resolve(<Grid width={"60%"}>{attributesComponent}</Grid>);
  });
};

const extractData = (restaurant) => ({
  Name: restaurant.name,
  Type: restaurant.categories.map((cat) => cat.title).join(", "),
  Description: {
    open: restaurant.is_closed ? "No" : "Yes",
    phone: restaurant.display_phone ? restaurant.display_phone : "Not available",
    rating: restaurant.rating,
    reviews: restaurant.review_count,
  },
  coordinates: restaurant.coordinates,
  location: restaurant.location.display_address.join(", "),
  image_url: restaurant.image_url,
  preference: restaurant.preference,
});

const extractOtherData = (restaurant, showLocation) => ({
  url: restaurant.url,
  coordinates: restaurant.coordinates,
  location: showLocation ? restaurant.location : LOCATION_MASK_MESSAGE,
  image_url: restaurant.image_url,
});

const Restaurant = (props) => {
  const {
    restaurantData,
    onDecisionCallback,
    onShowRestaurantLocationCallback,
    showLocation,
    onViewPrevCallback,
    onViewNextCallback,
    onDoneSettingPreferenceCallback,
  } = props;

  const theme = useTheme();
  const [data, setData] = useState({});
  const [mainDetails, setMainDetails] = useState(``);
  const [otherDetails, setOtherDetails] = useState({
    location: "",
  });

  // const [reviews] = useGetRestaurantReviews({ id: restaurantData._id });
  const [reviews, setReviews] = useState([]);

  // console.log("reviews", reviews);

  // useEffect(() => {
  //   const getPreference = async () => {
  //     const params = {
  //       restaurantID: restaurantData.id,
  //       email: email,
  //     };
  //     const preferenceData = await API.Users.getRestaurantPreferences(params);
  //     if (preferenceData.status === "OK") {
  //       const preference = [...preferenceData.preference];
  //       updateActiveRestaurant(index, "preference", preference);
  //     }
  //   };
  //   if (restaurantData.preference == null) getPreference();
  // }, [email, index, restaurantData.id, restaurantData.preference, updateActiveRestaurant]);

  useEffect(() => {
    const data = extractData(restaurantData);
    setData(data);
  }, [restaurantData]);

  useEffect(() => {
    const getmainDetails = async () => {
      const mainDetails = await getAttributes(attributes, data);
      setMainDetails(mainDetails);
    };
    const getOtherDetails = async () => {
      const otherDetails = await extractOtherData(data, showLocation);
      setOtherDetails(otherDetails);
    };
    if (data) {
      getmainDetails();
      getOtherDetails();
    }
  }, [data, props.index, restaurantData, showLocation]);

  return (
    <Fragment>
      {data != null && (
        <CardContainer>
          {reviews.length > 0 && <SwipeableDrawer items={reviews.map((r) => r.text)} />}
          <TopComponent flexDirection={"row"} justifyContent={"center"}>
            <CardMediaComponent flex={"55%"}>
              <CardMedia image={data.image_url} component={"img"} src={"img"} height={"300px"} />
            </CardMediaComponent>
            <MainDetailsComponent flex={"45%"}>{mainDetails}</MainDetailsComponent>
          </TopComponent>
          <MapComponent>
            {otherDetails !== "" && otherDetails.location !== LOCATION_MASK_MESSAGE ? (
              <BusinessLocator address={otherDetails.location} />
            ) : (
              <PlaceHolderMapComponent />
            )}
            <CardContent>
              <Text text={otherDetails.location} />
            </CardContent>
          </MapComponent>
          <ButtonsComponent flexDirection={"row"} justifyContent={"space-evenly"}>
            <Icon fontSize="large" color={theme.palette.primary.contrastText} onClick={onViewPrevCallback}>
              <KeyboardDoubleArrowLeftIcon />
            </Icon>
            <RoundButton onClick={() => onDecisionCallback(false)}>
              <Text text={"no"} />
            </RoundButton>
            <RoundButton onClick={() => onShowRestaurantLocationCallback()}>
              <Text text={"hmm.."} />
            </RoundButton>
            <RoundButton onClick={() => onDecisionCallback(true)}>
              <Text text={"yes"} />
            </RoundButton>
            <RoundButton onClick={() => onDoneSettingPreferenceCallback()}>
              <MdLocalDining size={"large"} color={theme.palette.primary.main} />
            </RoundButton>
            <Icon fontSize="large" color={theme.palette.primary.contrastText} onClick={onViewNextCallback}>
              <KeyboardDoubleArrowRightIcon />
            </Icon>
          </ButtonsComponent>
        </CardContainer>
      )}
    </Fragment>
  );
};

export default Restaurant;
