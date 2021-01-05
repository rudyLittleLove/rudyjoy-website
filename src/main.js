import Vue from "vue";
import App from "./App.vue";
import router from "@/router/router.js";
import store from "./store";
import elementUI from "element-ui";
// import RudyScrollbar from "rudy-scrollbar";

import "@/assets/style.styl";
import "@/assets/reset.styl";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

Vue.use(elementUI);
// Vue.use(RudyScrollbar);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
