<template>
  <v-layout column justify-center align-center class="layout">
    <v-row justify="center">
      <v-dialog :value="showForm" persistent max-width="400px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="orange"
            dark
            v-bind="attrs"
            v-on="on"
            @click="mostrarModal"
            >NUEVO PRODUCTO</v-btn
          >
        </template>
        <v-card class="py-6 px-4">
          <v-card-title>
            <span class="text-h4 text--secondary text-center titulo"
              >Registrar Producto</span
            >
          </v-card-title>
          <v-card-text class="py-0">
            <v-text-field
              placeholder="Código"
              filled
              dense
              type="text"
              :value="currentToy.data.id"
              @input="updateId"
            ></v-text-field>
            <v-text-field
              placeholder="Nombre"
              filled
              dense
              type="text"
              :value="currentToy.data.name"
              @input="updateName"
            ></v-text-field>
            <v-text-field
              placeholder="Precio"
              filled
              dense
              prefix="$"
              :value="currentToy.data.price"
              @input="updatePrice"
            ></v-text-field>
            <v-text-field
              placeholder="Stock"
              filled
              dense
              suffix="unidades"
              :value="currentToy.data.stock"
              @input="updateStock"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="añadir">
            <v-spacer></v-spacer>
            <v-btn class="primary boton-add" text @click="ocultarModal"
              >CERRAR</v-btn
            >
            <v-btn class="warning boton-add" text @click="agregarToy">{{
              !!currentToy.id ? "Actualizar" : "Añadir"
            }}</v-btn>
            <!--             <v-btn class="green boton-add" text v-if="edit" @click="actualizar(id)">ACTUALIZAR</v-btn>
            -->
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-layout>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "Modal",
  data() {
    return {};
  },
  computed: {
    ...mapState(["showForm", "currentToy", /* "edit", */ "baseToy", "loading"]),
  },
  methods: {
    ...mapMutations(["SET_EMPTY_TOY"]),
    ...mapActions([
      "getToys",
      "showModal",
      "hideModal",
      "updateId",
      "updateName",
      "updatePrice",
      "updateStock",
      "addToy",
      "updateToy",
    ]),
    agregarToy() {
      if (!this.currentToy.id) {
        this.addToy();
      } else {
        this.updateToy(this.currentToy.id);
      }
      this.hideModal();
    },
    mostrarModal() {
      this.showModal();
    },
    ocultarModal() {
      this.hideModal();
      /*       this.SET_EMPTY_TOY;*/
      this.getToys();
    },
  },
  created() {
    /*     this.$store.dispatch("getToys"); */
    this.getToys();
  },
};
</script>

<style>
.añadir {
  margin: 0 auto;
}
.boton-add {
  margin-right: 10px;
  color: white !important;
}
.titulo {
  margin: 0;
  padding-bottom: 10px;
}
</style>
