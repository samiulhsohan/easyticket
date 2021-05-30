import { ICabin } from "../store/search";

export enum ECabinTypes {
  SHOVAN = "শোভন",
  SNIGDHA = "স্নিগ্ধা",
  S_CHAIR = "শোভন চেয়ার",
}

export interface IStation {
  stn_code: string;
  stn_name: string;
  stn_name_bengali: string | null;
  cabins?: string[];
}

export interface ITrainCabinDetails {
  cabin: ICabin;
  fare: string;
  available_seats: {
    online: string;
    counter: string;
    total_available_seats: string;
    counter_only: string;
  };
}

export interface ITrain {
  id: string;
  trn_no: string;
  trn_name: string;
  trn_name_bengali: string;
  dpt_time: string;
  off_day: string;
  prmnt_off_day: string;
  show_btn: string;
  show_selection: string;
  cabin_details: ITrainCabinDetails[];
  stn_from: string;
  stn_from_bengali: string;
  stn_to: string;
  stn_to_bengali: string;
  fareWithoutFormat: string;
  jDate: string;
  duration: string;
  arrivalDate: string;
  isTrainLeft: string;
  routes: ITrainRoutes[];
}

export interface ITrainRoutes {
  sn: string;
  int_stn: string;
  int_stn_bengali: string;
  dpt_time: string | null;
  arr_time: string | null;
}
