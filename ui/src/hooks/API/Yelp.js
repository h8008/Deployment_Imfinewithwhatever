import { useEffect, useState } from "react";
import API_Interface from "../../API_Interface";

export const useGetRestaurantReviews = (params) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await API_Interface.YelpAPI.getRestaurantReviews(params);
      if (res.status === "OK") {
        setReviews(res.restaurantsData.reviews);
      }
    };
    if (params.id) {
      fetch();
    }
  }, [params, params.id]);

  return [reviews];
};
