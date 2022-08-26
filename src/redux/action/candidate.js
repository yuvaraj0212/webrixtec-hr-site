// import { notification } from "antd";
// import axios from "../../app/axios";

export const Add_CANDIDATE = "Add_CANDIDATE";
export const GET_ALL_CANDIDATE = "GET_ALL_CANDIDATE";
export const GET_ALL_PARTNER_CANDIDATE = "GET_ALL_PARTNER_CANDIDATE";
export const GET_ALL_PARTNER = "GET_ALL_PARTNER";
export const addCandidate = (data) => {
  return {
    type: Add_CANDIDATE,
    playload: data,
  };
};

export const getAllCandidate = (data) => {
  return {
    type: GET_ALL_CANDIDATE,
    playload: data,
  };
};
export const getAllPratnerCandidate = (data) => {
  return {
    type: GET_ALL_PARTNER_CANDIDATE,
    playload: data,
  };
};
export const getAllPratner = (data) => {
  return {
    type: GET_ALL_PARTNER,
    playload: data,
  };
};
