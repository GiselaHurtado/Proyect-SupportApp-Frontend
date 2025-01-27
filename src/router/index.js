import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RequestList from '../components/RequestList.vue'
import RequestEdit from '../components/RequestEdit.vue'
import RequestEditView from '../views/RequestEditView.vue'
import RequestListView from '../views/RequestListView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/newRequest',
    name: 'newrequest',
    component: () => import('../views/NewRequestView.vue')
  },
  {
    path: '/requestList',
    name: 'requestList',
    component: () => import('../views/RequestListView.vue')
  },
  {
    path: '/requestEdit/:id',
    name: 'requestedit',
    component: RequestEdit,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

