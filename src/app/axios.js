// import axios from "axios";

// axios.create({
//   baseURL: "localhost:8000",
// });

// // export default instance;

import axios from "axios";

// const baseUrl = "http://localhost:8080";
const baseUrl = "http://13.233.109.181:8080/hr";

export const addResume = async (bodyFormData) => {
  return axios.post(`${baseUrl}/api-resume/add-resume`, bodyFormData);
};

export const getResume = async () => {
  return axios.get(`${baseUrl}/api-resume/get-resume-all`);
};

export const deleteResumeDetails = async (id) => {
  return axios.get(`${baseUrl}/api-resume/delete-resume`, {
    params: { id: id },
  });
};
