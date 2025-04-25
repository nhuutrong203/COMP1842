<template>
  <div class="about-container">
    <!-- Main Info Card -->
    <div class="ui raised very padded text container segment about-card">
      <h2 class="ui header">
        <i class="user circle outline icon"></i>
        <div class="content">
          GCS220832 Page
          <div class="sub header">Created by Nguyen Huu Trong</div>
        </div>
      </h2>

      <!-- Intro Text -->
      <p>
        This page belongs to Nguyen Huu Trong and was created to demonstrate how to add a new menu item, icon, and custom view in a Vue.js app.
      </p>

      <!-- Buttons for interactivity -->
      <div class="ui buttons">
        <!-- Toggle More Info -->
        <button @click="showMore = !showMore" class="ui blue button">
          <i :class="showMore ? 'eye slash icon' : 'eye icon'"></i>
          {{ showMore ? 'Hide Details' : 'Show More About Me' }}
        </button>

        <!-- Show Random Fun Fact -->
        <button @click="generateFact" class="ui orange button">
          <i class="lightbulb icon"></i> Fun Fact
        </button>

        <!-- Like Button -->
        <button @click="likes++" class="ui green button">
          <i class="thumbs up icon"></i> Like ({{ likes }})
        </button>
      </div>

      <!-- Conditionally render additional info -->
      <div v-if="showMore" class="ui teal segment more-info">
        <p><i class="rocket icon"></i> Vue.js is so hard!</p>
        <p><i class="book icon"></i> Learning: Web 2 & Information Visualization</p>
      </div>

      <!-- Display random fun fact -->
      <div v-if="currentFact" class="ui yellow message fact-message">
        <i class="info icon"></i>
        {{ currentFact }}
      </div>

      <!-- Personal Avatar -->
      <div class="image-container">
        <img :src="trongflat" alt="HuuTrong" class="trong-logo" />
      </div>
    </div>
  </div>
</template>

<script>
// Import avatar image
import trongflat from '../assets/TrongFlat.png';

export default {
  name: 'AboutMe',
  data() {
    return {
      showMore: false, // Controls visibility of extra info
      facts: [
        "I built my first webpage when I finished this course.",
        "I enjoy coding at night with lo-fi music.",
        "My dream is to become a full-stack developer.",
        "Vue is my favorite frontend framework!",
      ],
      currentFact: '', // Stores selected fact
      likes: 0, // Like counter
      trongflat // Image source for avatar
    };
  },
  methods: {
    // Randomly select a fun fact
    generateFact() {
      const randomIndex = Math.floor(Math.random() * this.facts.length);
      this.currentFact = this.facts[randomIndex];
    },
  },
};
</script>

<style scoped>
/* Layout styling */
.about-container {
  padding: 40px 20px;
  background: #f9f9f9;
  min-height: 100vh;
}

/* Card design */
.about-card {
  max-width: 700px;
  margin: auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

/* Button group styling */
.ui.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
}

/* Extra info box */
.more-info {
  background-color: #e0f7fa;
  font-size: 1.1em;
}

/* Fun fact styling */
.fact-message {
  font-size: 1.1em;
  margin-top: 15px;
}

/* Avatar styling */
.image-container {
  text-align: center;
  margin-top: 40px;
}

.trong-logo {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #21ba45;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
}

.trong-logo:hover {
  transform: scale(1.07);
}
</style>
