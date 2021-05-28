import axios from "axios";

const ins = axios.create();

ins.interceptors.response.use(response => {
  if (response.status === 200) {
    return response.data;
  }
  return response;
});

export default ins;
