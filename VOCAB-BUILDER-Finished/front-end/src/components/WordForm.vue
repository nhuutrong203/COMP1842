<template>
  <form action="#" @submit.prevent="onSubmit">
    <!-- Display error message if any field is empty -->
    <p v-if="errorsPresent" class="error">Please fill out both fields!</p>

    <!-- English input field with flag label -->
    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="united kingdom flag"></i> English
      </div>
      <input type="text" placeholder="Enter word..." v-model="word.english" />
    </div>

    <!-- German input field with flag label -->
    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="germany flag"></i> German
      </div>
      <input type="text" placeholder="Enter word..." v-model="word.german" />
    </div>

    <!-- Vietnamese input field with flag label -->
    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="vn flag"></i> Vietnamese
      </div>
      <input type="text" placeholder="Enter word..." v-model="word.vietnamese" />
    </div>

    <!-- Submit button -->
    <button class="positive ui button">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'word-form',

  // Props allow parent component to pass a word object for editing
  props: {
    word: {
      type: Object,
      required: false,
      default: () => {
        return {
          english: '',
          german: '',
          vietnamese: '',
        };
      },
    },
  },

  data() {
    return {
      errorsPresent: false, // Controls error message display
    };
  },

  methods: {
    // Form submission handler
    onSubmit: function () {
      // Check if any field is empty; if so, show error
      if (
        this.word.english.trim() === '' ||
        this.word.german.trim() === '' ||
        this.word.vietnamese.trim() === ''
      ) {
        this.errorsPresent = true;
      } else {
        this.errorsPresent = false;
        // Emit event with word data to parent component
        this.$emit('createOrUpdate', this.word);
      }
    },
  },
};
</script>

<style scoped>
/* Red text for error message */
.error {
  color: red;
}

/* Style for the label section in the input */
.ui.labeled.input .ui.label {
  display: flex;
  align-items: center;
  min-width: 140px;
}

/* Adjust flag icon size and spacing */
.ui.labeled.input .ui.label .flag {
  width: 1.5em;
  height: auto;
  margin-right: 6px;
}
</style>
