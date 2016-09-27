import R from 'ramda';

function subtractly (param1, param2) {
  return param1 - param2;
}

export default R.curry(subtractly);
