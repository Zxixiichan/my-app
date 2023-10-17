import { createRouter, createWebHashHistory } from 'vue-router'
import {AppRouters} from '@router/routes'
import {beforeEach,afterEach } from '@router/guards'
const AppRouter = createRouter({
  history: createWebHashHistory(), //hash模式
  routes: AppRouters
})
AppRouter.beforeEach(beforeEach)
AppRouter.afterEach(afterEach)

export default AppRouter