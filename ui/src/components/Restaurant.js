import { CardContent, CardMedia, Card, Grid, styled, Typography, Box } from "@mui/material";
import Icon from "@mui/material/Icon";
import { useEffect, useState, Fragment } from "react";

import Text from "../ui_components/Text";
import GridRow from "../ui_components/GridRow";
import RoundButton from "../ui_components/RoundButton";
import SwipeableDrawer from "../ui_components/SwipeableDrawer";
import BorderedBox from "../ui_components/BorderedBox";

import { API } from "../API_Interface";
import { useGetRestaurantReviews } from "../hooks/API/Yelp";
import { LOCATION_MASK_MESSAGE } from "../constants/Messages";
import BusinessLocator from "../components/Maps/Google_Maps/BusinessLocator";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { MdLocalDining } from "react-icons/md";
import { useTheme } from "@emotion/react";

const RestaurantComponent = styled(Grid)((props) => ({
  height: "100vh",
  // width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center"
}))

const WhatOthersSayComponent = styled(Grid)((props) => ({
  display: "flex",
  flexWrap: "wrap",
}));

const CardContainer = styled(Card)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  width: "fit-content",
  height: "95vh",
  backgroundColor: "white",
  id: "restaurant-container",
  borderLeft: "8px solid black",
  borderRight: "8px solid black",
  borderBottom: "8px solid black",
  borderBottomLeftRadius: "20px",
  borderBottomRightRadius: "20px",
  padding: "20px",
  // margin: "20px",
  overflow: "scroll",
});

const MapComponent = styled(Grid)((props) => ({
  GridRow: true,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
  width: "60%",
}));

const PlaceHolderMapComponent = (props) => {
  const style = {
    width: "fit-content",
    padding: "20px",
    height: "400px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <BorderedBox style={style}>
      <Text text={LOCATION_MASK_MESSAGE} color={"black"} />
    </BorderedBox>
  );
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

const TopComponent = styled(Grid)(({ children, ...otherProps}) => ({
  width: "100%",
  // height: "40%",
  padding: "20px",
  gridRow: true,
  sx: {
    display: "flex",
    flex: otherProps.flex,
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: otherProps.justifyContent,
    alignItems: "center",
  },
}));

const BodyComponent = styled(Grid)(({ children, ...otherProps}) => ({
  width: "100%",
  // height: "60%",
  display: "flex",
  // flexDirection: { sm: "column", md: "row" },
  flexDirection: "column",
  gap: "20px",
  padding: "20px",
  justifyContent: "center",
  alignItems: "center",
  ...otherProps
}));

const TextComponent = styled(Typography)((children, ...otherProps) => ({
  // gridRow: true,
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  justifyContent: "flex-start",
  alignItems: "center",
  ...otherProps,
}));

const MainDetailsComponent = styled(CardContent)(({ children, ...otherProps }) => ({
  display: "flex",
  height: "100%",
  width: "100%",
  padding: 0,
  flexDirection: "column",
  justifyContent: "flex-start",
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
      // <TextComponent width={"100%"} height={"15%"}>
      //   <Text key={index} style={TextStyle} text={comp} />
      // </TextComponent>
      <Grid width={"100%"} borderBottom={`1px solid black`}>
        <TextComponent key={index} sx={TextStyle} width={"100%"} height={"15%"}>
          {/* <Text key={index} style={TextStyle} text={data[attribute]} /> */}
          {comp}
        </TextComponent>
      </Grid>
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
            <Grid width={"100%"} borderBottom={`1px solid black`}>
              <TextComponent key={index} sx={TextStyle} width={"100%"} height={"15%"}>
                {/* <Text key={index} style={TextStyle} text={data[attribute]} /> */}
                {data[attribute]}
              </TextComponent>
            </Grid>
          );
          return component;
        }
      })
    ).then((result) => result);

    return resolve(<Grid width={"90%"}>{attributesComponent}</Grid>);
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
    viewingSingle,
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
  const [reviews, setReviews] = useState([]);

  useGetRestaurantReviews({ id: restaurantData.id }, reviews, setReviews);

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
    <RestaurantComponent>
      {data != null && (
        <CardContainer>
          <TopComponent flexDirection={"row"} justifyContent={"center"} flex={ 2 / 5}>
            <CardMedia
              sx={{ flex: "1/2", border: `8px black solid`, borderRadius: "20px" }}
              image={data.image_url}
              component={"img"}
              src={"img"}
              height={"250px"}
            />
            <MainDetailsComponent flex={"1/2"}>{mainDetails}</MainDetailsComponent>
          </TopComponent>
          <BodyComponent flex={ 3 / 5 }>
            <WhatOthersSayComponent>
              {reviews.length > 0 && (
                <Grid width={"100%"} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} container>
                  <SwipeableDrawer items={reviews.map((r) => r.text)} xs={2} />
                  <Typography xs={10} fontFamily={"monospace"} fontWeight={"bolder"} display={"flex"} flexWrap={"wrap"}>
                    {"See what others are saying"}
                  </Typography>
                </Grid>
              )}
            </WhatOthersSayComponent>
            <MapComponent xs={12}>
              {otherDetails !== "" && otherDetails.location !== LOCATION_MASK_MESSAGE ? (
                <BusinessLocator address={otherDetails.location} />
              ) : (
                <PlaceHolderMapComponent />
              )}
              {/* <CardContent>
                <Text text={otherDetails.location} />
              </CardContent> */}
            </MapComponent>
          </BodyComponent>
          <ButtonsComponent flexDirection={"row"} justifyContent={"space-evenly"}>
            <>
              {!viewingSingle && (
                <Icon fontSize="large" color={theme.palette.primary.contrastText} onClick={onViewPrevCallback}>
                  <KeyboardDoubleArrowLeftIcon />
                </Icon>
              )}

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
              {!viewingSingle && (
                <Icon fontSize="large" color={theme.palette.primary.contrastText} onClick={onViewNextCallback}>
                  <KeyboardDoubleArrowRightIcon />
                </Icon>
              )}
            </>
          </ButtonsComponent>
        </CardContainer>
      )}
    </RestaurantComponent>
  );
};

export default Restaurant;
