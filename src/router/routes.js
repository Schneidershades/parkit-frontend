import auth from './middleware/auth'
import admin from './middleware/admin'
import login from './middleware/login'
import isWeb from './middleware/isWeb'
import isElectron from './middleware/isElectron'
import authCheckout from './middleware/authCheckout'
import websiteAuth from './middleware/websiteAuth'
import desktopAuth from './middleware/desktopAuth'


const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', 
        name:'home', 
        component: () => import('pages/Website/Index.vue'),
        meta: {
          // middleware:[
          //   isWeb
          // ]
        },
      }
    ]
  },

  {
    path: '/cart',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', 
        component: () => import('pages/Website/Cart.vue'),
        meta: {
          // middleware:[
          //   authCheckout
          // ]
        },
      }
    ]
  },

  {
    path: '/home-service',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', 
        name: 'homeService',
        component: () => import('pages/Website/HomeService.vue'),
      }
    ]
  },

  {
    path: '/parkit-corporate',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', 
        name: 'corporate',
        component: () => import('pages/Website/Corporate.vue'),
      }
    ]
  },
  {
    path: '/parkit-franchise',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', 
        name: 'franchise', 
        component: () => import('pages/Website/Franchise.vue'),
      }
    ]
  },

  {
    path: '/gallery',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', 
        name: 'gallery', 
        component: () => import('pages/Website/Gallery.vue'),
      }
    ]
  },
  {
    path: '/user/forgot-password',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', 
        name: 'forgot-password', 
        component: () => import('pages/User/ForgotPassword.vue'),
      }
    ]
  },





  // Users 
  {
    path: '/user/dashboard',
    component: () => import('layouts/User.vue'),

    children: [
      { 
        path: '', 
        name: 'userDashboard',  
        component: () => import('pages/User/Dashboard.vue'),  
        meta: {
          middleware:[
            websiteAuth,
            // admin
          ]
        },
      }
    ]
  },

  {
    path: '/user/profile',
    component: () => import('layouts/User.vue'),
    children: [
      { path: '', 
        name: 'userProfile',  
        component: () => import('pages/User/Profile.vue'), 
        meta: {
          middleware:[
            websiteAuth,
            // admin
          ]
        },
      }
    ]
  },

  {
    path: '',
    component: () => import('layouts/Payment.vue'),
    children: [
      { 
        path: '/user/order/payment/:orderId/transaction', 
        name: 'payementTransaction', 
        component: () => import('pages/User/PaymentSuccess.vue'), 
        meta: {
          // middleware:[
          //   websiteAuth
          // ]
        },
        props: true,  
      },
      { 
        path: '/user/order/payment/success', 
        name: 'payementSuccess', 
        component: () => import('pages/User/PaymentSuccess.vue'), 
        meta: {
          // middleware:[
          //   websiteAuth
          // ]
        },  
      },
      { 
        path: '/user/order/payment/failed', 
        name: 'payementFailed', 
        component: () => import('pages/User/PaymentFailed.vue'), 
        meta: {
          // middleware:[
          //   websiteAuth
          // ]
        },  
      },
    ]
  },

  {
    path: '/user/orders',
    component: () => import('layouts/User.vue'),
    children: [
      { 
        path: '', 
        name: 'userOrders',  
        component: () => import('pages/User/Orders.vue'), 
        meta: {
          middleware:[
            websiteAuth,
            // admin
          ]
        },  
      },
      
      { 
        path: '/user/order/:orderId',
        name: 'userOrderShow',  
        component: () => import('pages/User/OrderDetails.vue'), 
        meta: {
          middleware:[
            websiteAuth,
            // admin
          ]
        },
        props: true,
      },
      { 
        path: '/user/order/payment/response',
        name: 'userOrderPayment',  
        component: () => import('pages/User/Payment.vue'), 
        meta: {
          middleware:[
            websiteAuth,
            // admin
          ]
        },
      }
    ]
  },

  {
    path: '/user/security',
    component: () => import('layouts/User.vue'),
    children: [
      { path: '', 
        name: 'userSecurity', 
        component: () => import('pages/User/Security.vue'), 
        meta: {
          middleware:[
            websiteAuth,
            // admin
          ]
        },
      }
    ]
  },
  {
    path: '/user/cart',
    component: () => import('layouts/User.vue'),
    children: [
      { path: '', 
        name: 'userCart',  
        component: () => import('pages/User/Cart.vue'), 
        meta: {
          middleware:[
            websiteAuth,
            // admin
          ]
        },
      }
    ]
  },
  {
    path: '/user/checkout',
    component: () => import('layouts/User.vue'),
    children: [
      { path: '', 
        name: 'userCheckout', 
        component: () => import('pages/User/Checkout.vue'),
        meta: {
          middleware:[
            websiteAuth,
            // admin
          ]
        },
      }
    ]
  },




  // admin
  {
    path: '/admin/login',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', 
        name: 'adminLogin', 
        component: () => import('pages/Admin/Login.vue'),
        meta: {
          middleware:[
            // isElectron
          ]
        },
      }
    ]
  },

  {
    path: '/admin/dashboard',
    component: () => import('layouts/Admin.vue'),

    children: [
      { path: '', 
        name: 'adminDashboard', 
        component: () => import('pages/Admin/Dashboard.vue'),
        meta: {
          middleware:[
            websiteAuth,
            // isElectron,
            // desktopAuth
          ]
        },
      }
    ]
  },

  {
    path: '/admin/invoice',
    component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', 
        name: 'admin-invoice', 
        component: () => import('pages/Admin/Invoice.vue'),
        meta: {
          // middleware:[
          //   // isElectron,
          //   // desktopAuth
          // ]
        },
      }
    ]
  },
  {
    path: '/admin/history',
    component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', 
        name: 'admin-history', 
        component: () => import('pages/Admin/History.vue'),
        meta: {
          // middleware:[
            
          // ]
        },
      }
    ]
  },
  {
    path: '/admin/inbox',
    component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', 
        name: 'admin-inbox', 
        component: () => import('pages/Admin/Inbox.vue'),
        meta: {
          // middleware:[
            
          // ]
        },
      }
    ]
  },
  {
    path: '/admin/online/transactions',
    component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', 
        name: 'admin-online-transactions', 
        component: () => import('pages/Admin/OnlineTransaction.vue'),
        meta: {
          // middleware:[
            
          // ]
        },
      }
    ]
  },
  {
    path: '/admin/personnel/requests',
    component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', 
        name: 'admin-personnel-requests', 
        component: () => import('pages/Admin/PersonnelRequests.vue'),
        meta: {
          // middleware:[
            
          // ]
        },
      }
    ]
  },
  {
    path: '/admin/purchase/order',
    component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', 
        name: 'admin-purchase-order', 
        component: () => import('pages/Admin/PurchaseOrder.vue'),
        meta: {
          // middleware:[
            
          // ]
        },
      }
    ]
  },
  {
    path: '/admin/report/fault',
    component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', 
        name: 'admin-report-fault', 
        component: () => import('pages/Admin/ReportFault.vue'),
        meta: {
          // middleware:[
            
          // ]
        },
      }
    ]
  },
  {
    path: '/admin/requisition/order',
    component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', 
        name: 'admin-requisition-order', 
        component: () => import('pages/Admin/RequisitionOrder.vue'),
      }
    ]
  },
  {
    path: '/admin/suggestions/complaints',
    component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', 
        name: 'admin-suggestions-complaints', 
        component: () => import('pages/Admin/SuggestionsComplaints.vue'),
        meta: {
          // middleware:[
            
          // ]
        },
      }
    ]
  },
  {
    path: '/admin/camera/feed',
    component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', 
        name: 'admin-camera-feed', 
        component: () => import('pages/Admin/CameraFeed.vue'),
        meta: {
          // middleware:[
            
          // ]
        },
      }
    ]
  },
  {
    path: '/admin/account',
    component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', 
        name: 'admin-account', 
        component: () => import('pages/Admin/Account/Account.vue'),
        meta: {
          // middleware:[
            
          // ]
        },
      },
      { 
        path: '/admin/account/location/:locationId',
        name: 'accountLocationShow',  
        component: () => import('pages/Admin/Account/Location.vue'), 
        meta: {
          // middleware:[
          //   websiteAuth,
          //   desktopAuth
          // ]
        },
        props: true,
      },
      { 
        path: '/admin/account/location/:locationId/expense',
        name: 'accountExpenseShow',  
        component: () => import('pages/Admin/Account/Expense.vue'), 
        meta: {
          // middleware:[
          //   websiteAuth,
          //   desktopAuth
          // ]
        },
        props: true,
      },
      { 
        path: '/admin/account/location/:locationId/income',
        name: 'accountIncomeShow',  
        component: () => import('pages/Admin/Account/Income.vue'), 
        meta: {
          // middleware:[
          //   websiteAuth,
          //   desktopAuth
          // ]
        },
        props: true,
      },
    ]
  },

]



// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
