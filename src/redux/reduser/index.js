import { LOG_IN, LOG_OUT, PARTNER } from "../action";

const initialState = {
  auth: localStorage.getItem("auth"),
  company: { name: "", role: "" },
};

const authReduser = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        auth: localStorage.setItem("auth", true),
      };

    case LOG_OUT:
      return {
        ...state,
        auth: localStorage.setItem("auth", false),
        company: { name: "", role: "" },
      };

    case PARTNER:
      return {
        ...state,
        company: { name: action.playload.name, role: action.playload.role },
      };

    default:
      return state;
  }
};

export default authReduser;
