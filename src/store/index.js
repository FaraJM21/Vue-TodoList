import Vuex from "vuex";

import todolist from "./store-task";
export default function () {
  const Store = new Vuex.Store({
    modules: {
      todolist,
    },

    strict: process.env.DEV,
  });

  return Store;
}
