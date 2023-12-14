const mapSlotsToOptions = (optionsData, containerWidth) => {
  const extractNames = (options) => {
    return options.map((option) => option.name);
  };

  const options = extractNames(optionsData);

  if (options == null || options.length === 0) return [];
  const numOptions = options.length;
  const containers = Array(numOptions + 1)
    .fill()
    .map((_, index) => index);

  // Gets the the average width of a container for one option
  // const containerWidth = (barsSectionWidth - numOptions * barWidth) / numOptions;

  // Creates an array of widths. Each element in the array is the width
  // of a container that represents an option
  const containerWidths = containers.map((container, idx) => {
    return { index: idx, width: containerWidth };
  });

  // Creates an new array of widths. Each element in the array is the accumulated width
  // of a container from left to right that represents an option
  // const newContainerWidths = [];
  // containerWidths.reduce((accWidth, curWidth, _) => {
  //   const newAccWidth = curWidth.width + accWidth;
  //   const newWidth = { ...curWidth, width: newAccWidth };
  //   newContainerWidths.push({ ...newWidth });
  //   return newAccWidth;
  // }, 0);

  // Creates an new array of widths. Each element in the array is the accumulated width
  // of a container from left to right that represents an option
  const bounds = containerWidths
    .reduce(
      (accWidth, curWidth, curIdx) => {
        if (curIdx === 0) return accWidth;
        const preIdx = curIdx - 1;
        const accumulativeWidth = curWidth.width + accWidth[preIdx][1];
        return [...accWidth, [{ index: curIdx, width: accumulativeWidth }, accumulativeWidth]];
      },
      [[{ index: 0, width: 0 }, 0]]
    )
    .map((bound) => bound[0]);

  return bounds;
};

export default mapSlotsToOptions;
