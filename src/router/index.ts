import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import SchoolView from '../views/SchoolView.vue'
import ClassView from '../views/ClassView.vue'      // Halaman baru
import ReportView from '../views/ReportView.vue'    // Halaman baru

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/profile', name: 'profile', component: ProfileView },
    { path: '/school', name: 'school', component: SchoolView },
    { path: '/class', name: 'class', component: ClassView },
    { path: '/report', name: 'report', component: ReportView },
    { path: '/gallery', name: 'gallery', component: () => import('../views/GalleryView.vue') }
  ]
})

export default router