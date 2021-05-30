import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { RootState } from "./configureStore";

interface IStaticData {
  trainNames: Record<string, string>;
  stationNames: Record<string, string>;
  cabinNames: Record<string, string>;
}

const initialState: IStaticData = {
  trainNames: {},
  stationNames: {},
  cabinNames: {},
};

const slice = createSlice({
  name: "staticData",
  initialState,
  reducers: {
    trainNamesUpdated: (
      staticData: IStaticData,
      action: PayloadAction<Record<string, string>>
    ) => {
      staticData.trainNames = action.payload;
    },
    stationNamesUpdated: (
      staticData: IStaticData,
      action: PayloadAction<Record<string, string>>
    ) => {
      staticData.stationNames = action.payload;
    },
    cabinNamesUpdated: (
      staticData: IStaticData,
      action: PayloadAction<Record<string, string>>
    ) => {
      staticData.cabinNames = action.payload;
    },
  },
});

export const { trainNamesUpdated, stationNamesUpdated, cabinNamesUpdated } =
  slice.actions;
export default slice.reducer;

export const updateTrainNames = (trainNames: Record<string, string>) =>
  trainNamesUpdated(trainNames);

export const updateStationNames = (stations: Record<string, string>) =>
  stationNamesUpdated(stations);

export const updateCabinNames = (cabinNames: Record<string, string>) =>
  cabinNamesUpdated(cabinNames);

// Selector
export const getTrainNames = createSelector(
  (state: RootState) => state.entities.staticData,
  (staticData) => staticData.trainNames
);

export const getStationNames = createSelector(
  (state: RootState) => state.entities.staticData,
  (staticData) => staticData.stationNames
);

export const getCabinNames = createSelector(
  (state: RootState) => state.entities.staticData,
  (staticData) => staticData.cabinNames
);
