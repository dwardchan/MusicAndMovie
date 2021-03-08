import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Login from "../views/Login.vue";
import CategoryEdit from "../views/CategoryEdit.vue";
import CategoryList from "../views/CategoryList.vue";
import MovieEdit from "../views/MovieEdit.vue";
import MovieList from "../views/MovieList.vue";
import MusicEdit from "../views/MusicEdit.vue";
import MusicList from "../views/MusicList.vue";
import AdminUserEdit from "../views/AdminUserEdit.vue";
import AdminUserList from "../views/AdminUserList.vue";
import UserEdit from "../views/UserEdit.vue";
import UserList from "../views/UserList.vue";
import ArticleEdit from "../views/ArticleEdit.vue";
import ArticleList from "../views/ArticleList.vue";
import CommentEdit from "../views/CommentEdit.vue";
import CommentList from "../views/CommentList.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/login", name: "login", component: Login, meta: { isPublic: true } },
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      { path: "/categories/create", component: CategoryEdit },
      { path: "/categories/list", component: CategoryList },
      { path: "/categories/edit/:id", component: CategoryEdit, props: true },

      { path: "/movies/create", component: MovieEdit },
      { path: "/movies/list", component: MovieList },
      { path: "/movies/edit/:id", component: MovieEdit, props: true },

      { path: "/music/create", component: MusicEdit },
      { path: "/music/list", component: MusicList },
      { path: "/music/edit/:id", component: MusicEdit, props: true },

      { path: "/articles/create", component: ArticleEdit },
      { path: "/articles/list", component: ArticleList },
      { path: "/articles/edit/:id", component: ArticleEdit, props: true },

      { path: "/users/create", component: UserEdit },
      { path: "/users/list", component: UserList },
      { path: "/users/edit/:id", component: UserEdit, props: true },

      { path: "/admin_users/create", component: AdminUserEdit },
      { path: "/admin_users/list", component: AdminUserList },
      { path: "/admin_users/edit/:id", component: AdminUserEdit, props: true },

      { path: "/comments/create", component: CommentEdit },
      { path: "/comments/list", component: CommentList },
      { path: "/comments/edit/:id", component: CommentEdit, props: true },
    ],
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
