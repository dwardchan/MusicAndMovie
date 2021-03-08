import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Article from "../views/Article.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      { path: "/", name: "home", component: Home },
      {
        path: "/article/:id",
        name: "article",
        component: Article,
        props: true,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { isPublic: true },
  },
  {
    path: "/login/register",
    name: "register",
    component: Register,
    meta: { isPublic: true },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next("/login");
  }
  next();
});
export default router;
