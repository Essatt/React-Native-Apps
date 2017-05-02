import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEE_SAVE_SUCCESS
 } from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE:
      // action.payload === { prop: 'name', value: 'jane' }
      // The brackets around action.payload.prop means that the value
      //will be determined in runtime (name/phone/shift). Its called
      //key interpolation. name becomes the "key". Thats why there is the ":"
      //after it. prop is the key, the payload.value is the value.
      return { ...state, [action.payload.prop]: action.payload.value };
      //when we create an employee, we want to clean the form
    case EMPLOYEE_CREATE:
      return INITIAL_STATE;
    case EMPLOYEE_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
