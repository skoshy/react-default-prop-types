import { ErrorList } from '../errors';

export function generateProps(propList) {
  let propTypesToReturn = {};
  let defaultPropsToReturn = {};
  const errors = [];

  // ensure propList is an object
  if (!isObject(propList)) {
    errors.push(ErrorList.notAnObject);
  }

  if (errors.length === 0) {
    // loop through and get all properties
    ({ propTypesToReturn, defaultPropsToReturn } = iterateObject(propList));
  }

  return { propTypesToReturn, defaultPropsToReturn, errors };
}

function iterateObject(obj) {
  const toReturn = {
    propTypesToReturn: {},
    defaultPropsToReturn: {},
  };

  const keys = Object.keys(obj);

  keys.forEach((key) => {
    const currentVal = obj[key];
    let currentValPropType;
    let currentValDefaultProp;

    if (isObject(currentVal)) {
      const iteratedData = iterateObject(currentVal);
      currentValPropType = iteratedData.propTypesToReturn;
      currentValDefaultProp = iteratedData.defaultPropsToReturn;
    } else if (isArray(currentVal)) {
      if (typeof currentVal[0] !== `undefined`) {
        // default prop
        currentValDefaultProp = currentVal[0];
      }
      if (typeof currentVal[1] !== `undefined`) {
        // propType
        currentValPropType = currentVal[1];
      }
    }

    if (typeof currentValPropType !== `undefined`) {
      toReturn.propTypesToReturn[key] = currentValPropType;
    }
    if (typeof currentValDefaultProp !== `undefined`) {
      toReturn.defaultPropsToReturn[key] = currentValDefaultProp;
    }
  });

  return toReturn;
}

function isArray(toCheck) {
  return Array.isArray(toCheck);
}

function isObject(toCheck) {
  if (
    typeof toCheck === `object`
    && !isArray(toCheck)
  ) {
    return true;
  }

  return false;
}

export default null;
