import { CardContent, CardMedia, styled } from "@mui/material";
import { useEffect, useState, useContext, useCallback, Fragment } from "react";

import Text from "../ui_components/Text";
import GridRow from "../ui_components/GridRow";
import RoundButton from "../ui_components/RoundButton";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import API from "../API_Interface";
// import BusinessLocator from "../Google_Maps/BusinessLocator";
import BingMap from "../Bing_Maps";
// import MapBox from "./Maps";

import { LOCATIONMASKMESSAGE } from "../constants/Constants";

const CardMediaComponent = styled(CardMedia)(({ imageUrl }) => ({
  component: "img",
  alt: "card background img",
  height: "200px",
  width: "200px",
  backgroundImage: `url(${imageUrl})`,
}));

const CardContainer = styled(Card)({
  height: "90%",
  width: "75%",
  padding: "50px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const CardSubContainer = styled(Grid)((props) => ({
  width: "100%",
  height: "70%",
  gridRow: true,
  display: "flex",
  flexDirection: props.flexDirection,
  justifyContent: props.justifyContent,
  alignItems: "center",
}));

const CardContentStyle = {
  width: "80%",
  height: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
};

const TextStyle = {
  alignItems: "center",
  borderBottom: "2px solid black",
  height: "15%",
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
              // console.log(str);
              return str;
            }
            const str = key + ":" + value;
            return str;
          })
        ).then((stringArray) => stringArray.join(", "));

        // console.log("string", string);

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

  // console.log("values", values);
  const descriptionComponent = await Promise.all(
    keys.map((key, idx) => {
      const value = values[idx];
      const pair = `${key} : ${value}`;
      return pair;
    })
  ).then((comps) => {
    return comps.map((comp) => <Text style={TextStyle} text={comp} />);
  });

  return descriptionComponent;
};

const getAttributes = (attributes, data) => {
  return new Promise(async (resolve, reject) => {
    const attributesComponent = await Promise.all(
      attributes.map(async (attribute) => {
        if (attribute === "Description") {
          let component = await getDescription({ ...data[attribute] });
          return component;
        } else {
          const component = <Text style={TextStyle} text={data[attribute]} />;
          return component;
        }
      })
    ).then((result) => result);

    return resolve(<GridRow>{attributesComponent}</GridRow>);
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
  // url: restaurant.url,
  coordinates: restaurant.coordinates,
  location: restaurant.location.display_address.join(", "),
  image_url: restaurant.image_url,
  preference: restaurant.preference,
});

const extractOtherData = (restaurant, showLocation) => ({
  url: restaurant.url,
  coordinates: restaurant.coordinates,
  location: showLocation ? restaurant.location : LOCATIONMASKMESSAGE,
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

  useEffect(() => {
    const getPreference = async () => {
      const params = {
        restaurantID: restaurantData.id,
        email: email,
      };
      const preferenceData = await API.Users.getRestaurantPreferences(params);
      if (preferenceData.status === "OK") {
        console.log(preferenceData);
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
    getmainDetails();
    getOtherDetails();
  }, [data, props.index, restaurantData, showLocation]);

  return (
    <Fragment>
      {data && (
        <CardContainer>
          <CardSubContainer flexDirection={"row"} justifyContent={"flex-start"}>
            <CardMediaComponent imageUrl={data.image_url} />
            <CardContent sx={CardContentStyle}>{mainDetails}</CardContent>
          </CardSubContainer>
          <CardSubContainer
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <CardMediaComponent /> */}
            {/* <BusinessLocator address={otherDetails.location} /> */}
            {/* {otherDetails != null && (
              <BingMap coordinates={otherDetails.coordinates} />
            )} */}
            {/* {otherDetails && otherDetails.coordinates && <MapBox coordinates={otherDetails.coordinates} />} */}
            <CardContent>
              <Text text={otherDetails.location} />
            </CardContent>
          </CardSubContainer>
          <CardSubContainer flexDirection={"row"} justifyContent={"space-evenly"}>
            <RoundButton onClick={() => onDecisionCallback(false)}>
              <Text text={"no"} />
            </RoundButton>
            <RoundButton onClick={() => onShowRestaurantLocationCallback()}>
              <Text text={"hmm.."} />
            </RoundButton>
            <RoundButton onClick={() => onDecisionCallback(true)}>
              <Text text={"yes"} />
            </RoundButton>
          </CardSubContainer>
        </CardContainer>
      )}
    </Fragment>
  );
};

export default Restaurant;
