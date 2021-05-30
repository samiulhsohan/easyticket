import { Dayjs } from "dayjs";
require("dayjs/locale/bn");

var numbers = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

type NumbersT = keyof typeof numbers;

export const convertToBengaliNumber = (number: string) => {
  if (number === "0") {
    return "০";
  }

  let converted: string = "";
  const numberArr = number.split("");

  numberArr.forEach((item) => {
    converted += numbers[item as NumbersT];
  });

  return converted;
};

export const convertTimeToBengali = (time: string) => {
  let when = "রাত";
  const hour = parseInt(time.substr(0, 2), 10);
  const minute = time.substr(3, 2);
  const hour12Format = +hour % 12 || 12;

  if (hour >= 5 && hour <= 11) {
    when = "সকাল";
  }
  if (hour > 11 && hour <= 16) {
    when = "দুপুর";
  }
  if (hour > 16 && hour <= 18) {
    when = "বিকাল";
  }
  if (hour > 18 && hour <= 19) {
    when = "সন্ধ্যা";
  }

  return `${when} ${convertToBengaliNumber(
    hour12Format.toString()
  )}:${convertToBengaliNumber(minute)}`;
};

export const convertToBnDate = (date: Dayjs) => {
  return `${convertToBengaliNumber(date.format("D"))} ${date
    .locale("bn")
    .format("MMMM, dddd")}`;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
