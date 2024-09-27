/**
 * Applies a mapping function to each element of an array and flattens the result into a new array.
 *
 * @param {Array} array The input array.
 * @param {function} callback The mapping function to apply to each element.
 * @returns {Array} The new array with the mapped and flattened elements.
 */
export default function flatMap(array, callback) {
  return array.reduce((acc, value, index, arr) => {
    const mappedValues = callback(value, index, arr);
    return [...acc, ...mappedValues];
  }, []);
}
