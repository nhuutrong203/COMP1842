<template>
  <div class="new-word-container container mt-5">
    <div class="text-center mb-4">
      <i class="large plus circle icon"></i>
      <h1 class="page-title">Add a New Word</h1>
      <p class="text-muted">Fill in the details below to add a new word to your vocabulary.</p>
    </div>
    <!-- Display the icon image -->
    <div class="card shadow-sm p-4 rounded">
      <word-form @createOrUpdate="createOrUpdate"></word-form>
    </div>

    <div v-if="message" class="alert alert-success mt-4" role="alert">
      <strong>Success!</strong> {{ message }}
    </div>
  </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helpers';

export default { // Import the WordForm component for use in this page
  name: 'new-word', // The name of the component
  components: { // Register WordForm component in the parent component
    'word-form': WordForm
  },
  data() { // Initialize an empty word object that will hold the word data
    return {
      message: ''
    };
  },
  methods: { // Handle the create or update event from WordForm
    createOrUpdate: async function(word) {
      try {
        const res = await api.createWord(word); // Call the API to create a new word
        this.message = 'Word created successfully!';

        setTimeout(() => {
          this.$router.push(`/words/${res._id}`);
        }, 1000);
      } catch (err) {
        console.error('Error creating word:', err);
        this.message = 'Failed to create word. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
/* Container styling for the new word page */
.new-word-container {
  background-color: #f8f9fa;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
/* Center the text */
.page-title {
  font-size: 2rem;
  color: #007bff;
  font-weight: bold;
}
/* Styling for the icon image */
.icon-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
/* Card design */
.card {
  background-color: #ffffff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
}

.card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
/* Alert message styling */
.alert {
  font-size: 1rem;
  padding: 15px;
  background-color: #e2f7e2;
  border: 1px solid #d4edda;
  border-radius: 5px;
  color: #28a745;
  margin-top: 20px;
}
</style>
