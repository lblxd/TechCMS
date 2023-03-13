import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Main from "../views/Main";

import ShowData from "../views/ShowData.vue";

import CategoryEdit from "../views/CategoryEdit";
import CategoryList from "../views/CategoryList";

import SubjectEdit from "../views/SubjectEdit";
import SubjectList from "../views/SubjectList";

import ArticleEdit from "../views/ArticleEdit";
import ArticleList from "../views/ArticleList";

import BookEdit from "../views/BookEdit";
import BookList from "../views/BookList";

import PaperEdit from "../views/PaperEdit";
import PaperList from "../views/PaperList";

import MatterEdit from "../views/MatterEdit";
import MatterList from "../views/MatterList";

import AdEdit from "../views/AdEdit";
import AdList from "../views/AdList";

import AdminUserEdit from "../views/AdminUserEdit";
import AdminUserList from "../views/AdminUserList";

import UserEdit from "../views/UserEdit";
import UserList from "../views/UserList";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { isPublic: true },
  },
  {
    path: "/",
    name: "main",
    component: Main,
    children: [
      { path: "/data", component: ShowData },

      { path: "/categories/create", component: CategoryEdit },
      { path: "/categories/edit/:id", component: CategoryEdit, props: true },
      { path: "/categories/list", component: CategoryList },

      { path: "/subjects/create", component: SubjectEdit },
      { path: "/subjects/edit/:id", component: SubjectEdit, props: true },
      { path: "/subjects/list", component: SubjectList },

      { path: "/articles/create", component: ArticleEdit },
      { path: "/articles/edit/:id", component: ArticleEdit, props: true },
      { path: "/articles/list", component: ArticleList },

      { path: "/books/create", component: BookEdit },
      { path: "/books/edit/:id", component: BookEdit, props: true },
      { path: "/books/list", component: BookList },

      { path: "/papers/edit/:id", component: PaperEdit, props: true },
      { path: "/papers/list", component: PaperList },

      { path: "/matters/edit/:id", component: MatterEdit, props: true },
      { path: "/matters/list", component: MatterList },

      { path: "/ads/create", component: AdEdit },
      { path: "/ads/edit/:id", component: AdEdit, props: true },
      { path: "/ads/list", component: AdList },

      { path: "/admin_users/create", component: AdminUserEdit },
      { path: "/admin_users/edit/:id", component: AdminUserEdit, props: true },
      { path: "/admin_users/list", component: AdminUserList },

      { path: "/users/create", component: UserEdit },
      { path: "/users/edit/:id", component: UserEdit, props: true },
      { path: "/users/list", component: UserList },
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
