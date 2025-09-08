import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { initializeApp } from 'firebase/app'
import { createPinia } from 'pinia'

import ModalExitoView from './components/ModalExitoView.vue'
import ModalDetalleLibroView from './components/ModalDetalleLibroView.vue'
import ModalEditarLibroView from './components/ModalEditarLibroView.vue'
import ModalConfirmacionView from './components/ModalConfirmacionView.vue'
import ModalDetallePeliculaView from './components/ModalDetallePeliculaView.vue'
import ModalEditarPeliculaView from './components/ModalEditarPeliculaView.vue'
import ModalDetalleSerieView from './components/ModalDetalleSerieView.vue'
import ModalEditarSerieView from './components/ModalEditarSerieView.vue'
import ModalDetallePendienteView from './components/ModalDetallePendienteView.vue'
import ModalEditarPendienteView from './components/ModalEditarPendienteView.vue'
import ModalAgregarLibroView from './components/ModalAgregarLibroView.vue'
import ModalAgregarPeliculaView from './components/ModalAgregarPeliculaView.vue'
import ModalAgregarSerieView from './components/ModalAgregarSerieView.vue'

import './assets/main.css'

const firebaseConfig = {
  apiKey: 'AIzaSyCvjsELbAVDZE6DfsbT8exczI3ias9S9us',
  authDomain: 'biblioteca-multimedia-faaae.firebaseapp.com',
  projectId: 'biblioteca-multimedia-faaae',
  storageBucket: 'biblioteca-multimedia-faaae.firebasestorage.app',
  messagingSenderId: '1011569682793',
  appId: '1:1011569682793:web:da4d7963dc600ddeedf5f8',
  measurementId: 'G-P3J1CF0ZV5',
}

initializeApp(firebaseConfig)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.component('ModalExitoView', ModalExitoView)
app.component('ModalDetalleLibro', ModalDetalleLibroView)
app.component('ModalEditarLibro', ModalEditarLibroView)
app.component('ModalConfirmacion', ModalConfirmacionView)
app.component('ModalDetallePelicula', ModalDetallePeliculaView)
app.component('ModalEditarPelicula', ModalEditarPeliculaView)
app.component('ModalDetalleSerie', ModalDetalleSerieView)
app.component('ModalEditarSerie', ModalEditarSerieView)
app.component('ModalDetallePendiente', ModalDetallePendienteView)
app.component('ModalEditarPendiente', ModalEditarPendienteView)
app.component('ModalAgregarLibro', ModalAgregarLibroView)
app.component('ModalAgregarPelicula', ModalAgregarPeliculaView)
app.component('ModalAgregarSerie', ModalAgregarSerieView)

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("Service Worker registrado con éxito:", registration);
      })
      .catch((error) => {
        console.log("Error al registrar el Service Worker:", error);
      });
  });
}

app.mount('#app')
