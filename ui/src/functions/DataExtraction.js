const arrayToString = (array) => {
  return new Promise(async (resolve, reject) => {
    const string = await Promise.all(
      array.map(async (element) => {
        if (Array.isArray(element)) {
          const str = await arrayToString(element);
          //   console.log(str);
          return str;
        } else if (typeof element === "object") {
          const str = await objectToString(element);
          //   console.log(str);
          return str;
        }
        return element;
      })
    ).then((stringArray) => stringArray.join(", "));

    return resolve(string);
  });
};

const objectToString = (object) => {
  // console.log("object", object);
  if (object == null) {
    return "";
  }
  return new Promise(async (resolve, reject) => {
    const keys = Object.keys(object);
    const values = Object.values(object);
    const pairs = keys.map((key, idx) => [key, values[idx]]);

    const string = await Promise.all(
      pairs.map(async ([key, value]) => {
        if (Array.isArray(value)) {
          let str = await arrayToString(value);
          return key + ": " + str;
        } else if (typeof value === "object") {
          let str = await objectToString(value);
          // console.log(str);
          return key + ": " + str;
        }
        const str = key + ": " + value;
        return str;
      })
    ).then((stringArray) => stringArray.join(", "));

    // console.log("string", string);

    return resolve(string);
  });
};

export { objectToString, arrayToString };
