import {  API  }   from '../API_Interface';
import { arrayToString, objectToString } from './DataExtraction';
import Cookies from 'js-cookie';

const storeCookie = async (name, object) => {
  const string = await Promise.all(
    Object.values(object).map(async (value) => {
      if (Array.isArray(value)) {
        const string = await arrayToString(value);
        console.log('string', string);
        return string;
      } else if (typeof value === 'object') {
        console.log('value', value);
        const string = await objectToString(value);
        console.log('string', string);
        return string;
      }
      console.log('string', value);
      return value;
    })
  ).then((string) => string);

  console.log('stringified object', string);
  Cookies.set(name, string);
};

const storeUser = async (user) => {
  const res = await API_Interface.Users.addCurrentUserData(user);
  if (res.status === 'OK') {
    return true;
  }
  return false;
};

export { storeCookie, storeUser };
