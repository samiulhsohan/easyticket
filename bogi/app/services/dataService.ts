import { engineBaseUrl } from "../constants";
import http from "./http";

export const getTrainNames = () =>
  http.get(`${engineBaseUrl}/static-data/train-names`);

export const getConfig = () => http.get(`${engineBaseUrl}/config`);

export const getLocations = () =>
  http.get(`${engineBaseUrl}/static-data/locations`);

export const getCabins = () => http.get(`${engineBaseUrl}/static-data/cabins`);

export const getTermsMessage = () =>
  http.get(`${engineBaseUrl}/static-data/terms-message`);
