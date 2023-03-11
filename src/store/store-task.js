import axios from "axios";
const BASE_URL = "http://94.158.54.194:9092/api/product";
const state = {
  todolist: [],
};
const mutations = {
  SET_USERS_TO_STATE(state, todolist) {
    state.todolist = todolist;
  },
  DELETE_TODOITEM(state, payload) {
    state.todolist = state.todolist.filter((el) => el.id !== payload);
  },
};
const actions = {
  async GET_USERS_FROM_API({ commit }) {
    const res = await axios.get(BASE_URL);

    try {
      commit("SET_USERS_TO_STATE", res.data);
      return todolist;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async DELETE_TODOITEM({ commit }, payload) {
    await axios.delete(BASE_URL + `/${payload}`);
    commit("DELETE_TODOITEM", payload);
  },
  ADD_NEW_TODOITEM({ commit }, payload) {
    console.log("commit", payload);
  },
};
const getters = {
  TODOLIST(state) {
    return state.todolist;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
