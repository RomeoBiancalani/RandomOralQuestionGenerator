import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// General JS
import "jquery/src/jquery.js";
import "popper.js/dist/popper.min.js";
import $ from "jquery";

// Bootstrap JS
import "bootstrap/dist/js/bootstrap.min.js";

// Bootstrap SCSS main
import "./scss/main.scss";

// FontAwesome (Icons)
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// Importo tutte le icone
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

// DB (Localforage)
import localforage from "localforage";
// Config DB
localforage.config({
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
  name: "RandomOralQuestionGenerator",
});

let app = createApp(App);
// Aggiungo i plugin
app.use(router);
// Aggiunta del component di fontawesome
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
