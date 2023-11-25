import { CardContent, CardMedia, styled } from "@mui/material";
import { useEffect, useState, Fragment } from "react";

import Text from "../ui_components/Text";
import GridRow from "../ui_components/GridRow";
import RoundButton from "../ui_components/RoundButton";
import SwipeableDrawer from "../ui_components/SwipeableDrawer";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import API from "../API_Interface";

import { LOCATION_MASK_MESSAGE } from "../constants/Messages";
import BusinessLocator from "../components/Maps/Google_Maps/BusinessLocator";
import { useGetRestaurantReviews } from "../hooks/API/Yelp";

import SwipeableTemporaryDrawer from "../ui_components/SwipeableDrawer2";

const CardMediaComponent = styled(CardMedia)((props) => ({
  component: "img",
  alt: "card background img",
  height: "100%",
  flex: props.flex,
}));

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
});

const MapComponent = styled(Grid)((props) => ({
  GridRow: true,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "50%",
  width: "60%",
}));

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

const MainDetailsComponent = (props) => {
  const { details, flex } = props;
  const style = {
    display: "flex",
    height: "100%",
    width: "100%",
    padding: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: flex,
  };

  return (
    <CardContent style={style}>
      {/* <BorderedBox style={{ border: "4px dashed black" }}> */}
      {/* {details !== "" && details.map((detail, index) => detail)} */}
      {/* <Content /> */}
      {details}
      {/* </BorderedBox> */}
    </CardContent>
  );
};

const TextStyle = {
  alignItems: "center",
  borderBottom: "2px solid black",
  // height: "15%",
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
              //   console.log(str);
              return str;
            } else if (typeof element === "object") {
              const str = await objectToString(element);
              //   console.log(str);
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
              <Text key={index} style={TextStyle} text={data[attribute]} />;
            </TextComponent>
          );
          return component;
        }
      })
    ).then((result) => result);

    return resolve(<GridRow width={"100%"}>{attributesComponent}</GridRow>);
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
    index,
    restaurantData,
    email,
    onDecisionCallback,
    updateActiveRestaurant,
    onShowRestaurantLocationCallback,
    showLocation,
  } = props;

  const [data, setData] = useState({});
  const [mainDetails, setMainDetails] = useState(``);
  const [otherDetails, setOtherDetails] = useState({
    location: "",
  });

  // const [reviews] = useGetRestaurantReviews({ id: restaurantData.id });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getPreference = async () => {
      const params = {
        restaurantID: restaurantData.id,
        email: email,
      };
      const preferenceData = await API.Users.getRestaurantPreferences(params);
      if (preferenceData.status === "OK") {
        const preference = [...preferenceData.preference];
        updateActiveRestaurant(index, "preference", preference);
      }
    };
    if (restaurantData.preference == null) getPreference();
  }, [email, index, restaurantData.id, restaurantData.preference, updateActiveRestaurant]);

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
          <TopComponent flexDirection={"row"} justifyContent={"flex-start"}>
            <CardMediaComponent image={data.image_url} src={"img"} flex={"60%"} />
            <MainDetailsComponent flex={"40%"} details={mainDetails} />
          </TopComponent>
          <MapComponent>
            {otherDetails !== "" && otherDetails !== LOCATION_MASK_MESSAGE && (
              <BusinessLocator address={otherDetails.location} />
            )}
            <CardContent>
              <Text text={otherDetails.location} />
            </CardContent>
          </MapComponent>
          <ButtonsComponent flexDirection={"row"} justifyContent={"space-evenly"}>
            <RoundButton onClick={() => onDecisionCallback(false)}>
              <Text text={"no"} />
            </RoundButton>
            <RoundButton onClick={() => onShowRestaurantLocationCallback()}>
              <Text text={"hmm.."} />
            </RoundButton>
            <RoundButton onClick={() => onDecisionCallback(true)}>
              <Text text={"yes"} />
            </RoundButton>
          </ButtonsComponent>
        </CardContainer>
      )}
    </Fragment>
  );
};

export default Restaurant;
