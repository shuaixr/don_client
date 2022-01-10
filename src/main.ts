import { createApp, ref, provide } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ethers } from "ethers";
import { providerKey } from "./injectionKeys";

const app = createApp(App);

app.use(router).mount("#app");
