/**
 * errorToObject converts errors to objects so that
 * they can be correctly saved in the redux store.
 * @param {Error} error
 */
export default function errorToObject(error) {
  const keys = Object.getOwnPropertyNames(error);

  const errorObject = {};
  keys.forEach(k => {
    errorObject[k] = error[k];
  });

  return errorObject;
}
