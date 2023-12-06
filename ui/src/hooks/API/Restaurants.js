import { useEffect } from "react";
import { stealRestaurantsFromYelp } from "../../utils/axios/restaurants";

const useStealRestaurantsFromYelp = (restaurants) => {
  useEffect(() => {
    const steal = async () => {
      const res = await stealRestaurantsFromYelp({ restaurants });
      if (res.status === "OK") {
        // handle error
        console.log("Stole restaurants from Yelp");
      }
    };
    if (restaurants != null && Object.keys(restaurants).length > 0) steal();
  }, [restaurants]);
};

export default useStealRestaurantsFromYelp;
