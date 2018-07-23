import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Todo from './views/Todo.vue'
import Today from './views/Today.vue'
import AddTodo from './views/AddTodo.vue'
import GSignInButton from 'vue-google-signin-button'

Vue.use(Router)
Vue.use(GSignInButton)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/todo',
      name: 'todo',
      component: Todo
    },
    {
      path: '/today',
      name: 'today',
      component: Today
    },
    {
      path: '/add',
      name: 'addTodo',
      component: AddTodo
    }
  ]
})
