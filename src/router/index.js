import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/HomeComp.vue';
import SlideComp from '../views/SlideComp.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/slide/:id',
    name: 'Slide',
    component: SlideComp,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
