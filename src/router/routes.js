import auth from './middleware/auth'
import login from './middleware/login'
import isWeb from './middleware/isWeb'
import isElectron from './middleware/isElectron'
import authCheckout from './middleware/authCheckout'
import websiteAuth from './middleware/websiteAuth'
import desktopAuth from './middleware/desktopAuth'


const routes = [
  {
    path: '/',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', 
        name:'home', 
        component: () => import('pages/Admin/Login.vue'),
        meta: {
          middleware:[
            isWeb
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
            isElectron
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
            isElectron,
            desktopAuth
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
          middleware:[
            isElectron,
            desktopAuth
          ]
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
          middleware:[
            isElectron,
            desktopAuth
          ]
        },
      }
    ]
  },
  {
    path: '/admin/recent',
    component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', 
        name: 'admin-recent', 
        component: () => import('pages/Admin/RecentTransactions.vue'),
        meta: {
          middleware:[
            isElectron,
            desktopAuth
          ]
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
          middleware:[
            isElectron,
            desktopAuth
          ]
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
          middleware:[
            isElectron,
            desktopAuth
          ]
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
          middleware:[
            isElectron,
            desktopAuth
          ]
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
          middleware:[
            isElectron,
            desktopAuth
          ]
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
          middleware:[
            isElectron,
            desktopAuth
          ]
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
          middleware:[
            isElectron,
            desktopAuth
          ]
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
          middleware:[
            isElectron,
            desktopAuth
          ]
        },
      }
    ]
  },

  {
    path: '/admin/roles',
    component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', 
        name: 'admin-roles', 
        component: () => import('pages/Admin/Roles/Roles.vue'),
        meta: {
          middleware:[
            isElectron,
            desktopAuth
          ]
        },
      }
    ]
  },
  {
    path: '/admin/locations',
    component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', 
        name: 'admin-locations', 
        component: () => import('pages/Admin/Locations/Locations.vue'),
        meta: {
          middleware:[
            isElectron,
            desktopAuth
          ]
        },
      },
    ]
  },
  {
    path: '/admin/users',
    component: () => import('layouts/Admin.vue'),
    children: [
      { path: '', 
        name: 'admin-users', 
        component: () => import('pages/Admin/Users/Users.vue'),
        meta: {
          middleware:[
            isElectron,
            desktopAuth
          ]
        },
      },
      { path: '/admin/users/location/:locationId', 
        name: 'admin-users-location', 
        component: () => import('pages/Admin/Users/Location.vue'),
        meta: {
          middleware:[
            isElectron,
            desktopAuth
          ]
        },
      },
      { path: '/admin/users/location/:userId/roles/permissions', 
        name: 'admin-users-roles-permissions', 
        component: () => import('pages/Admin/Users/RolesPermissions.vue'),
        meta: {
          middleware:[
            isElectron,
            desktopAuth
          ]
        },
        props: true,
      },
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
          middleware:[
            isElectron,
            desktopAuth
          ]
        },
      },
      { 
        path: '/admin/account/location/:locationId',
        name: 'accountLocationShow',  
        component: () => import('pages/Admin/Account/Location.vue'), 
        meta: {
          middleware:[
            websiteAuth,
            desktopAuth
          ]
        },
        props: true,
      },
      { 
        path: '/admin/account/location/expense/:locationId',
        name: 'accountExpenseShow',  
        component: () => import('pages/Admin/Account/Expense.vue'), 
        meta: {
          middleware:[
            websiteAuth,
            desktopAuth
          ]
        },
        props: true,
      },
      { 
        path: '/admin/account/location/income/:locationId',
        name: 'accountIncomeShow',  
        component: () => import('pages/Admin/Account/Income.vue'), 
        meta: {
          middleware:[
            websiteAuth,
            desktopAuth
          ]
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
