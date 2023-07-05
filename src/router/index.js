import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/front',
      name: 'front',
      component: () => import('../views/Front.vue')
    },
    {
      path: '/back',
      name: 'back',
      component: () => import('../views/Back.vue')
    },
    {
      path: '/addQuestion',
      name: 'addQuestion',
      component: () => import('../views/AddQuestion.vue')
    },
    {
      path: '/addSubTitleQuestion',
      name: 'addSubTitleQuestion',
      component: () => import('../views/AddSubTitleQuestion.vue')
    },
    {
      path: '/addAnswerType',
      name: 'addAnswerType',
      component: () => import('../views/AddAnswerType.vue')
    },
    {
      path: '/deleteQuestion',
      name: 'deleteQuestion',
      component: () => import('../views/DeleteQuestion.vue')
    },
    {
      path: '/backBar',
      name: 'backBar',
      component: () => import('../views/BackBar.vue')
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import('../views/Questions.vue')
    },
    {
      path: '/confirmationpage',
      name: 'confirmation-page',
      component: () => import('../views/Questions.vue')
    },
  ]
})

export default router
