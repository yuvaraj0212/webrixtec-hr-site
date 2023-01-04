export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const PARTNET_TO_ADMIN = "PARTNET_TO_ADMIN";
export const PARTNER = "PARTNER";

export function login(val) {
  return {
    type: LOG_IN,
    playload: val,
  };
}

export function logout() {
  sessionStorage.clear();
  return {
    type: LOG_OUT,
    desc: "logout",
  };
}

export const partnerDetails = (val) => {
  return {
    type: PARTNER,
    playload: val,
  };
};

export const partnerToAdmin = () => {
  return {
    type: PARTNET_TO_ADMIN,
  };
};
