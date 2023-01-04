import Axios from "axios";
var token = JSON.parse(sessionStorage.getItem("token"));
console.log(token);
const instance = Axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
export const getAllCandidateMethode = (props) => {
  instance.get("admin/get-candidates").then((res) => {
    console.log(res);
    props(res.data.result);
  });
};

export const getAllPratnerCandidateMethode = (props, name) => {
  instance.get("admin/get-candidates").then((res) => {
    console.log(res);
    props(res.data.result.filter((data) => data.user.name === name));
  });
};
