<template>
  <v-layout column justify-center align-center class="layout">
    <v-row justify="center">
      <v-dialog :value="showForm" persistent max-width="400px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="orange" dark v-bind="attrs" v-on="on">NUEVO PRODUCTO</v-btn>
        </template>
        <v-card class="py-6 px-4">
          <v-card-title>
            <span class="text-h4 text--secondary text-center titulo">Registrar Producto</span>
          </v-card-title>
          <v-card-text class="py-0">
            <v-text-field type="text" v-model="id" placeholder="Código" filled dense></v-text-field>
            <v-text-field type="text" v-model="name" placeholder="Nombre" filled dense></v-text-field>
            <v-text-field type="number" v-model="price" placeholder="Precio" filled dense></v-text-field>
            <v-text-field type="number" v-model="stock" placeholder="Stock" filled dense></v-text-field>
          </v-card-text>
          <v-card-actions class="añadir">
            <v-spacer></v-spacer>
            <v-btn class="primary boton-add" text @click="mostrarModal">CERRAR</v-btn>
            <v-btn class="warning boton-add" text @click="agregarToy">AÑADIR</v-btn>
            <button class="button is-link" v-if="edit" @click="actualizar(id)">ACTUALIZAR</button>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-layout>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  name: "Modal",
  data() {
    return {
      /* id: "",
      name: "",
      price: "",
      stock: "", */
    };
  },
  methods: {
    ...mapActions(["updateEdit", "showModal", "addToy"]),
    agregarToy() {
      this.addToy();
    },
    mostrarModal() {
      this.showModal();
    }

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
    borrar(id) {
      let confirm = confirm("¿Se eliminó?");
      if (confirm) {
      axios
        .delete(
          `https://us-central1-tddg3-e867b.cloudfunctions.net/products/product/${id}`,
          { headers: { "Content-type": "application/json" } }
        )
        .then(() => {
          alert("Producto eliminado.");
          this.$store.dispatch("getProducts");
        });
       }
    }
  },*/
  },
  computed: {
    ...mapState(["showForm"])
  },
  created() {
    this.$store.dispatch("getToys");
  }
};
</script>

<style>
.añadir {
  margin: 0 auto;
}
.boton-add {
  margin-right: 10px;
}
.titulo {
  margin: 0;
  padding-bottom: 10px;
}
</style>
