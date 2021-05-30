import { Middleware } from "redux";

const logger: Middleware = (_store) => (next) => (action) => {
  if (__DEV__) {
    console.log("action", action);
  }
  next(action);
};

export default logger;
