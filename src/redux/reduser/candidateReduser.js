// import axios from "../../app/axios";
import {
  Add_CANDIDATE,
  GET_ALL_CANDIDATE,
  GET_ALL_PARTNER_CANDIDATE,
  GET_ALL_PARTNER,
} from "../action/candidate";

const initialState = {
  candidateList: [],
  candidateStatus: false,
  candidateCount: 0,
  processingCount: 0,
  offerCount: 0,
  rejectedCount: 0,
  duplicationCount: 0,
  partnerList: [],
};

const candidateReduser = (state = initialState, action) => {
  switch (action.type) {
    case Add_CANDIDATE:
      return {
        ...state,
        candidateList: action.playload,
        candidateStatus: true,
        candidateCount: action.playload.length,
      };
    case GET_ALL_PARTNER:
      return { ...state, partnerList: action.playload, candidateStatus: true };
    case GET_ALL_CANDIDATE:
      let processing = action.playload.filter(
        (res) => res.candidateStatus === "processing"
      );
      let offer = action.playload.filter(
        (res) => res.candidateStatus === "offergot"
      );
      let duplication = action.playload.filter(
        (res) => res.candidateStatus === "duplication"
      );
      let rejected = action.playload.filter(
        (res) => res.candidateStatus === "rejected"
      );
      return {
        ...state,
        candidateList: action.playload,
        candidateStatus: true,
        candidateCount: action.playload.length,
        processingCount: processing.length,
        duplicationCount: duplication.length,
        offerCount: offer.length,
        rejectedCount: rejected.length,
      };
    case GET_ALL_PARTNER_CANDIDATE:
      let partnerprocessing = action.playload.filter(
        (res) => res.candidateStatus === "processing"
      );
      let partneroffer = action.playload.filter(
        (res) => res.candidateStatus === "offergot"
      );
      let partnerduplication = action.playload.filter(
        (res) => res.candidateStatus === "duplication"
      );
      let partnerrejected = action.playload.filter(
        (res) => res.candidateStatus === "rejected"
      );
      return {
        ...state,
        candidateList: action.playload,
        candidateStatus: true,
        candidateCount: action.playload.length,
        processingCount: partnerprocessing.length,
        duplicationCount: partnerduplication.length,
        offerCount: partneroffer.length,
        rejectedCount: partnerrejected.length,
      };
    default:
      return { ...state };
  }
};

export default candidateReduser;
