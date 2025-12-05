import { createWebHistory, createRouter } from 'vue-router';

import TrainView from './TrainView.vue';
import TurnoutView from './TurnoutView.vue';
import PowerView from './PowerView.vue';

const routes = [
  {
    path: '/trains',
    component: TrainView,
    alias: ['/'],
  },
  {
    path: '/turnouts',
    component: TurnoutView,
  },
  {
    path: '/power',
    component: PowerView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound', component: () => import('./NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
