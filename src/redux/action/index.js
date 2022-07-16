export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

// Pratner Details

export const PARTNER = "PARTNER";

export function login() {
  return {
    type: LOG_IN,
    desc: "login",
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
