import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS
} from './types';

export const employeeUpdate = ({ prop, value }) => {
    return {
      type: EMPLOYEE_UPDATE,
      payload: { prop, value }
    };
};

export const employeeCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();

  //We are going to act like we are using redux thunk to not get any errorTextStyle
  //Thats why we have the return statement and the .then function
  //then we added an action call so we used the dispatch method from Redux thunk
  //and therefore had to write the return statement anyways
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      // type: reset sunu sagliyor= employeelist e donunce, ayni stack
      //gibi davranmiyor, yani stackten cikariyor, bu sayede back button da
      //olmuyor
      .then(() => {
        dispatch({ type: EMPLOYEE_CREATE });
        Actions.employeeList({ type: 'reset' });
      });
  };
};

export const employeesFetch = () => {
const { currentUser } = firebase.auth();

  return (dispatch) => {
      //this is a coinsistent function. Once it ran it will always wait for more
      //every single time the database is change, firebase will notify this function
      //and therefore dispatch the action creator
      firebase.database().ref(`/users/${currentUser.uid}/employees`)
        .on('value', snapshot => {
          dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
          console.log(snapshot.val());
        });
  };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
        Actions.employeeList({ type: 'reset' });
      });
  };
};

export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      //we are not using a dispatch method because the employeesFetch
      //action creator runs whenever there is a change in firebase
      .then(() => {
        Actions.employeeList({ type: 'reset' });
      });
    };
};
