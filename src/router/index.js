import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewRequest from '../components/NewRequest.vue'
import RequestList from '../components/RequestList.vue'
import RequestEdit from '../components/RequestEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/newRequest',
      name: 'newrequest',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NewRequestView.vue')
    },
    {
      path: '/requestList',
      name: 'requestlist',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RequestListView.vue')
    },
    {
      path: '/requestEdit',
      name: 'requestedit',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RequestEditView.vue')
    }
    
  ]
})

export default router
