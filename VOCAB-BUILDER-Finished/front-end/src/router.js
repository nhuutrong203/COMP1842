// Import Vue and Vue Router
import Vue from 'vue';
import Router from 'vue-router';

// Import views (pages)
import Words from './views/Words.vue';
import New from './views/New.vue';
import Show from './views/Show.vue';
import Edit from './views/Edit.vue';
import Test from './views/Test.vue';
import AboutMe from './views/AboutMe.vue';
import Dashboard from './views/Dashboard.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

// Tell Vue to use Vue Router
Vue.use(Router);

// Define router instance with configuration
const router = new Router({
  mode: 'history',                     // Use clean URLs without hash (#)
  base: process.env.BASE_URL,         // Base URL from environment settings
  linkActiveClass: 'active',          // Class to apply to active navigation links
  routes: [
    {
      // Redirect root path based on login status
      path: '/',
      redirect: localStorage.getItem('token') ? '/dashboard' : '/login'
    },
    // Public routes (accessible without login)
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },

    // Protected routes (require authentication)
    { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/words', name: 'words', component: Words, meta: { requiresAuth: true } },
    { path: '/words/new', name: 'new-word', component: New, meta: { requiresAuth: true } },
    { path: '/words/:id', name: 'show', component: Show, meta: { requiresAuth: true } },
    { path: '/words/:id/edit', name: 'edit', component: Edit, meta: { requiresAuth: true } },
    { path: '/test', name: 'test', component: Test, meta: { requiresAuth: true } },
    { path: '/aboutme', name: 'aboutme', component: AboutMe, meta: { requiresAuth: true } },
  ]
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if user is logged in
  // If the route requires auth and user is not authenticated, redirect to login
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ path: '/login' });
  } else {
    next(); // Proceed to route
  }
});

// Export the router instance
export default router;
