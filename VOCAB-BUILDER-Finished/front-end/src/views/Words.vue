<template>
  <div class="words-container">
    <h1 class="words-title">Nguyen Huu Trong GCS220832 – Words</h1>
    <!-- Table to display words with their English, German, and Vietnamese translations -->
    <table id="words" class="ui celled compact table table-striped table-hover">
      <thead>
        <tr>
          <th>English</th>
          <th>German</th>
          <th>Vietnamese</th>
          <th colspan="3" class="center aligned">Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through each word in 'words' array and display in table rows -->
        <tr v-for="(word, i) in words" :key="i">
          <!-- Display each language with a conditional class for highlighting -->
          <td :class="{ highlightEnglish: selectedLang === 'english' }">
            {{ word.english }}
          </td>
          <td :class="{ highlightGerman: selectedLang === 'german' }">
            {{ word.german }}
          </td>
          <td :class="{ highlightVietnamese: selectedLang === 'vietnamese' }">
            {{ word.vietnamese }}
          </td>
          <!-- Action buttons to show, edit, and delete a word -->
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'show', params: { id: word._id } }">Show</router-link>
          </td>
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'edit', params: { id: word._id } }">Edit</router-link>
          </td>
          <td width="75" class="center aligned">
            <a
              href="#"
              @click.prevent="onDestroy(word._id)"
              :class="{ disabled: !isAdmin }"
            >Destroy</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'words',
  data() {
    return {
      words: [], // Array to store words fetched from backend
      isAdmin: false, // Boolean to check if user has admin role
      selectedLang: ''  // Store current language from query parameters
    };
  },
  watch: {
    // Watch for changes in the route's query parameter 'lang' and update 'selectedLang'
    '$route.query.lang'(newLang) {
      this.selectedLang = newLang || '';
    }
  },
  methods: {
    // Handle the deletion of a word (only accessible by admin)
    async onDestroy(id) {
      if (!this.isAdmin) return; // Prevent deletion if user is not admin
      if (!confirm('Are you sure you want to delete this word?')) return; // Confirmation prompt
      try {
        await api.deleteWord(id); // Call API to delete the word
        this.flash('Word deleted successfully!', 'success');
        this.words = this.words.filter(w => w._id !== id); // Remove deleted word from the list
      } catch (err) {
        console.error('Error deleting word:', err);
        this.flash('Error deleting word', 'error');
      }
    }
  },
  async mounted() {
    // Check if user is logged in by checking token in localStorage
    if (!localStorage.getItem('token')) {
      this.flash('You must be logged in.', 'error');
      return this.$router.push('/login'); // Redirect to login if not logged in
    }

    // Set isAdmin flag based on stored role in localStorage
    this.isAdmin = localStorage.getItem('role') === 'admin';

    // Read 'lang' query parameter from the URL and set selectedLang
    this.selectedLang = this.$route.query.lang || '';

    try {
      // Fetch list of words from the backend API
      this.words = await api.getWords();
    } catch (err) {
      console.error('Error fetching words:', err);
      if (err.response?.status === 401) {
        // Handle session expiration
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.flash('Session expired. Please login again.', 'error');
        return this.$router.push('/login');
      }
      this.flash('Error fetching words', 'error');
    }
  }
};
</script>

<style scoped>
.words-container {
  max-width: 900px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}
.words-title {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}
#words {
  width: 100%;
}

/* Highlight the language columns when selectedLang matches */
.highlightEnglish {
  background-color: #e3f2fd !important; /* Light blue for English */
  transition: background-color 0.3s ease;
}
.highlightGerman {
  background-color: #fff3cd !important; /* Light yellow for German */
  transition: background-color 0.3s ease;
}
.highlightVietnamese {
  background-color: #e6ffed !important; /* Light green for Vietnamese */
  transition: background-color 0.3s ease;
}

/* Striped table rows for readability */
.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}
/* Hover effect for table rows */
.table-hover tbody tr:hover {
  background-color: #e6f7ff;
}
/* Disable the 'Destroy' link if user is not admin */
a.disabled {
  color: #ccc;
  pointer-events: none;
  cursor: not-allowed;
}
</style>
