import { legacy_createStore as createStore, combineReducers } from "redux";

import authReduser from "../reduser";
import CandidateReduser from "../reduser/candidateReduser";

// const createStore = createStore();
const rootreducers = combineReducers({
  auth: authReduser,
  candidate: CandidateReduser,
});
const store = createStore(rootreducers);

export default store;
