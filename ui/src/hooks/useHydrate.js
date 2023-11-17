import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import API from "../API_Interface";
import { UPDATE_RESTAURANTS } from "../reducer/MainActions";
import StringToObject from "../utils/StringToObject";

// const useHydrate = (props) => {
//   useEffect(() => {
//     const { pageToHydrate } = props;
//     const data = JSON.parse(Cookies.get(pageToHydrate));
//     const { globalStatePayload, globalDispatch } = data;
//     globalDispatch.forEach((dispatch, index) => {
//       const payload = globalStatePayload[index];
//       dispatch(payload);
//     });
//   });
// };

const useHydrate = (props) => {
  const { dispatch, refresh, email } = props;
  useEffect(() => {
    const fetch = async () => {
      if (refresh) {
        const yelpData = await API.Users.fetchYelpAPIData({ email });
        if (yelpData.status === "OK") {
          const data = await StringToObject(yelpData.data);
          // console.log("de stringified data", data);
          await dispatch({
            type: UPDATE_RESTAURANTS,
            restaurantsData: data.businesses,
            region: data.region,
          });
        }
      }
    };
    fetch();
  }, [email, refresh, dispatch]);
};

export default useHydrate;
