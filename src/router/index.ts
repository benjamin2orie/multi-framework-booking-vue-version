import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../pages/LandingPage.vue';
import Login from '../pages/Login.vue';
import Signup from '../pages/Signup.vue';
import Dashboard from '../pages/Dashboard.vue';
import TicketManager from '../pages/TicketManager.vue';
import { isAuthenticated } from '../utils/auth';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const requireAuth = (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  isAuthenticated() ? next() : next('/auth/login');
};


const routes = [
  { path: '/', component: LandingPage },
  { path: '/auth/login', component: Login },
  { path: '/auth/signup', component: Signup },
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: requireAuth,
  },
  {
    path: '/tickets',
    component: TicketManager,
    beforeEnter: requireAuth,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
