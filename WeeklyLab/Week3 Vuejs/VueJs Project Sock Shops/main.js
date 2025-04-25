var eventBus = new Vue()

Vue.component('product-details', {
  props: ['details'],
  template: `
    <ul> 
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
});

Vue.component('product', {
  props: ['premium', 'link'],
  template: `
    <div class="product"> 
      <div class="product-image">
        <img :src="image" :alt="altText">
      </div>

      <div class="product-info">        
        <h1>{{ title }}</h1>

        <a :href="link" target="_blank">More products like this</a>

        <p v-if="inStock > 10">In stock</p>
        <p v-else-if="inStock <= 10 && inStock > 0">Almost out of stock</p>
        <p v-else>Out of stock</p>

        <p>{{ sale }}</p>
        <p>User is premium: {{ premium }}</p>

        <info-tabs :shipping="shipping" :details="details"></info-tabs>

        <p v-show="onSale">On Sale!</p>

        <div class="color-box"
            v-for="(variant, index) in variants" 
            :key="variant.variantID"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)">
        </div>

        <h1>Available Size</h1>
        <ul>
          <li v-for="size in sizes">{{ size }}</li>
        </ul>

        <button @click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">Add to Cart</button>
        <button @click="removeFromCart">Remove from Cart</button>
      </div>

      <product-tabs :reviews="reviews"></product-tabs>
    </div>
  `,
  data() {
    return {
      product: 'Socks',
      brand: 'Adidas',
      description: 'A pair of warm fuzzy socks',
      altText: 'cool socks',
      selectedVariant: 0,
      onSale: true,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      sizes: ["S", "M", "L"],
      variants: [
        {
          variantID: 2234,
          variantColor: "green",
          variantImage: "./assets/images/socks_green.jpg",
          variantQuantity: 10
        },
        {
          variantID: 2235,
          variantColor: "blue",
          variantImage: "./assets/images/socks_blue.jpg",
          variantQuantity: 0
        }
      ],
      reviews: []
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantID)
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantID)
    },
    updateProduct(index) {
      this.selectedVariant = index
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    shipping() {
      return this.premium ? "Free" : "3.00$"
    },
    sale() {
      return this.onSale ? this.brand + ' ' + this.product + ' are on sale!' : this.brand + ' ' + this.product + ' are not on sale'
    }
  },
  mounted() {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview)
    })
  }
});

Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
      <p class="errors" v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <p><label for="name">Name:</label><input id="name" v-model="name" placeholder="name"></p>
      <p><label for="review">Review:</label><textarea id="review" v-model="review"></textarea></p>
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option><option>4</option><option>3</option><option>2</option><option>1</option>
        </select>
      </p>
      <p>Would you recommend this product?</p>
      <label>Yes <input type="radio" value="Yes" v-model="recommend" /></label>
      <label>No <input type="radio" value="No" v-model="recommend" /></label>
      <p><input type="submit" value="Submit"></p>
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      this.errors = []
      if (this.name && this.review && this.rating && this.recommend) {
        eventBus.$emit('review-submitted', {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        })
        this.name = this.review = this.rating = this.recommend = null
      } else {
        if (!this.name) this.errors.push("Name required.")
        if (!this.review) this.errors.push("Review required.")
        if (!this.rating) this.errors.push("Rating required.")
        if (!this.recommend) this.errors.push("Recommendation required.")
      }
    }
  }
});

Vue.component('product-tabs', {
  props: ['reviews'],
  template: `
    <div>    
      <ul>
        <span class="tab" 
              :class="{ activeTab: selectedTab === tab}"
              v-for="(tab, index) in tabs" 
              @click="selectedTab = tab">{{ tab }}</span>
      </ul> 
      <div v-show="selectedTab === 'Reviews'">
          <h2>Reviews</h2>
          <p v-if="!reviews.length">There are no reviews yet.</p>
          <ul>
              <li v-for="(review, index) in reviews" :key="index">
                  <p><strong>Name:</strong> {{ review.name }}</p>
                  <p><strong>Rating:</strong> {{ review.rating }}</p>
                  <p><strong>Review:</strong> {{ review.review }}</p>
                  <p><strong>Recommend:</strong> {{ review.recommend }}</p>
              </li>
          </ul>
      </div>
      <product-review v-show="selectedTab === 'Make a Review'"></product-review> 
    </div>
  `,
  data() {
    return {
      tabs: ['Reviews', 'Make a Review'],
      selectedTab: 'Reviews'
    }
  }
});

Vue.component('info-tabs', {
  props: ['shipping', 'details'],
  template: `
    <div>    
      <ul>
        <span class="tab" 
              :class="{ activeTab: selectedTab === tab}"
              v-for="(tab, index) in tabs" 
              @click="selectedTab = tab">{{ tab }}</span>
      </ul> 
      <div v-show="selectedTab === 'Shipping'"><p>{{ shipping }}</p></div>
      <div v-show="selectedTab === 'Details'">
        <ul><li v-for="detail in details">{{ detail }}</li></ul>
      </div>
    </div>
  `,
  data() {
    return {
      tabs: ['Shipping', 'Details'],
      selectedTab: 'Shipping'
    }
  }
});

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: [],
    link: 'https://www.adidas.com.vn/vi/tat-the-thao-co-cao-co-dem/HT3444.html'
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    removeFromCart(id) {
      for (let i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
          this.cart.splice(i, 1)
        }
      }
    }
  }
});





