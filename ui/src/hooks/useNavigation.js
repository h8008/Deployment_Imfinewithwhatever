const { useContext, useEffect } = require("react");
const { NavigationContext } = require("../providers/NavigationProvider");
const { NAVIGATE } = require("../reducer/Navigator/actions");

const useNavigation = (destination) => {
  const { navigationDispatch } = useContext(NavigationContext);
  useEffect(() => {
    navigationDispatch({
      type: NAVIGATE,
      payload: {
        destination: destination,
      },
    });
  });
};

export default useNavigation;
