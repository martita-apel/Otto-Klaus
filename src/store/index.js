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
    /* LOADING_PRODUCTS(state) {
      state.loading = !state.loading;
    }, */
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
    UPDATE_EDIT(state) {
      state.edit = !state.edit;
    },
  },
  actions: {
    getToys({ commit }) {
      axios
        .get(
          "https://us-central1-otto-klaus-19fcf.cloudfunctions.net/toys/toys"
        )
        .then((response) => {
          console.log(response.data);
          commit("GET_TOYS", response.data);
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
          {
            headers: {
              "Content-type": "application/json",
            },
          }
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
    findProduct({ state }, id) {
      axios
        .get(
          `https://us-central1-tddg3-e867b.cloudfunctions.net/products/product/${id}`,
          { headers: { "Content-type": "application/json" } }
        )
        .then((response) => {
          state.currentToy.data.id = response.data.id;
          state.currentToy.data.name = response.data.name;
          state.currentToy.data.price = response.data.price;
          state.currentToy.data.stock = response.data.stock;
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
