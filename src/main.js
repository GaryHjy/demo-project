import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/index.less";
// import CustomComponent from "@/components/custom-component";

// Vue.use(CustomComponent);
// Vue.component('custom-component', CustomComponent);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
