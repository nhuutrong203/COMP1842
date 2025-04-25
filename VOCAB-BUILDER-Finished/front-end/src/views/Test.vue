<template>
  <div>
    <h1>Test</h1>
    <!-- Display a message if there are no words available -->
    <div v-if="words.length < 5">
      <p>You need to enter at least five words to begin the test</p>
    </div>
    <div v-else>
      <vocab-test :words="words" />
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers'; // Import the API helper to fetch words 
import VocabTest from '../components/VocabTest.vue'; // Import the VocabTest component to display the vocabulary test

export default {
  name: 'test',
  components: {
    VocabTest // Register the VocabTest component for use in this template
  },
  data() {
    return {
      words: [] // Initialize an empty array to hold the words fetched from the API
    };
  },
  async mounted() {
    try {
      this.words = await api.getWords(); // Fetch the words from the API when the component is mounted
    } catch (err) {
      this.$flashMessage.error({ message: 'Failed to load words.', time: 2000 }); // Display an error message if the API call fails
    }
  }
};
</script>
