import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const baseToy = {
  id: null,
  data: {
    id: "",
    name: "",
    price: 0,
    stock: 0,
  },
};

export default new Vuex.Store({
  state: {
    currentToy: baseToy,
    toys: [],
    showForm: false,
    loading: false,
    edit: false,
  },
  mutations: {
    LOADING_TRUE(state) {
      state.loading = true;
    },
    LOADING_FALSE(state) {
      state.loading = false;
    },
    SET_EMPTY_TOY(state) {
      state.currentToy.id = null;
      Object.keys(baseToy.data).forEach((key) => {
        state.currentToy.data[key] = baseToy.data[key];
      });
    },
    GET_TOYS(state, data) {
      state.toys = data;
      /*       state.loading = false;
       */
    },
    SHOW_MODAL(state) {
      state.showForm = true;
    },
    HIDE_MODAL(state) {
      state.showForm = false;
    },
    UPDATE_ID(state, id) {
      state.currentToy.data.id = id;
    },
    UPDATE_NAME(state, name) {
      state.currentToy.data.name = name;
    },
    UPDATE_PRICE(state, price) {
      state.currentToy.data.price = price;
    },
    UPDATE_STOCK(state, stock) {
      state.currentToy.data.stock = stock;
    },
    /* UPDATE_EDIT(state) {
      state.edit = !state.edit;
    }, */
    SET_CURRENT_TOY(state, toy) {
      state.currentToy = toy;
    },
  },
  actions: {
    getToys({ commit }) {
      commit("LOADING_TRUE"),
        axios
          .get(
            "https://us-central1-otto-klaus-19fcf.cloudfunctions.net/toys/toys"
          )
          .then((response) => {
            console.log(response.data);
            /*  (state.currentToy.id = null),
              (state.currentToy.data.id = ""),
              (state.currentToy.data.name = ""),
              (state.currentToy.data.price = 0),
              (state.currentToy.data.stock = 0); */
            commit("GET_TOYS", response.data);
            commit("SET_EMPTY_TOY");
          })
          .finally(() => {
            commit("LOADING_FALSE");
          });
    },
    showModal({ commit }) {
      commit("SHOW_MODAL");
    },
    hideModal({ commit }) {
      commit("HIDE_MODAL");
    },
    updateId({ commit }, id) {
      commit("UPDATE_ID", id);
    },
    updateName({ commit }, name) {
      commit("UPDATE_NAME", name);
    },
    updatePrice({ commit }, price) {
      commit("UPDATE_PRICE", price);
    },
    updateStock({ commit }, stock) {
      commit("UPDATE_STOCK", stock);
    },
    addToy({ state, dispatch }) {
      const toy = state.currentToy.data;
      axios
        .post(
          "https://us-central1-otto-klaus-19fcf.cloudfunctions.net/toys/toy",
          toy,
          { headers: { "Content-type": "application/json" } }
        )
        .then(() => {
          dispatch("getToys");
        })

        .catch(function(error) {
          console.log(error);
        });
    },
    updateEdit({ commit }) {
      commit("UPDATE_EDIT");
    },
    findProduct({ commit }, id) {
      axios
        .get(
          `https://us-central1-otto-klaus-19fcf.cloudfunctions.net/toys/toy/${id}`
        )
        .then((response) => {
          commit("SET_CURRENT_TOY", response.data);
        });
    },
    updateToy({ state, dispatch }, id) {
      const toy = state.currentToy.data;
      axios
        .put(
          `https://us-central1-otto-klaus-19fcf.cloudfunctions.net/toys/toy/${id}`,
          toy
        )
        .then(() => {
          dispatch("getToys");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteToy({ dispatch }, id) {
      /* let confirm = confirm("¿Se eliminó?");
      if (confirm) { */
      axios
        .delete(
          `https://us-central1-otto-klaus-19fcf.cloudfunctions.net/toys/toy/${id}`,
          { headers: { "Content-type": "application/json" } }
        )
        .then(() => {
          dispatch("getToys");
        });
      /* } */
    },
  },
  modules: {},
});
