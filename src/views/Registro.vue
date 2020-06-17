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
              <v-btn
                small
                outlined
                color="green darken-1"
                @click="editar(toy.id)"
              >
                <span class="icon is-small">
                  <i class="fas fa-check"></i>
                </span>
                <span>Editar</span>
              </v-btn>
            </td>
            <td>
              <v-btn
                small
                outlined
                color="red darken-1"
                @click="borrarToy(toy.id)"
              >
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
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-main>

    <v-btn class="cerrar" @click="logout">Cerrar Sesión</v-btn>
  </v-layout>
</template>

<script>
import Modal from "../components/Modal.vue";
import { mapState, mapActions } from "vuex";
import firebase from "firebase";

export default {
  name: "Registro",
  components: {
    Modal,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["toys", "edit", "loading"]),
  },
  methods: {
    ...mapActions([
      "getToys",
      "showModal",
      "updateEdit",
      "findProduct",
      "deleteToy",
    ]),

    editar(id) {
      this.showModal();
      this.findProduct(id);
      /*       this.updateEdit();
       */
    },
    borrarToy(id) {
      let confirmar = confirm(
        "¿Estás segura que deseas eliminar este producto?"
      );
      if (confirmar) {
        this.deleteToy(id);
      }
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        });
    },
  },
  created() {
    this.$store.dispatch("getToys");
  },
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
.cerrar {
  margin-bottom: 40px !important;
}
</style>
