import { createSlice } from "@reduxjs/toolkit";

interface SettingsState {
  mode: string;
}

const initialState: SettingsState = {
  mode: "light",
};

const SettingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export const SettingsReducer = SettingsSlice.reducer;
