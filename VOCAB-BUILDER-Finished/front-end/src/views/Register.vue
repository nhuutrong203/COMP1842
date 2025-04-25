<template>
  <div class="ui container full-page">
    <div class="ui grid">
      <div class="six wide column left-column">
        <img src="@/assets/TrongFlat.png" alt="Trong's Icon" class="login-icon" />
      </div>

      <!-- Right: Register form -->
      <div class="ten wide column right-column">
        <h2 class="ui header">Register</h2>
        <div class="ui form">
          <div class="field">
            <!-- Field for inputting data -->
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" placeholder="Enter your username" />
          </div>
          <div class="field">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" placeholder="Enter your password" />
          </div>
          <div class="field">
            <button @click="handleRegister" class="ui button primary">Register</button>
          </div>

          <div class="ui error message" v-if="error">{{ error }}</div>

          <!-- Login button -->
          <div class="field">
            <button @click="goToLogin" class="ui button secondary">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'Register',
  data() {
    return { 
      username: '',
      password: '',
      error: null
    };
  },
  methods: {
    async handleRegister() {    // Handle user registration and redirect to login page on success

      try {
        await api.register({
          username: this.username,
          password: this.password
        });
        this.$router.push('/login');
      } catch (err) {
        this.error = err.response?.data?.message || 'Registration failed!';
        console.error('Register failed:', err);
      }
    },
    // navigate to login page
    goToLogin() {
      this.$router.push('/login');
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
  height: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
  border-radius: 50%;
}

.right-column {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.ui.form {
  background-color: white;
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

.input-field {
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1.1em;
}

.ui.button.primary {
  background-color: #4CAF50;
  color: white;
  width: 100%;
  padding: 12px;
  font-size: 1.2em;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.ui.button.primary:hover {
  background-color: #45a049;
}

.ui.error.message {
  color: red;
  font-size: 0.9em;
  margin-top: 15px;
}

.ui.button.secondary {
  background-color: #007bff;
  color: white;
  width: 100%;
  padding: 12px;
  font-size: 1.1em;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.ui.button.secondary:hover {
  background-color: #0056b3;
}

.text-center {
  text-align: center;
}

.text-center a {
  color: #007bff;
  font-weight: bold;
  text-decoration: none;
}
</style>
