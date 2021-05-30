import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { createSelector } from "reselect";
import { ITrain } from "../@types/search";
import { convertToBnDate } from "../utils/common";
import { RootState } from "./configureStore";

interface ILocation {
  stn_name: string;
  stn_code: string;
  stn_name_bengali: string;
}

export interface ICabin {
  key: string;
  name: string;
}

export interface ISearchQuery {
  from: ILocation;
  to: ILocation;
  date: {
    date: string;
    bn: string;
  };
  passengers: {
    adults: number;
    child: number;
  };
  availableCabins: ICabin[];
}

interface ISearch {
  query: ISearchQuery;
  result: ITrain[];
}

const initialState: ISearch = {
  query: {
    from: { stn_code: "", stn_name: "", stn_name_bengali: "" },
    to: { stn_code: "", stn_name: "", stn_name_bengali: "" },
    date: {
      date: dayjs().format("YYYY-MM-DD"),
      bn: convertToBnDate(dayjs()),
    },
    availableCabins: [],
    passengers: {
      adults: 1,
      child: 0,
    },
  },
  result: [],
};

const slice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchQueryUpdated: (
      search: ISearch,
      action: PayloadAction<ISearchQuery>
    ) => {
      search.query = action.payload;
    },
    searchResultUpdated: (search: ISearch, action: PayloadAction<ITrain[]>) => {
      search.result = action.payload;
    },
  },
});

export const { searchQueryUpdated, searchResultUpdated } = slice.actions;
export default slice.reducer;

export const updateSearchQuery = (query: ISearchQuery) =>
  searchQueryUpdated(query);

export const updateSearchResult = (result: ITrain[]) =>
  searchResultUpdated(result);

// Selector
export const getSearchQuery = createSelector(
  (state: RootState) => state.entities.search.query,
  (query) => query
);

export const getSearchResult = createSelector(
  (state: RootState) => state.entities.search.result,
  (result) => result
);
