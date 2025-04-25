<template>
  <!-- Container for the edit page with a styled header -->
  <div class="edit-container ui segment">
    <h1 class="ui dividing header text-center">
      <i class="edit icon"></i>
      Edit Word
    </h1>

    <!-- WordForm component for creating or updating a word, passing the word data as a prop -->
    <word-form
      @createOrUpdate="onCreateOrUpdate"  <!-- Event listener for form submission -->
      :word="word"  <!-- Pass the word object as a prop to WordForm -->
    ></word-form>
  </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';  // Import WordForm component for use in this page
import { api } from '../helpers/helpers';  // Import helper function to interact with the API

export default {
  name: 'edit',
  components: {
    'word-form': WordForm  // Register WordForm component in the parent component
  },
  data() {
    return {
      word: {}  // Initialize an empty word object that will hold the word data
    };
  },
  async mounted() {
    // Fetch the word data from the API when the component is mounted
    this.word = await api.getWord(this.$route.params.id);
  },
  methods: {
    // Handle the create or update event from WordForm
    async onCreateOrUpdate(word) {
      await api.updateWord(word);  // Call the API to update the word
      this.flash('Word updated successfully!', 'success');  // Show a success message
      this.$router.push(`/words/${word._id}`);  // Redirect to the word's detail page
    }
  }
};
</script>

<style scoped>
/* Container styling for the edit page */
.edit-container {
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);  /* Shadow effect for depth */
}

/* Center the text */
.text-center {
  text-align: center;
}
</style>
