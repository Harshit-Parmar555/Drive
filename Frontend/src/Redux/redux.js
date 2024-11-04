import { configureStore, createSlice } from "@reduxjs/toolkit";
import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"




const authslice = createSlice({
  name: "auth",
  initialState: {
    islogin: false,
  },
  reducers: {
    login(state) {
      state.islogin = true;
    },
    logout(state) {
      state.islogin = false;
    },
  },
});


const persistconfig = {
    key : "persist key",
    storage
}

const persistedreducer =  persistReducer(persistconfig,authslice.reducer);

export const authactions = authslice.actions;

export const store = configureStore({
  reducer: persistedreducer,
});

const persistor = persistStore(store);

export {persistor}
