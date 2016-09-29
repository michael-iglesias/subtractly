import R from 'ramda';
import {indexOf as _indexOf, cloneDeep as _cloneDeep} from 'lodash';

// subtractly :: a -> b -> a
function subtractly (param1, param2) {
  try {
    // Termination case -> param1 & param2 must be of same type or (object, array)
    if ((typeof param1 !== typeof param2) && !(typeof param1 === 'object' && Array.isArray(param2))) throw new Error(`(${param1}, ${param2}) must be of the same type or (object, array)`);

    // Remove all occurences of param2 from param1 are String's
    if (typeof param1 === 'string') return subtractStrings(param1, param2);

    // Take difference of param1 and param2 when both are []'s
    if (Array.isArray(param1)) return subtractArrays(param1, param2);

    // Subtract param2(Object) from param1(object)
    if (Object.prototype.toString.call(param1) === '[object Object]' && Object.prototype.toString.call(param2) === '[object Object]') {
      return subtractObjects(param1, param2);
    }

    // Take difference of param1 and param2 when both are {}'s
    if (Object.prototype.toString.call(param1) === '[object Object]' && Array.isArray(param2)) {
      return subtractPropsFromObject(param1, param2);
    }

    // Default case param1 & param2 are numbers
    return subtractNumbers(param1, param2);
  } catch (err) {
    return err;
  }
}

// subtractNumbers :: (Number, Number) -> Number
export function subtractNumbers (param1, param2) {
  return param1 - param2;
}

// subtractStrings :: (String, String) -> String
export function subtractStrings (param1, param2) {
  return param1.split(param2).join('');
}

// subtractArrays :: (Array, Array) -> Array
export function subtractArrays (param1, param2) {
  let arr1 = _cloneDeep(param1);
  let arr2 = _cloneDeep(param2);

  return arr1.filter((currVal) => {
    return !(_indexOf(arr2, currVal) >= 0);
  });
}

// diffObjects :: (Object, Object) -> Object
export function subtractObjects (param1, param2) {
  let obj1 = _cloneDeep(param1);

  Object.keys(param2).forEach((currVal) => {
    delete obj1[currVal];
  });

  return obj1;
}

// subtractPropsFromObject :: (Object, Array) -> Object
export function subtractPropsFromObject (param1, param2) {
  let obj = _cloneDeep(param1);
  let arr = _cloneDeep(param2);

  arr.filter((currVal) => {
    return typeof currVal === 'string';
  }).forEach((prop) => {
    delete obj[prop];
  });

  return obj;
}

export default R.curry(subtractly);
