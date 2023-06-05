import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css"


const app = createApp(App);
const pinia = createPinia();

// // configurar o Axios para usar a base URL da API de backend
// axios.defaults.baseURL = "https://localhost:7096/"

app.use(router)
app.use(pinia)
app.mount("#app")