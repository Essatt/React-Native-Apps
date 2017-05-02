//this one is export rather than export default
//so that we can use import * as blabla to import
//multible components at one time
export const selectLibrary = (libraryId) => {
  return {
    type: 'select_library',
    payload: libraryId
  };
};
