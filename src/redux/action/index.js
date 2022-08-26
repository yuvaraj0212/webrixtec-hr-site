export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export const PARTNER = "PARTNER";

export function login(val) {
  return {
    type: LOG_IN,
    playload: val,
  };
}

export function logout() {
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
