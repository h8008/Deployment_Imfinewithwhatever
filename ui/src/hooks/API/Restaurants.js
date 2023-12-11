import { useEffect, useState, useMemo } from "react";
import { stealRestaurantsFromYelp, fetchRestaurantsFromYelp } from "../../utils/axios/restaurants";

const useStealRestaurantsFromYelp = (restaurants) => {
  useEffect(() => {
    const steal = async () => {
      const res = await stealRestaurantsFromYelp({ restaurants });
      if (res.status === "OK") {
        console.log("Stole restaurants from Yelp");
      }
    };
    if (restaurants != null && Object.keys(restaurants).length > 0) steal();
  }, [restaurants]);
};

// const useFetchYelpRestaurants = (fetchCond, region) => {
//   // const [restaurants, setRestaurants] = useState({});
//   const filterRestaurantByRegion = async (restaurants, region) =>
//     region && Object.keys(region) > 0 ? await restaurants.filter((r) => r.region === region) : restaurants[0];

//   const restaurants = useMemo(() => {
//     const fetch = async () => {
//       var res = await fetchRestaurantsFromYelp();
//       res = await filterRestaurantByRegion(res, region);
//       return res;
//     };
//     if (fetchCond == null || fetchCond.length === 0) fetch();
//   }, [fetchCond, region]);

//   return [restaurants];
// };

const useFetchYelpRestaurants = (newRestaurants, region) => {
  const [restaurants, setRestaurants] = useState(newRestaurants);
  const filterRestaurantByRegion = async (restaurants, region) =>
    region && Object.keys(region) > 0 ? await restaurants.filter((r) => r.region === region) : restaurants[0];

  useEffect(() => {
    const fetch = async () => {
      var res = await fetchRestaurantsFromYelp();
      res = await filterRestaurantByRegion(res, region);
      setRestaurants(res);
    };
    if (newRestaurants == null || Object.keys(newRestaurants).length === 0) fetch();
  }, [region, newRestaurants]);

  return [restaurants];
};

const useSelectRestaurantsByLocation = (allRestaurants, region) => {
  const restaurants = useMemo(() => {
    if (allRestaurants) {
      return region
        ? allRestaurants.filter((el) => Object.values(el.region.center) === Object.values(region.center))
        : allRestaurants[0];
    }
    return {};
  }, [region, allRestaurants]);
  return [restaurants];
};

export { useStealRestaurantsFromYelp, useFetchYelpRestaurants, useSelectRestaurantsByLocation };
