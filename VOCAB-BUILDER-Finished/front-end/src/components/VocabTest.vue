<template>
  <div>
    <!-- Progress bar showing completion percentage -->
    <div class="ui progress">
      <div class="bar" :style="{ width: progressPercent + '%' }"></div>
    </div>

    <!-- Score display -->
    <h2 class="score-title">Score: {{ score }} out of {{ words.length }}</h2>

    <!-- Answer input form -->
    <form @submit.prevent="onSubmit" class="ui form">
      <!-- German word (readonly) -->
      <div class="ui labeled input fluid">
        <div class="ui label"><i class="germany flag"></i> German</div>
        <input type="text" readonly :value="currWord.german" :disabled="testOver" />
      </div>

      <!-- English input -->
      <div class="ui labeled input fluid">
        <div class="ui label"><i class="united kingdom flag"></i> English</div>
        <input type="text" v-model="english" :disabled="testOver" placeholder="Enter word..." />
      </div>

      <!-- Vietnamese input -->
      <div class="ui labeled input fluid">
        <div class="ui label"><i class="vn flag"></i> Vietnamese</div>
        <input type="text" v-model="vietnam" :disabled="testOver" placeholder="Enter word..." />
      </div>

      <!-- Submit answer -->
      <button class="positive ui button" :disabled="testOver">Submit</button>
    </form>

    <!-- Feedback message -->
    <p :class="['results', resultClass]"><span v-html="result"></span></p>

    <!-- Retry button shown when test is over -->
    <div v-if="testOver" class="center-btn">
      <button class="ui blue button" @click="retryTest">Retry Again</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vocab-test',
  props: {
    words: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      randWords: [],            // Shuffled copy of input words
      incorrectGuesses: [],     // Tracks incorrect German words
      result: '',               // Final result message
      resultClass: '',          // Message styling class (success/error)
      english: '',              // User input: English
      vietnam: '',              // User input: Vietnamese
      score: 0,                 // Number of correct answers
      testOver: false           // Whether the test has finished
    };
  },
  created() {
    this.shuffleWords();        // Shuffle words on component creation
  },
  computed: {
    // Current word to test
    currWord() {
      return this.randWords[0] || {};
    },
    // Progress percentage
    progressPercent() {
      return Math.round(((this.words.length - this.randWords.length) / this.words.length) * 100);
    }
  },
  methods: {
    // Randomize order of test words
    shuffleWords() {
      this.randWords = [...this.words].sort(() => 0.5 - Math.random());
    },
    // Handles answer submission
    onSubmit() {
      if (!this.english.trim() || !this.vietnam.trim()) {
        this.flash('Please fill in both English and Vietnamese fields!', 'warning', { timeout: 1500 });
        return;
      }

      // Check if both answers are correct (case-insensitive)
      const correct =
        this.english.trim().toLowerCase() === this.currWord.english.toLowerCase() &&
        this.vietnam.trim().toLowerCase() === this.currWord.vietnamese.toLowerCase();

      if (correct) {
        this.flash('Correct!', 'success', { timeout: 1000 });
        this.score++;
      } else {
        this.flash('Wrong!', 'error', { timeout: 1000 });
        this.incorrectGuesses.push(this.currWord.german);
      }

      // Reset input and go to next word
      this.english = '';
      this.vietnam = '';
      this.randWords.shift();

      // End test if no more words
      if (this.randWords.length === 0) {
        this.testOver = true;
        this.displayResults();
      }
    },
    // Show summary at end of test
    displayResults() {
      if (this.incorrectGuesses.length === 0) {
        this.result = 'You got everything correct. Well done!';
        this.resultClass = 'success';
      } else {
        this.result = `<strong>You got the following words wrong:</strong> ${this.incorrectGuesses.join(', ')}`;
        this.resultClass = 'error';
      }
    },
    // Restart the test
    retryTest() {
      this.score = 0;
      this.english = '';
      this.vietnam = '';
      this.result = '';
      this.resultClass = '';
      this.incorrectGuesses = [];
      this.testOver = false;
      this.shuffleWords();
    }
  }
};
</script>

<style scoped>
/* Score heading */
.score-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #333;
}

/* Feedback message */
.results {
  margin: 25px auto;
  padding: 20px;
  border-radius: 8px;
  font-size: 1.1em;
  text-align: center;
  width: 100%;
  max-width: 600px;
}

/* Error and success styles */
.error {
  border: 1px solid #f44336;
  color: #fff;
  background-color: #f44336;
  padding: 10px;
  border-radius: 5px;
}
.success {
  border: 1px solid #4caf50;
  color: #fff;
  background-color: #4caf50;
  padding: 10px;
  border-radius: 5px;
}

/* Progress bar */
.ui.progress {
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin-bottom: 30px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.ui.progress .bar {
  height: 100%;
  background-color: #21ba45;
  transition: width 0.3s ease;
  border-radius: 10px;
}

/* Input styling */
.ui.labeled.input {
  margin-bottom: 15px;
}
.ui.labeled.input .ui.label {
  display: flex;
  align-items: center;
  min-width: 140px;
  background-color: #f5f5f5;
  border-radius: 5px 0 0 5px;
  padding: 10px;
  font-weight: bold;
  color: #333;
}
.ui.labeled.input input {
  border-radius: 0 5px 5px 0;
  padding: 12px 15px;
  font-size: 1em;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease;
  width: 100%;
}
.ui.labeled.input input:focus {
  border-color: #21ba45;
  outline: none;
}

/* Buttons */
button.ui.button {
  background-color: #21ba45;
  color: white;
  font-size: 1.1em;
  padding: 12px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}
button.ui.button:disabled {
  background-color: #d3d3d3;
  cursor: not-allowed;
}
button.ui.button:not(:disabled):hover {
  background-color: #1e7e34;
}

/* Retry button layout */
.center-btn {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* Flag icon sizing */
.ui.labeled.input .ui.label .flag {
  width: 1.7em;
  height: auto;
  margin-right: 8px;
}
</style>
