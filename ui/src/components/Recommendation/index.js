import { useContext, useEffect, useMemo, useState } from "react";
import { API } from "../../API_Interface/";
import { UserContext } from "../../providers/UserProvider";

const useGetAllPreferences = async () => {
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await API.Preference.getAll();
      const preferences = res.status === "OK" ? res.data : undefined;
      setPreferences(preferences);
    };
    fetch();
  }, []);
  return [preferences];
};

const useGetPreferenceForCurrentUser = async ({ email }) => {
  const [preference, setPreference] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await API.Preference.getAll();
      const preference = res.status === "OK" ? res.data : undefined;
      setPreference(preference);
    };
    fetch();
  }, []);
  return [preference];
};

const getDislikes = (preference) => preference.filter((p) => p.like === false);
const getLikes = (preference) => preference.filter((p) => p.like === true);
const findIntersection = (arr1, arr2) => {
  var base = arr1.length > arr2.length ? [...arr1] : [...arr2];
  var ref = arr1.length > arr2.length ? [...arr2] : [...arr1];
  base = Object.fromEntries(base.map((el, i) => [JSON.stringify(el), 0]));
  var intersection = ref
    .map((el, i) => {
      var key = JSON.stringify(el);
      var value = base[key];
      if (value) {
        return JSON.parse(value);
      }
      return null;
    })
    .filter((el) => el);
  return intersection;
};

const collaborativeFiltering = (allPreferences, preference) => {
  const currentUserWhiteList = getLikes(preference);
  const currentUserBlackList = getDislikes(preference);
  const allUserWhiteList = getLikes(allPreferences);
  const allUserBlackList = getDislikes(allPreferences);

  const commonWhiteLists = findIntersection(currentUserWhiteList, allUserWhiteList);
  const commonBlackLists = findIntersection(currentUserBlackList, allUserBlackList);

  if (commonWhiteLists.length > 0) {
    return commonWhiteLists.reduce(
      ((acc, cur, curIdx) => {
        const dict = Object.fromEntries(acc.map((el) => [el, el]));
        return dict[cur] == null ? [...acc, cur] : [cur];
      },
      [])
    );
  }
};

const Recommendation = (props) => {
  const { userState } = useContext(UserContext);

  const [allPreferences] = useGetAllPreferences();
  const [preference] = useGetPreferenceForCurrentUser({ email: userState.email });

  return <></>;
};
