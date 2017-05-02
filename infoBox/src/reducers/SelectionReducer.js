//that line on state means:
//if state is undefined, make it null
export default (state = null, action) => {
  //boiler-plate code
  switch (action.type) {
    case 'select_library':
      return action.payload;
    default:
      return state;
  }
};
