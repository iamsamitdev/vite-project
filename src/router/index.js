import { createRouter, createWebHistory } from 'vue-router'

// Import Frontend Layout
import FrontendLayout from '@/layouts/Frontend.vue'
// Import Backend Layout
import BackendLayout from '@/layouts/Backend.vue'

// Import Frontend Page
import Home from '../views/frontend/Home.vue'
import About from '../views/frontend/About.vue'
import Portfolio from '../views/frontend/Portfolio.vue'
import Service from '../views/frontend/Service.vue'
import Contact from '../views/frontend/Contact.vue'
import Register from '../views/frontend/Register.vue'
import Login from '../views/frontend/Login.vue'
import ForgotPassword from '@/views/frontend/ForgotPassword.vue'

// Import Backend Page
import Dashboard from '../views/backend/Dashboard.vue'
import Product from '../views/backend/Product.vue'

// 404
import NotFound404 from '../views/NotFound404.vue'

// สร้างฟังก์ชันสำหรับ Route Guard
function authGuard(to, from, next){
  
  // อ่าน token จาก localStorage
  let token = ''

  try{
    let userStorage = localStorage.getItem('user')
    let userStorageJSON = userStorage && JSON.parse(userStorage)
    token = userStorage && userStorageJSON['token']
    if(token){
      next()
    }else{
      next({name: 'Login'})
    }
  }catch(error){
    console.log(error);
  }

}

const routes = [
  {
    path: '/',
    component: FrontendLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          title: 'หน้าหลัก',
          description: 'หน้าหลักระบบร้องเรียน'
        }
      }
    ],
  },
  {
    path: '/about',
    component: FrontendLayout,
    children: [
      {
        path: '',
        name: 'About',
        component: About,
        meta: {
          title: 'เกี่ยวกับเรา',
          description: 'รายละเอียดหน้าเกี่ยวกับเรา'
        }
      }
    ],
  },
  {
    path: '/portfolio',
    component: FrontendLayout,
    children: [
      {
        path: '',
        name: 'Portfolio',
        component: Portfolio,
        meta: {
          title: 'ผลงานของเรา',
          description: 'รายละเอียดหน้าผลงานของเรา'
        }
      },
    ],
  },
  {
    path: '/service',
    component: FrontendLayout,
    children: [
      {
        path: '',
        name: 'Service',
        component: Service,
        meta: {
          title: 'บริการของเรา',
          description: 'รายละเอียดหน้าบริการของเรา'
        }
      }
    ],
  },
  {
    path: '/contact',
    component: FrontendLayout,
    children: [
      {
        path: '',
        name: 'Contact',
        component: Contact,
        meta: {
          title: 'ติดต่อเรา',
          description: 'รายละเอียดหน้าติดต่อเรา'
        }
      },
    ],
  },
  {
    path: '/register',
    component: FrontendLayout,
    children: [
      {
        path: '',
        name: 'Register',
        component: Register,
        meta: {
          title: 'สมัครสมาชิก',
          description: 'รายละเอียดหน้าสมัครสมาชิก'
        }
      }
    ],
  },
  {
    path: '/login',
    component: FrontendLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: Login,
        meta: {
          title: 'เข้าสู่ระบบ',
          description: 'รายละเอียดหน้าเข้าสู่ระบบ'
        }
      }
    ],
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: FrontendLayout,
    children: [
      {
        path: '',
        component: ForgotPassword
      }
    ]
  },

  // BACKEND ROUTING
  {
    path: '/backend',
    component: BackendLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          title: 'แดชบอร์ด',
          description: 'รายละเอียดหน้าแดชบอร์ด'
        },
        beforeEnter: authGuard
      }
    ]
  },
  {
    path: '/backend',
    component: BackendLayout,
    children: [
      {
        path: 'products',
        name: 'Products',
        component: Product,
        meta: {
          title: 'สินค้า',
          description: 'รายละเอียดหน้าสินค้า'
        },
        beforeEnter: authGuard
      }
    ]
  },

  // Error 404
  {
    path: "/:catchAll(.*)",
    component: NotFound404,
  }
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router