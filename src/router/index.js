import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Adicionar from '@/components/Adicionar'
import Editar from '@/components/Editar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/adicionar',
      name: 'Adicionar',
      component: Adicionar
    },

    {
      path: '/editar',
      name: 'Editar',
      component: Editar
    }
  ]
})
