import { legacy_createStore as createStore } from "redux";

import authReduser from "../reduser";

// const createStore = createStore();

const store = createStore(authReduser);

export default store;
