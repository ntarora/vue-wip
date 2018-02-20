<template>
  <div class="card-grid">
    <template v-for="stock in stockData">
      <cards class="cards" :symbol="stock"></cards>
    </template>
  </div>
</template>

<script>
import Cards from './Cards.vue';

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
    window.addEventListener('add-card', (e) => {
      const sym = e.detail;
      const index = this.stockData.findIndex(item => item === sym);
      if (index === -1) {
        this.stockData.push(sym);
      } else {
        const h = this.$createElement;
        this.$notify({
          title: 'Duplicate',
          message: h('i', { style: 'color: grey' }, 'Duplicate symbol, please add card with a unique symbol'),
          type: 'warning',
        });
      }
    });
    window.addEventListener('delete-card', (e) => {
      const sym = e.detail;
      const index = this.stockData.findIndex(item => item === sym);
      this.stockData.splice(index, 1);
    });
    window.addEventListener('error-card', (e) => {
      const sym = e.detail;
      const index = this.stockData.findIndex(item => item === sym);
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
