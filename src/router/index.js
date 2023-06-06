import { createRouter, createWebHistory } from 'vue-router'
//Middleware
import auth from '../middleware/auth'
import log from '../middleware/log.js'

//View
import Login from '../views/Auth/Login.vue'
import User from '../views/User/Index.vue'
import CreateUser from '../views/User/Create.vue'
import EditUser from '../views/User/Edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: (to) => {
        return 'user'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: {
        middleware: [auth]
      }
    },
    {
      path: '/user/create',
      name: 'user.create',
      component: CreateUser,
      meta: {
        middleware: [auth]
      }
    },
    {
      path: '/user/edit/:id',
      name: 'user.edit',
      component: EditUser,
      meta: {
        middleware: [auth]
      }
    }
  ]
})

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters)
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]

    const context = {
      from,
      next,
      router,
      to
    }
    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({ ...context, next: nextMiddleware })
  }

  return next()
})

export default router
