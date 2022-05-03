export const LocationsMap = {
  // src -> dst
  keyTransform: {
    name: "name",
    displayFormName: ["identifiers.0.description", "synonyms.0"],
    code: "identifiers.0.code",
    "parent.id": "parentLocationId",
    "geometry.coordinates.0": "geoLocation.lat",
    "geometry.coordinates.1": "geoLocation.lon",
    id: "id",
    openingDate: "createdAt",
    lastUpdated: "updatedAt",
    created: "createdOn",
  },
  keyValueTransform: {
    level: {
      fnc: "simpleValueConverter",
      argument: {
        1: "LNG_REFERENCE_DATA_CATEGORY_LOCATION_GEOGRAPHICAL_LEVEL_ADMIN_LEVEL_0",
        2: "LNG_REFERENCE_DATA_CATEGORY_LOCATION_GEOGRAPHICAL_LEVEL_ADMIN_LEVEL_1",
        3: "LNG_REFERENCE_DATA_CATEGORY_LOCATION_GEOGRAPHICAL_LEVEL_ADMIN_LEVEL_2",
        4: "LNG_REFERENCE_DATA_CATEGORY_LOCATION_GEOGRAPHICAL_LEVEL_ADMIN_LEVEL_3",
        5: "LNG_REFERENCE_DATA_CATEGORY_LOCATION_GEOGRAPHICAL_LEVEL_ADMIN_LEVEL_4",
      },
      newKey: "geographicalLevelId",
    },
  },
  defaults: {
    active: "true",
    populationDensity: "0",
    createdBy: "system",
    updatedBy: "system",
    deleted: "false",
    deletedAt: "",
  },
  each: [
    {
      fnc: "hierarchy",
      argument: ["children", "id", "parentLocationId"]
    }
  ]
};
/**
 * New functionality
 * Given the case where: [{ref: 1, cont: 222}, {ref:2, parent: 1, cont: 333}]
 * We want to get: [
 *  {
 *    ref: 1,
 *    cont: 222,
 *    children: [
 *      ref: 2,
 *      parent: 1,
 *      cont: 333
 *    ]
 *  }
 * ]
 * 
 * For each element, if it contains the parent attr, appends to the 'children' attr of the parent
 */