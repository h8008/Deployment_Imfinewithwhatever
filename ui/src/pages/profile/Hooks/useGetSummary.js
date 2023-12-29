import { useMemo, useEffect, useState } from "react";
import quicksort from "../../../utils/Quicksort";

const filterReviews = (reviews, filter) => {
  switch (filter.qualifier) {
    case ">":
      return reviews.filter((r, i) => r[filter.key] > filter.val);
    case "<":
      return reviews.filter((r, i) => r[filter.key] < filter.val);
    case "=":
      return reviews.filter((r, i) => r[filter.key] === filter.val);
    case "<=":
      return reviews.filter((r, i) => r[filter.key] <= filter.val);
    case ">=":
      return reviews.filter((r, i) => r[filter.key] >= filter.val);
    default:
      return [];
  }
};

// const filterPreferences = async (preferece, filter) => {
//   //   if (preferece.length === 0) return [];
//   const list = preferece.filter((p) => p.like === filter).map((p) => p);
//   if (list.length > 0) {
//     var categories = list.reduce((acc, cur, i) => {
//       return [...acc, ...cur];
//     }, []);
//     categories = categories.reduce((occ, cur, i) => {
//       const key = cur;
//       occ[key] += occ[cur] != null;
//       return { ...occ };
//     }, Object.fromEntries(categories.map((cat) => [cat, 1])));
//     var top = Object.keys(categories).map((cat, i) => [cat, Object.values(categories)[i]]);
//     const order = await quicksort(top, 0, top.length - 1);
//     return await order.slice(0, 3);
//   }
//   return list;
// };

const filterPreferences = async (preferece, filter) => {
  //   if (preferece.length === 0) return [];
  const categoriesList = preferece.map((p) => {
    const cats = p[0].split(",");
    return cats.map((cat, i) => [cat, p[1]]);
  });
  // const categoriesList = categoriesWithOccurrence.map((cat) => cat[0]);
  if (categoriesList.length > 0) {
    var categories = categoriesList.reduce((acc, cur, i) => {
      return [...acc, ...cur.map((c) => c)];
    }, []);
    categories = categories.reduce((occ, cur, i) => {
      const key = cur[0];
      occ[key] += occ[key] != null;
      return { ...occ };
    }, Object.fromEntries(categories.map((cat) => [cat[0], 1])));
    var top = Object.keys(categories).map((cat, i) => [cat, Object.values(categories)[i]]);
    const order = await quicksort(top, 0, top.length - 1);
    return await order.slice(0, 3);
  }
  return categoriesList;
};

const sumUpPreferences = async (preferences) => {
  const blacklist = await filterPreferences(preferences.dislikes);
  const whitelist = await filterPreferences(preferences.likes);
  return { blacklist, whitelist };
};

const sumUpReviews = (reviews) => {
  const numReviews = reviews.length;
  const goodReviews = filterReviews(reviews, { qualifier: ">=", key: "rating", val: "6" });
  const badReviews = filterReviews(reviews, { qualifier: "<=", key: "rating", val: "4" });
  const neutralReviews = filterReviews(reviews, { qualifier: "=", key: "rating", val: "5" });
  return { numReviews, goodReviews, badReviews, neutralReviews };
};

const useGetSummary = (props) => {
  // const summary = useMemo(() => (!ready ? {} : writeSummary(reviews, preferences)), [ready, reviews, preferences]);
  // const [summary, setSummary] = useState(undefined);
  const [summary, setSummary] = useState({});
  const reviews = useMemo(() => (props.reviews ? [...props.reviews] : []), [props.reviews]);
  const preferences = useMemo(() => (props.preferences ? { ...props.preferences } : {}), [props.preferences]);

  useEffect(() => {
    const getSummary = async () => {
      let reviewSummary = {};
      let preferenceSummary = {};
      if (reviews.length > 0) reviewSummary = await sumUpReviews(reviews);
      if (Object.keys(preferences).length > 0) preferenceSummary = await sumUpPreferences(preferences);
      if (Object.keys(reviewSummary).length > 0 || Object.keys(preferences).length > 0)
        setSummary({ reviewSummary, preferenceSummary });
    };
    getSummary();
  }, [preferences, reviews]);

  return summary;
};

export default useGetSummary;
