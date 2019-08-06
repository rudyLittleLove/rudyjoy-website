import Vue from "vue";
import App from "./App.vue";
import router from "@/router/router.js";
import store from "./store";
import elementUI from "element-ui";

import "@/assets/style.styl";
import "@/assets/reset.styl";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

Vue.use(elementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
