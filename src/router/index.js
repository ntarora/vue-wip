import Vue from 'vue';
import Router from 'vue-router';
import Card from '@/components/Cards';
import Dashboard from '@/components/Dashboard';

Vue.use(Router);
Vue.use(Card);
Vue.use(Dashboard);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'card',
      component: Dashboard,
    },
  ],
});
