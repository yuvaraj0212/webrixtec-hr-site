import { LOG_IN, LOG_OUT, PARTNER } from "../action";

var initialState = {
  authenticated: false,
  rolename: "",
  adminToPartner: false,
  inPartnerData: {},
};

const authReduser = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      console.log(action);
      return {
        ...action.playload,
        authenticated: true,
        adminToPartner: false,
        inPartnerData: {},
        rolename: action.playload.roles[0].rolename,
      };

    case LOG_OUT:
      console.log("logOut", action);
      return {};

    case PARTNER:
      return {
        ...state,
        adminToPartner: true,
        inPartnerData: action.playload,
      };

    default:
      return state;
  }
};

export default authReduser;
