import Vue from 'vue';
import App from './App.vue';          // Main root component
import router from './router';        // Vue Router for handling routes/pages

// Import and configure flash message plugin (used for alerts/notifications)
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

import axios from 'axios'; // Axios is used for making HTTP requests to the backend

Vue.use(VueFlashMessage);

Vue.config.productionTip = false;

// If a token is stored in localStorage, attach it to every axios request header
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

Vue.prototype.$http = axios;

// Create the Vue instance, load the router, and render the main App component
new Vue({
  router,
  render: h => h(App),
}).$mount('#app'); 
