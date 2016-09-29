import assert from 'assert';
import subtractly, {subtractNumbers, subtractStrings, subtractArrays, subtractObjects, subtractPropsFromObject} from '../src/subtraction';

describe('Subtractly :: a -> b -> a', () => {
  it('Correctly throw error when both params are not of same type or (param1 == {}, param2 == []', () => {
    assert.equal(Error.prototype.toString(subtractly(1, 'foo')), 'Error');
  });

  it('Correctly subtracts numbers', () => {
    assert.equal(subtractNumbers(22, 10), 12);
  });

  it('Correctly subtracts or splices strings or splices', () => {
    assert.equal(subtractStrings('hello world', 'world'), 'hello');
  });
});

describe('subtractNumbers()', () => {
  it('Num - Num :: Correctly compute 10 - 5 = 5', () => {
    assert.equal(subtractNumbers(10, 5), 5);
  });
});

describe('subtractStrings()', () => {
  it('Str - Str :: Correctly compute "mississippi" - "i" = "msssspp"', () => {
    assert.equal(subtractStrings('mississippi', 'i'), 'msssspp');
  });
});

describe('subtractArrays()', () => {
  it('[] - [] :: Correctly compute [1,2,3,4,5] - [2,3] = [1,4,5]', () => {
    assert.deepEqual(subtractArrays([1, 2, 3, 4, 5], [2, 3]), [1, 4, 5]);
  });
});

describe('subtractObjects()', () => {
  it('{} - {} :: Correctly compute the difference of {foo: 123, bar: 456, baz: 789} - {bar: 456, baz: 789} = {foo: 123}', () => {
    assert.deepEqual(subtractObjects({foo: 123, bar: 456, baz: 789}, {bar: 456, baz: 789}), {foo: 123});
  });
});

describe('subtractPropsFromObject()', () => {
  it('{} - [] :: {foo: 123, bar: 456, baz: 789} - ["bar", "baz"]', () => {
    assert.deepEqual(subtractPropsFromObject({foo: 123, bar: 456, baz: 789}, ['bar', 'baz']), {foo: 123});
  });
});
