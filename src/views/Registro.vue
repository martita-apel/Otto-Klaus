<template>
  <v-layout column justify-center align-center class="layout">
    <h2 class="titulo pt-10">Juguetes disponibles</h2>
    <v-simple-table class="my-5">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="font-weight-black header">Código</th>
            <th class="font-weight-black header">Producto</th>
            <th class="font-weight-black header">Precio</th>
            <th class="font-weight-black header">Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="toy in toys" :key="toy.id">
            <td>{{ toy.data.id }}</td>
            <td>{{ toy.data.name }}</td>
            <td>{{ toy.data.price }}</td>
            <td>{{ toy.data.stock }}</td>
            <td>
              <v-btn small outlined color="green darken-1" @click="editar(toy.id)">
                <span class="icon is-small">
                  <i class="fas fa-check"></i>
                </span>
                <span>Editar</span>
              </v-btn>
            </td>
            <td>
              <v-btn small outlined color="red darken-1" @click="borrarToy(toy.id)">
                <span class="icon is-small">
                  <i class="fas fa-times"></i>
                </span>
                <span>Borrar</span>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-main class="modal">
      <Modal />
    </v-main>
  </v-layout>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import Modal from "../components/Modal.vue";

export default {
  name: "Registro",
  components: {
    Modal
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["toys", "edit"])
  },
  methods: {
    ...mapActions(["getToys", "deleteToy"]),
    borrarToy(id) {
      this.deleteToy(id);
    }
    /* addNewProduct() {
      const prod = {
        name: this.name,
        price: this.price,
        stock: this.stock
      };
      axios
        .post(
          "https://us-central1-otto-klaus-19fcf.cloudfunctions.net/toys/toys",
          prod,
          { headers: { "Content-type": "application/json" } }
        )
        .then(() => {
          this.$store.dispatch("getProducts");
        })
        .catch(function(error) {
          console.log(error);
        });
    }, */
    /*editar(id) {
      this.updateEdit();
      this.findProduct(id);
    },
    findProduct(id) {
      axios
        .get(
          `https://us-central1-tddg3-e867b.cloudfunctions.net/products/product/${id}`,
          { headers: { "Content-type": "application/json" } }
        )
        .then(response => {
          this.name = response.data.name;
          this.picture = response.data.picture;
          this.price = response.data.price;
          this.id = id;
        });
    },
    actualizar(id) {
      const prod = {
        name: this.name,
        picture: this.picture,
        price: this.price
      };
      axios
        .put(
          `https://us-central1-tddg3-e867b.cloudfunctions.net/products/product/${id}`,
          prod,
          { headers: { "Content-type": "application/json" } }
        )
        .then(() => {
          (this.name = ""),
            (this.picture = ""),
            (this.price = ""),
            this.$store.dispatch("getProducts");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },*/
  },
  created() {
    this.$store.dispatch("getToys");
  }
};
</script>

<style>
.layout {
  background-color: #6ccbff;
}
.titulo {
  font-size: 40px;
  color: white;
  text-align: center;
}
.header {
  font-size: 15px !important;
}
.modal {
  margin: 5px 0 40px 0;
}
</style>
