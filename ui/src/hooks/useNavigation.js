// const { useContext, useEffect, useCallback } = require("react");
// const { NavigationContext } = require("../providers/NavigationProvider");
// const { NAVIGATE } = require("../reducer/Navigation/actions");

// const useNavigation = (destination, condition) => {
//   const { navigationDispatch } = useContext(NavigationContext);
//   const navigate = useCallback(() => {
//     if (condition) {
//       // console.log("navigating to another page");
//       navigationDispatch({
//         type: NAVIGATE,
//         payload: {
//           destination: destination,
//         },
//       });
//     }
//   }, [condition, destination, navigationDispatch]);
//   navigate();
// };

// export default useNavigation;
