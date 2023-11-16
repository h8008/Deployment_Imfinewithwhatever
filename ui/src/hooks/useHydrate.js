import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import API from "../API_Interface";
import { UPDATE_RESTAURANTS } from "../reducer/MainActions";

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
  const { userDispatch, refresh } = props;
  useEffect(() => {
    const fetch = async () => {
      if (refresh) {
        const yelpData = await API.Users.fetchYelpAPIData();
        if (yelpData.status === "OK") {
          await userDispatch({
            type: UPDATE_RESTAURANTS,
            restaurantsData: yelpData.businesses,
            region: yelpData.region,
          });
        }
      }
    };
    fetch();
  }, [refresh, userDispatch]);
};

export default useHydrate;
