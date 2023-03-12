import axios from "axios";
const BASE_URL = "http://94.158.54.194:9092/api/product";
import { date } from "quasar";
const state = {
  todolist: [],
};
const mutations = {
  SET_USERS_TO_STATE(state, todolist) {
    state.todolist = todolist.map((el) => {
      el.created_date = date.formatDate(el.created_date, "D/MM/YYYY");
      return el;
    });
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
    } catch (error) {
      console.log(error);
    }
  },
  async DELETE_TODOITEM({ commit }, payload) {
    await axios.delete(BASE_URL + `/${payload}`);
    commit("DELETE_TODOITEM", payload);
  },

  async ADD_NEW_TODOITEM({ commit }, payload) {
    const res = await axios.post(BASE_URL, {
      product_type_id: 0,
      name_uz: payload.name_uz,
      cost: payload.cost,
      address: payload.address,
      created_date: payload.created_date,
    });

    try {
      if (res.data) {
        await axios
          .get(BASE_URL)
          .then((res) => commit("SET_USERS_TO_STATE", res.data));
      }
    } catch (error) {
      console.log(error);
    }
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
