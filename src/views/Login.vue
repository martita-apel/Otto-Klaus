<template>
  <v-layout column justify-center align-center class="registro">
    <div ref="form" :model="usuario" class="my-15">
      <v-card class="white py-8 px-10">
        <h2 class="text-h3 text--secondary text-center titulo">
          Iniciar Sesión
        </h2>
        <br />
        <v-text-field
          v-model="usuario.email"
          name="email"
          type="text"
          label="Ingresa tu email"
          prepend-icon="mdi-email"
          required
          filled
        ></v-text-field>

        <v-text-field
          v-model="usuario.password"
          name="password"
          :counter="20"
          label="Ingresa tu contraseña"
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          required
          filled
        ></v-text-field>

        <v-btn type="submit" color="warning" @click="login">INGRESAR</v-btn>
      </v-card>
    </div>
  </v-layout>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      showPassword: false,
      usuario: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      firebase
        .auth()
        .signInWithEmailAndPassword(this.usuario.email, this.usuario.password)
        .then((user) => {
          console.log(user);
          /* let userValid = this.usuario.email;
          this.$store.dispatch("userLogin", userValid); */
          this.$router.push("/registro");
          alert("Te has registrado con éxito!");
        })
        .catch(() => {
          console.log("Usuario no autenticado");
        });
    },
  },
};
</script>

<style scoped>
.registro {
  background-color: #11a2f0;
}
.titulo {
  padding-bottom: 8px;
  margin: 0;
}
</style>
