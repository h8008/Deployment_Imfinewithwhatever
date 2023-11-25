import { useEffect, useState } from "react";
import API_Interface from "../../API_Interface";

export const useGetRestaurantReviews = (params) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setTimeout(async () => {
        const res = await API_Interface.YelpAPI.getRestaurantReviews(params);
        if (res.status === "OK") {
          setReviews(res.restaurantsData.reviews);
        }
      }, [2500]);
    };
    if (params.id) {
      // setTimeout(async () => {
      fetch();
      // }, [2000]);
    }
  }, [params, params.id]);

  return [reviews];
};

const fetchRestaurantReviews = async (restaurantID) => {
  const res = await API_Interface.YelpAPI.getRestaurantReviews({ id: restaurantID });
  if (res.status === "OK") {
    return res.restaurantsData.reviews;
  }
  return [];
};

const initializeReviews = (num) => new Array(num).fill(true).map(() => []);
