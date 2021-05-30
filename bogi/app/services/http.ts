import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.esheba.cnsbd.com/v1",
  timeout: 10000, // 10 sec
});

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};
