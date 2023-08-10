import { createSlice } from "@reduxjs/toolkit";
import UserInitialState from "./user/userInitialState";
import { ReducerPayload } from "store/type/ReducerPayload";

export interface UserStorePayload {
  email: string;
  name?: string;
  image?: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState: UserInitialState,
  reducers: {
    storeUser(state, { payload }: ReducerPayload<UserStorePayload>) {
      const lastSyncTime = Date.now().toFixed();
      state.currentUser = { ...payload, lastSyncTime };
    },
    resetUser(state) {
      state.currentUser = undefined;
    },
  },
});

export const { storeUser, resetUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
