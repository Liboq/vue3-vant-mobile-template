import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "app",
    redirect: "/home",
    meta: {
      title: "app",
    },
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "home",
        },
        component: () => import("@/pages/index.vue"),
      },
    ],
  },
  //   不需要layout的页面
  { path: "/:pathMatch(.*)*", redirect: "/" },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
