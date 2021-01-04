import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/home/index.vue";
// import Login from "@/views/Login.vue";
// import DragonQuestMonster from "@/views/dragonQuestMonster.vue";
// import DragonQuestProp from "@/views/dragonQuestProp.vue";
// import GitCommands from "@/views/gitCommands.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      name: "404",
      component: () =>
        import(/* webpackChunkName: "404" */ "@/views/home/404.vue")
    },
    {
      path: "/",
      name: "index",
      redirect: "/baseInfo",
      component: Home,
      children: [
        {
          path: "/baseInfo",
          name: "baseInfo",
          component: () => import("@/views/home/baseInfo.vue")
        },
        {
          path: "/blogs",
          name: "blogs",
          component: () => import("@/views/blogs/blogs.vue")
        },
        {
          path: "/games",
          name: "games",
          redirect: "/games/dragonQuestMonster",
          component: () => import("@/views/games/games.vue"),
          children: [
            {
              path: "/games/dragonQuestMonster",
              name: "dragonQuestMonster",
              component: () => import("@/views/dragonQuestMonster.vue")
            },
            {
              path: "/games/dragonQuestProp",
              name: "dragonQuestProp",
              component: () => import("@/views/dragonQuestProp.vue")
            },
            {
              path: "/games/XuanYuanSwordStashes",
              name: "XuanYuanSwordStashes",
              component: () =>
                import("@/views/games/components/xuan-yuan-sword-stashes.vue")
            },
            {
              path: "/games/XuanYuanSwordDevilPot",
              name: "XuanYuanSwordDevilPot",
              component: () =>
                import("@/views/games/components/xuan-yuan-sword-devil-pot.vue")
            }
          ]
        }
      ]
    },
    {
      path: "/gitCommands",
      name: "gitCommands",
      component: () =>
        import(/* webpackChunkName: "GitCommands" */ "@/views/gitCommands.vue")
    },
    {
      path: "/rectRandom",
      name: "rectRandom",
      component: () =>
        import(/* webpackChunkName: "rectRandom" */ "@/views/rectRandom.vue")
    },
    {
      path: "/dishes",
      name: "dishes",
      component: () =>
        import(/* webpackChunkName: "dishes" */ "@/views/dishes/index.vue")
    }
  ]
});
