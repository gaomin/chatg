import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import socket from './socket'

const app = createApp(App)
app.provide('socket', socket)
app.mount('#app')
