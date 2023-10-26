import { createApp } from 'vue'
import Notifications from '@kyvg/vue3-notification'

import App from './App.vue'
import store, { key } from './store'
import router from './router'


import globalSettings from './mixins/globalSettings'
import { devtools } from './devtools'

import './scss/main.scss'
import KProgress from 'k-progress-v3';

const app = createApp( App )
app.mixin( globalSettings )
app.use( devtools )
app.component('k-progress', KProgress)
app.use( router )
app.use( Notifications )
app.use( store, key )
app.mount( "#app" )