// import { Fragment, useCallback, useContext, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { NavigationContext } from "../providers/NavigationProvider";
// import { GET_LOCATION_CHANGE } from "../reducer/Navigation/actions";

// const useUpdatePageHistory = (prev, cur, navigationDispatch) => {
//   const updatePageHistory = useCallback(() => {
//     if (prev !== cur) {
//       navigationDispatch({
//         type: GET_LOCATION_CHANGE,
//         payload: {
//           location: cur,
//         },
//       });
//     }

//     updatePageHistory();
//   }, [prev, cur, navigationDispatch]);
// };

// const UseLocationWrapper = (props) => {
//   const { navigationState, navigationDispatch } = useContext(NavigationContext);
//   const prev = navigationState.history[-1];
//   const cur = useLocation();

//   useUpdatePageHistory(prev, cur, navigationDispatch);

//   return <Fragment>{props.children}</Fragment>;
// };

// export default UseLocationWrapper;
