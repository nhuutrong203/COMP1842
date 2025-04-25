<template>
  <div class="show-container ui segment">
    <h1 class="show-title ui dividing header">
      <i class="book icon"></i>
      Word Details
    </h1>
    <!-- Word details displayed in labeled input fields -->
     
    <div class="field-group">
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="united kingdom flag"></i> English
        </div>
        <input type="text" readonly :value="word.english" />
      </div>

      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="germany flag"></i> German
        </div>
        <input type="text" readonly :value="word.german" />
      </div>

      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="vn flag"></i> Vietnamese
        </div>
        <input type="text" readonly :value="word.vietnamese" />
      </div>
    </div>
    <!-- Action buttons for editing or going back to the list -->
    <div class="actions">
      <router-link
        :to="{ name: 'edit', params: { id: $route.params.id } }"
        class="ui primary button"
      >
        <i class="edit icon"></i>
        Edit Word
      </router-link>
      <router-link to="/words" class="ui button">
        <i class="arrow left icon"></i>
        Back to List
      </router-link>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers'; // Import helper function to interact with the API

export default { // 
  name: 'show',
  data() {
    return {
      word: { english: '', german: '', vietnamese: '' } // Initialize an empty word object to hold the word data
    };
  },
  async mounted() { // Fetch the word data from the API when the component is mounted
    this.word = await api.getWord(this.$route.params.id); // Get the word ID from the route parameters and fetch the word details
  }
};
</script>

<style scoped>
.show-container {
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  background: #ffffff;
}

.show-title {
  text-align: center;
  margin-bottom: 2rem !important;
  color: #333;
}

.field-group .ui.labeled.input {
  margin-bottom: 1.5rem;
}

.ui.labeled.input .ui.label {
  min-width: 120px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.ui.labeled.input .ui.label .flag {
  margin-right: 0.5rem;
  width: 1.5em;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.actions .ui.button {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.actions .ui.primary.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
