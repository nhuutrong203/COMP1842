<template>
  <div id="app">
    <!-- Navbar is shown only if not on login/register page -->
    <div class="ui inverted segment navbar" v-if="!isOnAuthPage">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">
          <!-- Main navigation links -->
          <router-link to="/words" exact class="item">
            <i class="comment outline icon"></i> Words
          </router-link>
          <router-link to="/words/new" class="item">
            <i class="plus circle icon"></i> New
          </router-link>
          <router-link to="/test" class="item">
            <i class="graduation cap icon"></i> Test
          </router-link>
          <router-link to="/aboutme" class="item">
            <i class="user icon"></i> About Me
          </router-link>

          <!-- Dashboard only visible when logged in -->
          <router-link v-if="isAuthenticated" to="/dashboard" class="item">
            <i class="dashboard icon"></i> Dashboard
          </router-link>

          <!-- Display username and logout button when logged in -->
          <div v-if="username" class="item">
            <span>Welcome, {{ username }}</span>
          </div>
          <button v-if="username" @click="logout" class="ui button item">
            Logout
          </button>
        </div>
      </div>
    </div>

    <!-- Main content section -->
    <div class="ui text container content">
      <flash-message class="myFlash"></flash-message>
      <div class="ui one column grid">
        <div class="column">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      username: null,           // Stores current username
      isAuthenticated: false,   // Tracks if user is logged in
      isOnAuthPage: false       // True if on login or register page
    };
  },

  // Called when component is created
  created() {
    this.checkAuth();
    this.checkAuthPage();
  },

  watch: {
    // On route change, update auth status and check if on auth page
    '$route'() {
      this.checkAuth();
      this.checkAuthPage(); 
    }
  },

  methods: {
    // Checks for token in localStorage and updates UI state
    checkAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        this.username = localStorage.getItem('username') || 'Guest';
        this.isAuthenticated = true;
      } else {
        this.username = null;
        this.isAuthenticated = false;
      }
    },

    // Determines if current route is login or register
    checkAuthPage() {
      this.isOnAuthPage = this.$route.path === '/login' || this.$route.path === '/register';
    },

    // Clears auth data and redirects to login
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.username = null;
      this.isAuthenticated = false;
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
/* Fixed navbar on top of the screen */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

/* Adds spacing below navbar for content */
.content {
  margin-top: 5rem; 
}
</style>
