import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// FontAwesome (Icons)
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Importo tutte le icone
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab);

let app = createApp(App);
// Aggiungo i plugin
app.use(router);
// Aggiunta del component di fontawesome
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')
