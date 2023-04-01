import axios from "axios";
const api = axios.create({
  baseURL: "http://127.0.0.1:8080/task",
});
export const readAll = async () => {
  var config = {
    method: "get",
    url: "localhost:8080/task/readAll",
    headers: {},
  };

  try {
    const res = await api.get("/readAll");
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const create = async (data) => {
  var config = {
    method: "post",
    url: "localhost:8080/task/readAll",
    headers: {},
  };

  try {
    const res = await api.post("/create", data);
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const toggleComplete = async (id) => {
  try {
    const res = await api.post(`/toggleComplete/${id}`);
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const updateById = async (id, data) => {
  try {
    const res = await api.patch(`/updateById/${id}`, data);
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
