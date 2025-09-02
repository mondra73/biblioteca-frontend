import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { createPinia } from 'pinia'
import ModalExitoView from './components/ModalExitoView.vue'
import ModalDetalleLibroView from './components/ModalDetalleLibroView.vue'
import ModalEditarLibroView from './components/ModalEditarLibroView.vue'
import ModalConfirmacionView from './components/ModalConfirmacionView.vue'
import ModalDetallePeliculaView from './components/ModalDetallePeliculaView.vue'
import ModalEditarPeliculaView from './components/ModalEditarPeliculaView.vue'

import './assets/main.css'

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

app.mount('#app')
