<template>
  <div class="card-grid">
    <template v-for="stock in stockData">
      <cards class="cards" :symbol="stock"></cards>
    </template>
  </div>
</template>

<script>
import Cards from './Cards.vue';
import { EventBus } from '../store/event_bus.js';
export default {
  name: 'Dashboard',
  components: {
    Cards,
  },
  data() {
    return {
      stockData: [],
    };
  },
  created() {
    EventBus.$on('add-card', e => {
      const index = this.stockData.findIndex(item => item === e);
      if (index === -1) {
        this.stockData.push(e);
      } else {
        const h = this.$createElement;
        this.$notify({
          title: 'Duplicate',
          message: h('i', { style: 'color: grey' }, 'Duplicate symbol, please add card with a unique symbol'),
          type: 'warning',
        });
      }
    });
    EventBus.$on('delete-card', e => {
      const index = this.stockData.findIndex(item => item === e);
      this.stockData.splice(index, 1);
    });
   EventBus.$on('error-card', e => {
      const index = this.stockData.findIndex(item => item === e.symbol);
      this.stockData.splice(index, 1);
      const h = this.$createElement;
      this.$notify({
        title: 'Error',
        message: h('i', { style: 'color: grey' }, 'Error with symbol, please add card with a real symbol'),
        type: 'error',
      });
    });
  },
};
</script>


<style>
  .card-grid {
    display: grid;
    justify-content: center;
    grid-auto-rows: 400px;
    grid-template-columns: 80%;
    grid-gap: 20px;
  }
</style>
