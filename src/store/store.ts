import { combineReducers, configureStore } from "@reduxjs/toolkit";
import SleepReducer from "./SleepSlice";

const store = configureStore({
  reducer: {
      sleep: SleepReducer
  }
});

export default store; 