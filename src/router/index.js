import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../../views/HomeView.vue'
import LoginView from '../components/LoginView.vue'
import RegisterView from '../components/RegisterView.vue'
import OlvidePasswordView from '../components/OlvidePasswordView.vue'
import NuevoPasswordView from '../components/NuevoPasswordView.vue'
import ConfirmaUserView from '../components/ConfirmaUserView.vue'
import DashboardView from '../components/DashboardView.vue'
import LibrosView from '../components/LibrosView.vue'
import PeliculasView from '../components/PeliculasView.vue'
import SeriesView from '../components/SeriesView.vue'
import MiListaView from '../components/MiListaView.vue'
import EstadisticasView from '../components/EstadisticasView.vue'
import ContactoView from '../components/ContactoView.vue'
import NotFoundView from '../components/NotFoundView.vue'
import AuthCallback from '../components/AuthCallback.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/olvide-password', name: 'olvide-password', component: OlvidePasswordView },
    { path: '/nuevo-password/:email?/:token?', name: 'nuevo-password', component: NuevoPasswordView, props: true },
    { path: '/confirmar/:mail/:token', name: 'confirma', component: ConfirmaUserView, props: true },
     { path: '/auth-callback', name: 'auth-callback', component: AuthCallback },
    { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } },
    { path: '/libros', name: 'libros', component: LibrosView, meta: { requiresAuth: true } },
    { path: '/peliculas', name: 'peliculas', component: PeliculasView, meta: { requiresAuth: true } },
    { path: '/series', name: 'series', component: SeriesView, meta: { requiresAuth: true } },
    { path: '/mi-lista', name: 'mi-lista', component: MiListaView, meta: { requiresAuth: true } },
    { path: '/estadisticas', name: 'estadisticas', component: EstadisticasView, meta: { requiresAuth: true } },
    { path: '/contacto', name: 'contacto', component: ContactoView },
    { path: '/:pathMatch(.*)*', component: NotFoundView }
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('auth-token') !== null

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirigir al login si la ruta requiere autenticación y el usuario no está autenticado
    next('/login')
  } else {
    // Continuar con la navegación
    next()
  }
})

export default router
