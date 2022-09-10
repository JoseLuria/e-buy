import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "@/interfaces";
import { Address } from "@prisma/client";

export interface AuthStateInterface {
  isLoggedIn: boolean;
  user?: AuthUser;
  address?: Address;
}

const initialState: AuthStateInterface = {
  isLoggedIn: false,
  user: undefined,
  address: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: AuthStateInterface, action: PayloadAction<AuthUser>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state: AuthStateInterface) => {
      state.isLoggedIn = false;
      state.user = undefined;
      state.address = undefined;
    },
    setAddress: (state: AuthStateInterface, action: PayloadAction<Address>) => {
      state.address = action.payload;
    },
  },
});

export const { login, logout, setAddress } = authSlice.actions;

export default authSlice.reducer;
