import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import DragonQuestMonster from "@/views/dragonQuestMonster.vue";
import DragonQuestProp from "@/views/dragonQuestProp.vue";
import GitCommands from "@/views/gitCommands.vue";

Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/dragonQuestMonster",
      name: "dragonQuestMonster",
      component: DragonQuestMonster
    },
    {
      path: "/dragonQuestProp",
      name: "dragonQuestProp",
      component: DragonQuestProp
    },
    {
      path: "/gitCommands",
      name: "gitCommands",
      component: GitCommands
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/About.vue")
    }
  ]
});
