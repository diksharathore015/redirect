import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface HomepageState {
  homepageTitle: any | null;
  location: any | null;
  seoData: any | null;
  courseLocation: any | null;
  showform: any | null;
}
const initialState: HomepageState = {
  homepageTitle: "",
  location: "",
  seoData: "",
  courseLocation: "",
  showform: false,
};

const HomepageSlice = createSlice({
  name: "homepage",

  initialState,
  reducers: {
    setHomepageTitle: (state, action: PayloadAction<any>) => {
      state.homepageTitle = action.payload;
    },
    setLocation: (state, action: PayloadAction<any>) => {
      state.location = action.payload;
    },
    setCourseLocation: (state, action: PayloadAction<any>) => {
      state.location = action.payload;
    },
    setSeoData: (state, action: PayloadAction<any>) => {
      state.seoData = action.payload;
    },
    setShowForm: (state, action: PayloadAction<any>) => {
      state.showform = action.payload;
    },
  },
});
export const {
  setLocation,
  setHomepageTitle,
  setSeoData,
  setCourseLocation,
  setShowForm,
} = HomepageSlice.actions;
export default HomepageSlice.reducer;
