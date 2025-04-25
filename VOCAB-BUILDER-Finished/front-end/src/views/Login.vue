<template>
  <div class="ui container full-page">
    <div class="ui grid">
      <!-- Left: Avatar -->
      <div class="six wide column left-column">
        <img
          src="@/assets/TrongFlat.png"
          alt="Trong's Icon"
          class="login-icon"
        />
      </div>
      <!-- Right: Login form -->
      <div class="ten wide column right-column">
        <h2 class="ui header text-center">Login</h2>
        <div class="ui form" :class="{ error: !!errorMessage }">
          <div class="field">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Enter your username"
            />
          </div>
          <div class="field">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
            />
          </div>
          <div class="field">
            <button @click="handleLogin" class="ui primary button">
              Login
            </button>
          </div>
          <div class="field">
            <button @click="goToRegister" class="ui secondary button">
              Register
            </button>
          </div>
          <div class="ui error message" v-if="errorMessage">
            <div class="header">Login Failed</div>
            <p>{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleLogin() {
      this.errorMessage = '';
      try {
        // login -> get token
        const { token } = await api.login({
          username: this.username,
          password: this.password
        });

        // store token + username
        localStorage.setItem('token', token);
        localStorage.setItem('username', this.username);

        // fetch all users to find our role
        let role = 'user';
        try {
          const users = await api.getUsers();
          const me = users.find(u => u.username === this.username);
          if (me?.role) role = me.role;
        } catch (fetchErr) {
          // if 403: admins-only, so we're a normal user
          if (fetchErr.response?.status !== 403) {
            console.error('Error fetching users for role:', fetchErr);
          }
        }
        localStorage.setItem('role', role);

        // show success flash then redirect
        this.flash('Logged in successfully!', 'success');
        this.$router.push('/dashboard');
      } catch (err) {
        // only show real login errors
        if (err.response?.status === 404 || err.response?.status === 400) {
          this.errorMessage = err.response.data.message;
        } else {
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      }
    },
    goToRegister() {
      this.$router.push('/register');
    }
  }
};
</script>

<style scoped>
.full-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
}
.left-column {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 20px;
}
.login-icon {
  width: 200px;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.right-column {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.ui.form {
  background: white;
  max-width: 400px;
  width: 100%;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.ui.form .field {
  margin-bottom: 20px;
}
.ui.form label {
  font-weight: bold;
  color: #333;
}
.ui.primary.button {
  background-color: #4caf50 !important;
  color: white !important;
  width: 100%;
  padding: 12px;
  font-size: 1.2em;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.ui.primary.button:hover {
  background-color: #45a049 !important;
}
.ui.secondary.button {
  background-color: #007bff !important;
  color: white !important;
  width: 100%;
  padding: 12px;
  font-size: 1.1em;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.ui.secondary.button:hover {
  background-color: #0056b3 !important;
}
.ui.error.message {
  color: #9f3a38 !important;
  background: #fff6f6 !important;
  border-color: #e0b4b4 !important;
  padding: 12px !important;
  border-radius: 5px !important;
  margin-top: 10px;
}
.text-center {
  text-align: center;
}
</style>
