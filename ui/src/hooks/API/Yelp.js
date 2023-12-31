import { useEffect, useState, useMemo } from "react";
import {  API  }   from "../../API_Interface";

export const useGetRestaurantReviews = (params, reviews, setReviews) => {
  // const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetch = () => {
      setTimeout(async () => {
        const res = await API.YelpAPI.getRestaurantReviews(params);
        if (res.status === "OK") {
          setReviews(res.restaurantsData.reviews);
        }
      }, [1200]);
    };
    if (reviews.length === 0) fetch();
  }, [params, reviews.length, setReviews]);

  return [reviews];
};

// export const useGetRestaurantReviews = ({ id }) => {
//   const reviews = useMemo(() => {
//     const fetch = async () => {
//       const res = await API_Interface.YelpAPI.getRestaurantReviews(id);
//       if (res.status === "OK") {
//         return res.restaurantsData.reviews;
//       }
//       return [];
//     };
//     return fetch();
//   }, [id]);
//   return [reviews];
// };

// const fetchRestaurantReviews = async (restaurantID) => {
//   const res = await API_Interface.YelpAPI.getRestaurantReviews({ id: restaurantID });
//   if (res.status === "OK") {
//     return res.restaurantsData.reviews;
//   }
//   return [];
// };

// const initializeReviews = (num) => new Array(num).fill(true).map(() => []);
