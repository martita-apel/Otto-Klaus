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
      state.showForm = !state.showForm;
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
    addToy() {
      const prod = {
        id: this.id,
        name: this.name,
        price: this.price,
        stock: this.stock,
      };
      axios
        .post(
          "https://us-central1-otto-klaus-19fcf.cloudfunctions.net/toys/toys",
          prod,
          { headers: { "Content-type": "application/json" } }
        )
        .then(() => {
          this.getToys();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteToy({ commit, dispatch }, id) {
      /* let confirm = confirm("¿Se eliminó?");
      if (confirm) { */
      axios
        .delete(
          `https://us-central1-otto-klaus-19fcf.cloudfunctions.net/toys/toy/${id}`,
          { headers: { "Content-type": "application/json" } }
        )
        .then(() => {
          alert("Producto eliminado.");
          dispatch("getToys");
        });
      /* } */
    },
  },
  modules: {},
});
