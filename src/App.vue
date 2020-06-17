<template>
  <v-app>
    <v-card flat>
      <v-container class="container" fluid>
        <v-row class="child-flex">
          <v-toolbar color="grey lighten-3">
            <img class="logo" src="/otto.png" alt="logo" />
            <v-spacer></v-spacer>
            <v-btn icon class="hidden-xs-only">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>

          <div style="flex-basis: 20%">
            <v-toolbar color="blue darken-4">
              <v-tab class="link" to="/">Iniciar Sesión</v-tab>
              <v-tab class="link" to="/registro">Registro</v-tab>

              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon color="white">mdi-reply</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon color="white">mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
          </div>
        </v-row>
      </v-container>
    </v-card>

    <v-content>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-content>

    <v-spacer></v-spacer>

    <v-footer dark padless>
      <v-card flat tile class="blue darken-4 white--text text-center">
        <v-card-text class="pb-0">
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pr-10 pl-10">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada.
        </v-card-text>

        <v-divider class="mr-10 ml-10"></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} —
          <strong>Otto Klaus</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
};
</script>
<style>
.link {
  color: white !important;
}
.logo {
  width: 200px;
}
.container {
  padding: 0 !important;
}
</style>
