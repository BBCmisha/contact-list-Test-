import Vue from 'vue'
import VueRouter from 'vue-router'
import ContactList from '../views/contact-list.vue'
import ContactInfo from '../views/contact-info.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'contact-list',
    component: ContactList
  },
  {
    path: '/info/:id',
    name: 'contact-info',
    component: ContactInfo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
