/**
 * Data transformation utilities
 */

/**
 * Convert array to object using specified key
 * @param {Array} array - Input array
 * @param {string} key - Property to use as object key
 * @returns {Object} Object with array items indexed by key
 */
export const arrayToObject = (array, key) => {
  return array.reduce((obj, item) => {
    obj[item[key]] = item;
    return obj;
  }, {});
};

/**
 * Filter object properties
 * @param {Object} obj - Input object
 * @param {Array} keys - Keys to keep
 * @returns {Object} Filtered object
 */
export const filterObject = (obj, keys) => {
  return Object.keys(obj)
    .filter(key => keys.includes(key))
    .reduce((newObj, key) => {
      newObj[key] = obj[key];
      return newObj;
    }, {});
};

/**
 * Remove null/undefined values from object
 * @param {Object} obj - Input object
 * @returns {Object} Cleaned object
 */
export const removeEmptyValues = (obj) => {
  return Object.entries(obj)
    .filter(([_, value]) => value != null)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};

/**
 * Deep clone object/array
 * @param {Object|Array} obj - Input data
 * @returns {Object|Array} Deep cloned data
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Merge two objects deeply
 * @param {Object} target - Target object
 * @param {Object} source - Source object
 * @returns {Object} Merged object
 */
export const deepMerge = (target, source) => {
  const output = { ...target };
  
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      output[key] = deepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }
  
  return output;
};

/**
 * Group array items by property
 * @param {Array} array - Input array
 * @param {string} key - Property to group by
 * @returns {Object} Grouped items
 */
export const groupBy = (array, key) => {
  return array.reduce((acc, item) => {
    const groupKey = item[key];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});
};

/**
 * Flatten nested array
 * @param {Array} array - Input array
 * @returns {Array} Flattened array
 */
export const flattenArray = (array) => {
  return array.reduce((flat, next) => {
    return flat.concat(Array.isArray(next) ? flattenArray(next) : next);
  }, []);
};