import dot from "dot-object";

const predefinedFunctions = {};

predefinedFunctions.simpleValueConverter = (value, arg) => {
  const mapped = arg[value];
  return !!mapped ? mapped : "";
};

const getKeyValueTransform = (json, trasforms) => {
  const result = {};
  for (const [k, v] of Object.entries(trasforms))
    result[v.newKey] = predefinedFunctions[v.fnc](json[k], v.argument);
  return result;
};

const eachPostTransform = (array, transformsArray) => {
  for (const {fnc, argument} of transforms) {
    array = predefinedFunctions[fnc](array, argument)
  }
}

const jsonTransformElement = (
  json,
  { keyTransform, defaults, keyValueTransform }
) => {
  let result = {};
  for (const k of Object.keys(keyTransform)) {
    if (Array.isArray(keyTransform[k])) {
      if (keyTransform[k].length <= 0) delete keyTransform[k];
      else {
        for (const e of keyTransform[k])
          result = { ...result, ...dot.object({ [e]: dot.pick(k, json) }) };
        delete keyTransform[k];
      }
    }
  }
  if (!!keyTransform) result = dot.transform(keyTransform, json, result);

  return {
    ...result,
    ...defaults,
    ...getKeyValueTransform(json, keyValueTransform),
  };
};

export const jsonTransform = (
  json,
  map
) => Array.isArray(json) ? eachPostTransform(json.map(elem => jsonTransformElement(elem, map))) : jsonTransformElement(json, map);

/**
 *

{
  "name": "string",
  "synonyms": [
    "string"
  ],
  "identifiers": [
    {
      "code": "string",
      "description": "string"
    }
  ],
  "active": true,
  "populationDensity": 0,
  "parentLocationId": "string",
  "geoLocation": {
    "lat": 0,
    "lng": 0
  },
  "geographicalLevelId": "string",
  "id": "string",
  "createdAt": "2022-04-30T08:29:03.319Z",
  "createdBy": "string",
  "updatedAt": "2022-04-30T08:29:03.319Z",
  "updatedBy": "string",
  "createdOn": "string",
  "deleted": false,
  "deletedAt": "2022-04-30T08:29:03.319Z"
}

 */
