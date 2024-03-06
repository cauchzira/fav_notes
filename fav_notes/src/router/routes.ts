import { RouteRecordRaw } from 'vue-router'
import { FAVOURITE } from '../app/data/page/constants/pages.ts'

import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: HomePage,
  },
  {
    path: `/${FAVOURITE}`,
    name: FAVOURITE,
    component: () => import('../views/FavouritePage.vue'),
  },
] as Array<RouteRecordRaw>

export default routes
