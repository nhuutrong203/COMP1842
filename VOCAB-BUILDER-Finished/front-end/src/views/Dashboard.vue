<template>
  <div class="dashboard container mt-5">
    <!-- Greeting message for the user -->
    <h2 class="text-center mb-3">👋 Hello, {{ username }}!</h2>

    <!-- Display image of the user -->
    <div class="text-center mb-3">
      <img :src="trongflat" alt="HuuTrong" class="HuuTrong" />
    </div>

    <!-- Motivational quote -->
    <p class="text-center quote">Keep up the good work!</p>

    <!-- Display language cards with word count for each language -->
    <div class="row justify-content-center mt-4">
      <div
        class="col-md-4 mb-4"
        v-for="lang in languageStats"  
        :key="lang.name"
      > 
        <div
          class="card text-center word-card"
          :class="lang.name"
          @click="goToWords(lang.name)" 
          style="cursor: pointer"
        >
          <div class="card-body">
            <!-- Display language flag -->
            <div class="flag-icon mb-2">
              <img :src="getFlagSrc(lang.name)" class="flag-img" />
            </div>
            <!-- Display language name and corresponding emoji -->
            <h5 class="card-title">
              {{ getEmoji(lang.name) }} {{ lang.label }}
            </h5>
            <!-- Display word count for each language -->
            <p class="word-count">{{ lang.count }} words</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';  // Import API helper to fetch words
import trongflat from '../assets/TrongFlat.png';  // Import image for user display

export default {
  name: 'Dashboard',
  data() {
    return {
      username: '',  // Store username for greeting
      languageStats: [],  // Array to hold statistics of words per language
      trongflat  // Image for user display
    };
  },
  async created() {
    try {
      // Fetch words from the API and calculate stats for each language
      const words = await api.getWords();

      // Populate languageStats array with word count per language
      this.languageStats = [
        {
          name: 'english',
          label: 'English',
          count: words.filter(w => w.english?.trim()).length
        },
        {
          name: 'german',
          label: 'German',
          count: words.filter(w => w.german?.trim()).length
        },
        {
          name: 'vietnamese',
          label: 'Vietnamese',
          count: words.filter(w => w.vietnamese?.trim()).length
        }
      ];

      // Get username from localStorage or set default as 'Guest'
      this.username = localStorage.getItem('username') || 'Guest';
    } catch (err) {
      // Handle any errors during the API call
      console.error('Dashboard load failed:', err);
    }
  },
  methods: {
    // Get the flag URL for each language
    getFlagSrc(lang) {
      switch (lang) {
        case 'english':
          return 'https://flagcdn.com/w80/gb.png';
        case 'german':
          return 'https://flagcdn.com/w80/de.png';
        case 'vietnamese':
          return 'https://flagcdn.com/w80/vn.png';
        default:
          return '';
      }
    },
    // Get the emoji for each language
    getEmoji(lang) {
      switch (lang) {
        case 'english':
          return '📘';
        case 'german':
          return '🎯';
        case 'vietnamese':
          return '🎓';
        default:
          return '';
      }
    },
    // Navigate to the words page with the selected language
    goToWords(lang) {
      this.$router.push({ path: '/words', query: { lang: lang } });
    }
  }
};
</script>

<style scoped>
/* Styling for the greeting message */
h2 {
  font-weight: bold;
  color: #1cb0f6;
}

/* Styling for user image (circular and shadow effect) */
.HuuTrong {
  width: 120px;
  height: auto;
  margin-bottom: 10px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s;
}

.HuuTrong:hover {
  transform: scale(1.05);  /* Hover effect for image scaling */
}

/* Styling for the motivational quote */
.quote {
  font-size: 1.1rem;
  color: #777;
  margin-bottom: 30px;
  font-style: italic;
}

/* Styling for the language cards */
.word-card {
  border-radius: 15px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, background-color 0.2s;
}

.word-card:hover {
  transform: translateY(-6px);  /* Hover effect for card lift */
}

/* Styling for each language card on hover */
.word-card.english:hover {
  background-color: #e3f2fd;
}

.word-card.german:hover {
  background-color: #fff3cd;
}

.word-card.vietnamese:hover {
  background-color: #e6ffed;
}

/* Styling for flag images */
.flag-icon {
  margin-bottom: 10px;
}

.flag-img {
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* Styling for the language card titles */
.card-title {
  font-weight: bold;
  font-size: 1.3rem;
  color: #333;
}

/* Styling for the word count text */
.word-count {
  font-size: 1.5rem;
  font-weight: bold;
  color: #58cc02;
}
</style>
