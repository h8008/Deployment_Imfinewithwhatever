import Cookies from 'js-cookie';
import { useEffect } from 'react';

const useHydrate = (props) => {
  useEffect(() => {
    const { pageToHydrate } = props;
    const data = JSON.parse(Cookies.get(pageToHydrate));
    const { globalStatePayload, globalDispatch } = data;
    globalDispatch.forEach((dispatch, index) => {
      const payload = globalStatePayload[index];
      dispatch(payload);
    });
  });
};

export default useHydrate;
