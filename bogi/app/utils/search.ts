import dayjs from "dayjs";
import { convertToBengaliNumber } from "./common";

export const convertDurationToBengali = (duration: string) => {
  const arr = duration.split(" ");
  let converted = "";

  arr.forEach((item) => {
    if (isNaN(item as any)) {
      if (item.includes("hour")) {
        converted += " ঘন্টা";
      }
      if (item.includes("minute")) {
        converted += " মি";
      }
      if (item.includes("day")) {
        converted += " দি";
      }
    } else {
      converted += ` ${convertToBengaliNumber(item)}`;
    }
  });

  return converted.trim();
};

export const isTicketingTimeFinished = (starts: number, ends: number) => {
  const hour = parseInt(dayjs().format("H"), 10);
  return !(hour >= starts && hour < ends);
};
