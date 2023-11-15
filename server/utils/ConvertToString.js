const handleObject = (keys, values) => {
  const string = values.reduce(
    ((acc, val, idx) => {
      const value = typeof val !== 'string' ? convertToString(val) : val;
      const key = JSON.stringify(keys[idx]);
      const str = acc + ',' + `${key}:${value}` + ',';
      return str;
    },
    '')
  );
  return string;
};

const handleArray = (arr) => {
  return arr.reduce((acc, el, idx) => {
    const str = '';
    if (typeof el) {
      str = handleArray(el);
    }
    if (typeof el) {
      str = handleObject(el);
    } else {
      str = convertToString(el);
    }
    return acc + ',' + str + ',';
  }, '');
};

const convertToString = (data) => {
  if (typeof data === 'string') {
    return data;
  }
  if (typeof data !== 'object' || typeof data !== 'array') {
    return JSON.stringify(data);
  }
  if (typeof data === 'object') {
    const keys = Object.keys(data);
    const values = Object.values(data);
    return handleObject(keys, values);
  }
  if (typeof data === 'array') {
    return handleArray(data);
  }
};

module.exports = convertToString;
