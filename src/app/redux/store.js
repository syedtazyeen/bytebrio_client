import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';
import latestLogsSlice from './logs/latestLogsSlice';
import latestByteSlice from "./bytes/latestByteSlice";
import byteSlice from "./bytes/byteSlice";
import searchLogsSlice from "./logs/searchLogsSlice";
import searchByteSlice from "./bytes/searchByteSlice";
// import searchByteSlice from "./bytes/searchByteSlice";
// import searchPeopleSlice from "./people/searchPeopleSlice";
// import currentUserDataSlice from './people/userSlice'

//load state from local storage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    const loadedState = JSON.parse(serializedState);
    return {
      auth: loadedState.auth,
      latestLogs: loadedState.latestLogs,
      //currentUserData: loadedState.currentUserDataSlice
    };
  } catch (err) {
    return undefined;
  }
};


//add loaded from local storage
const persistedState = loadStateFromLocalStorage();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    latestLogs: latestLogsSlice,
    latestBytes: latestByteSlice,
    byteSlice:byteSlice,
    searchLogs: searchLogsSlice,
    searchBytes:searchByteSlice
    //searchPeople: searchPeopleSlice,
    //currentUserData: currentUserDataSlice
    // Add reducers
  },

  //initial state from local storage
  preloadedState: persistedState,

});

// save state to local storage
store.subscribe(() => {
  try {
    const state = store.getState();
    const dataToSave = {
      auth: state.auth,
      latestLogs: state.latestLogs,
      //currentUserData: state.currentUserData
    };
    const serializedState = JSON.stringify(dataToSave);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    // Handle errors
  }
});

