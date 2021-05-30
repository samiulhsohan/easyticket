import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { RootState } from "./configureStore";

interface IAppConfig {
  version: {
    minimum: string;
    current: string;
  };
  appLink: string;
}

interface IBRConfig {
  ticketingTime: {
    starts: number;
    ends: number;
  };
  maxSeats: number;
  advanceTicketDays: number;
  apiRequestInterval: number;
}

export interface IConfig {
  app: IAppConfig;
  br: IBRConfig;
}

export const initialState: IConfig = {
  app: {
    version: {
      current: "",
      minimum: "",
    },
    appLink: "",
  },
  br: {
    ticketingTime: {
      starts: 0,
      ends: 0,
    },
    maxSeats: 0,
    advanceTicketDays: 0,
    apiRequestInterval: 0,
  },
};

const slice = createSlice({
  name: "config",

  initialState,

  reducers: {
    brConfigUpdated: (config: IConfig, action: PayloadAction<IBRConfig>) => {
      config.br = action.payload;
    },
    appConfigUpdated: (config: IConfig, action: PayloadAction<IAppConfig>) => {
      config.app = action.payload;
    },
  },
});

export const { brConfigUpdated, appConfigUpdated } = slice.actions;
export default slice.reducer;

export const updateBRConfig = (config: IBRConfig) => brConfigUpdated(config);

export const updateAppConfig = (config: IAppConfig) => appConfigUpdated(config);

// Selector
export const getBRConfig = createSelector(
  (state: RootState) => state.entities.config.br,
  (br) => br
);

export const getAppConfig = createSelector(
  (state: RootState) => state.entities.config.app,
  (app) => app
);

export const getConfig = createSelector(
  (state: RootState) => state.entities.config,
  (config) => config
);
