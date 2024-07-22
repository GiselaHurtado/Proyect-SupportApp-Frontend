import './assets/main.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import store from './stores/index.js';

const app = createApp(App);

app.use(createPinia());
app.use(store);
app.use(router);

app.mount('#app');