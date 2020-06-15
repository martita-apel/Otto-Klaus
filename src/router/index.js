import Vue from "vue";
import Router from "vue-router";
import Login from "../views/Login.vue";
import Registro from "../views/Registro.vue";
/* import HelloWorld from "../components/HelloWorld.vue";
 */ import firebase from "firebase";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", redirect: "/login" },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/registro",
      name: "registro",
      component: Registro,
      meta: {
        login: true,
      },
    },
    /*  {
      path: "/hello",
      name: "hello",
      component: HelloWorld,
    }, */
  ],
});

router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser;
  let authRequired = to.matched.some((route) => route.meta.login);
  if (!user && authRequired) {
    next("/login");
  } /*  else if (user && !authRequired) {
    next("/registro");
  } */ else {
    next();
  }
});

export default router;
