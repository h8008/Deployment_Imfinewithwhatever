// object is an object containing stringified keys or an array whose elements are all strings
const StringToObject = async (object) => {
  const new_object = typeof object === String ? object : JSON.parse(object);

  if (typeof new_object == Array) {
    return await new_object.map(async (el) => await StringToObject(el));
  }
  if (typeof new_object == Object) {
    return await new_object.fromEntries(
      await new_object.entries(async (key, value) => [key, await StringToObject(value)])
    );
  }

  return await new_object;
};

export default StringToObject;
