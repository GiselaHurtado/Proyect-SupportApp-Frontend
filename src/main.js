import './assets/main.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index.js';

// Crear la aplicación Vue
const app = createApp(App);

// Crear la instancia de Pinia
const pinia = createPinia();

// Usar Pinia en la aplicación
app.use(pinia);

// Usar el router en la aplicación
app.use(router);

// Montar la aplicación en el elemento con id 'app'
app.mount('#app');