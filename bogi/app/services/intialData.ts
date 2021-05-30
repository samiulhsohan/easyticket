import {
  getConfig,
  getTrainNames,
  getLocations,
  getCabins,
  getTermsMessage,
} from "./dataService";

export const getInitialData = async () => {
  try {
    const configRes = await getConfig();
    const trainNamesRes = await getTrainNames();
    const locationsRes = await getLocations();
    const cabinsRes = await getCabins();
    const termsMessageRes = await getTermsMessage();

    return {
      config: configRes.data,
      trainNames: trainNamesRes.data,
      stationNames: locationsRes.data,
      cabinNames: cabinsRes.data,
      termsMessage: termsMessageRes.data,
    };
  } catch (err) {
    throw new Error(err);
  }
};
