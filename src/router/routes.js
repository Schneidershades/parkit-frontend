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
          middleware:[
            isWeb
          ]
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
          middleware:[
            authCheckout
          ]
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
            websiteAuth
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


  // web admin
  {
    path: '/web/admin/dashboard',
    component: () => import('layouts/WebAdmin.vue'),

    children: [
      { path: '', 
        name: 'webAdminDashboard', 
        component: () => import('pages/WebAdmin/Dashboard.vue'),
        meta: {
          middleware:[
            websiteAuth,
            admin,
            // isElectron,
            // desktopAuth
          ]
        },
      }
    ]
  },

  {
    path: '/web/admin/invoice',
    component: () => import('layouts/WebAdmin.vue'),
    children: [
      { path: '', 
        name: 'webAdminInvoice', 
        component: () => import('pages/WebAdmin/Invoice.vue'),
        meta: {
          middleware:[
            websiteAuth,
            admin,
            // isElectron,
            // desktopAuth
          ]
        },
      }
    ]
  },

  {
    path: '/web/admin/send/report',
    component: () => import('layouts/WebAdmin.vue'),
    children: [
      { path: '', 
        name: 'webAdminReport', 
        component: () => import('pages/WebAdmin/Report.vue'),
        meta: {
          middleware:[
            websiteAuth,
            admin,
            // isElectron,
            // desktopAuth
          ]
        },
      }
    ]
  },

  {
    path: '/web/admin/home-service/booking',
    component: () => import('layouts/WebAdmin.vue'),
    children: [
      { path: '', 
        name: 'webAdminHomeServiceBooking', 
        component: () => import('pages/WebAdmin/HomeServiceBooking.vue'),
        meta: {
          middleware:[
            websiteAuth,
            admin,
            // isElectron,
            // desktopAuth
          ]
        },
      }
    ]
  },

  {
    path: '/web/admin/await/bookings',
    component: () => import('layouts/WebAdmin.vue'),
    children: [
      { path: '', 
        name: 'webAdminAwaitBooking', 
        component: () => import('pages/WebAdmin/AwaitBooking.vue'),
        meta: {
          middleware:[
            websiteAuth,
            admin,
            // isElectron,
            // desktopAuth
          ]
        },
      }
    ]
  },


  {
    path: '/web/admin/history',
    component: () => import('layouts/WebAdmin.vue'),
    children: [
      { path: '', 
        name: 'webAdminHistory', 
        component: () => import('pages/WebAdmin/History.vue'),
        meta: {
          middleware:[
            websiteAuth,
            admin,
            // isElectron,
            // desktopAuth
          ]
        },
      },
      { path: '/web/admin/history/orders/:orderId', 
        name: 'webAdminOrderDetails', 
        component: () => import('pages/WebAdmin/HistoryDetails.vue'),
        meta: {
          middleware:[
            websiteAuth,
            admin,
            // isElectron,
            // desktopAuth
          ]
        },
      },

      { path: '/web/admin/history/edit/orders/:orderId', 
        name: 'webAdminEditOrderDetails', 
        component: () => import('pages/WebAdmin/HistoryEditDetails.vue'),
        meta: {
          middleware:[
            websiteAuth,
            admin,
            // isElectron,
            // desktopAuth
          ]
        },
      },
    ]
  },

  {
    path: '/web/admin/settings/packages',
    component: () => import('layouts/WebAdmin.vue'),
    children: [
      { path: '', 
        name: 'webAdminVehicles', 
        component: () => import('pages/WebAdmin/Packages.vue'),
        meta: {
          middleware:[
            websiteAuth,
            admin,
            // isElectron,
            // desktopAuth
          ]
        },
      },
    ]
  },

  {
    path: '/web/admin/settings/vehicles',
    component: () => import('layouts/WebAdmin.vue'),
    children: [
      { path: '', 
        name: 'webAdminPackages', 
        component: () => import('pages/WebAdmin/Vehicles.vue'),
        meta: {
          middleware:[
            websiteAuth,
            admin,
            // isElectron,
            // desktopAuth
          ]
        },
      },
    ]
  },

  {
    path: '/web/admin/settings/platenumbers',
    component: () => import('layouts/WebAdmin.vue'),
    children: [
      { path: '', 
        name: 'webAdminPlateNumbers', 
        component: () => import('pages/WebAdmin/PlateNumbers.vue'),
        meta: {
          middleware:[
            websiteAuth,
            admin,
            // isElectron,
            // desktopAuth
          ]
        },
      },
    ]
  },


  {
    path: '/web/admin/settings/rates',
    component: () => import('layouts/WebAdmin.vue'),
    children: [
      { path: '', 
        name: 'webAdminRates', 
        component: () => import('pages/WebAdmin/PriceSettings.vue'),
        meta: {
          middleware:[
            websiteAuth,
            admin,
            // isElectron,
            // desktopAuth
          ]
        },
      },
    ]
  },

  {
    path: '/web/admin/online/transactions',
    component: () => import('layouts/WebAdmin.vue'),
    children: [
      { path: '', 
        name: 'webOnlineTransactions', 
        component: () => import('pages/WebAdmin/OnlineTransaction.vue'),
        meta: {
          middleware:[
            websiteAuth,
            admin,
            // isElectron,
            // desktopAuth
          ]
        },
      }
    ]
  },

  
  
  {
    path: '/web/admin/roles',
    component: () => import('layouts/WebAdmin.vue'),
    children: [
      { path: '', 
        name: 'admin-roles', 
        component: () => import('pages/Admin/Roles/Roles.vue'),
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
    path: '/web/admin/coupons',
    component: () => import('layouts/WebAdmin.vue'),
    children: [
      { path: '', 
        name: 'admin-coupons', 
        component: () => import('pages/WebAdmin/Coupons.vue'),
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
    path: '/web/admin/discounts',
    component: () => import('layouts/WebAdmin.vue'),
    children: [
      { path: '', 
        name: 'admin-discounts', 
        component: () => import('pages/WebAdmin/Discounts.vue'),
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
    path: '/web/admin/locations',
    component: () => import('layouts/WebAdmin.vue'),
    children: [
      { path: '', 
        name: 'admin-locations', 
        component: () => import('pages/Admin/Locations/Locations.vue'),
        meta: {
          middleware:[
            websiteAuth,
            // isElectron,
            // desktopAuth
          ]
        },
      },
    ]
  },

  {
    path: '/web/admin/income-expense-category',
    component: () => import('layouts/WebAdmin.vue'),
    children: [
      { path: '', 
        name: 'adminAccountClass', 
        component: () => import('pages/Admin/Account/IncomeExpenseCategory.vue'),
        meta: {
          middleware:[
            websiteAuth,
            // isElectron,
            // desktopAuth
          ]
        },
      },
    ]
  },

  {
    path: '',
    component: () => import('layouts/WebAdmin.vue'),
    children: [
      { path: '/web/admin/employees', 
        name: 'adminEmployees', 
        component: () => import('pages/WebAdmin/Employees/Employees.vue'),
        meta: {
          middleware:[
            websiteAuth,
            // isElectron,
            // desktopAuth
          ]
        },
      },
      { path: '/web/admin/employees/new', 
        name: 'adminNewEmployees', 
        component: () => import('pages/WebAdmin/Employees/NewEmployee.vue'),
        meta: {
          middleware:[
            websiteAuth,
            // isElectron,
            // desktopAuth
          ]
        },
      },
      { path: '/web/admin/employees/view', 
        name: 'adminViewEmployees', 
        component: () => import('pages/WebAdmin/Employees/ViewEmployee.vue'),
        meta: {
          middleware:[
            websiteAuth,
            // isElectron,
            // desktopAuth
          ]
        },
      },
      { path: '/web/admin/employees/loans-and-outstanding', 
        name: 'adminEmployeesLoansAndOutstanding', 
        component: () => import('pages/WebAdmin/Employees/EmployeeLoansAndOutstandings.vue'),
        meta: {
          middleware:[
            websiteAuth,
            // isElectron,
            // desktopAuth
          ]
        },
      },
      { path: '/web/admin/employees/penalties-and-deductions', 
        name: 'adminEmployeesPenaltiesAndDeductions', 
        component: () => import('pages/WebAdmin/Employees/EmployeePenaltiesAndDeductions.vue'),
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
    path: '/web/admin/approve/expense-order/:userId/:username',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', 
        name: 'adminExpenseOrderApproval', 
        component: () => import('pages/WebAdmin/Approval/ExpenseOrder.vue'),
        meta: {
          middleware:[
            websiteAuth,
            // isElectron,
            // desktopAuth
          ],
          props: true,
        },
      },
    ]
  },
  
  {
    path: '/web/admin/users',
    component: () => import('layouts/WebAdmin.vue'),
    children: [
      { path: '', 
        name: 'admin-users', 
        component: () => import('pages/Admin/Users/Users.vue'),
        meta: {
          middleware:[
            websiteAuth,
            // isElectron,
            // desktopAuth
          ]
        },
      },
      { path: '/web/admin/users/location/:locationId', 
        name: 'admin-users-location', 
        component: () => import('pages/Admin/Users/Location.vue'),
        meta: {
          middleware:[
            websiteAuth,
            // isElectron,
            // desktopAuth
          ]
        },
      },
      { path: '/web/admin/users/location/:userId/roles/permissions', 
        name: 'admin-users-roles-permissions', 
        component: () => import('pages/Admin/Users/RolesPermissions.vue'),
        meta: {
          middleware:[
            websiteAuth,
            // isElectron,
            // desktopAuth
          ]
        },
        props: true,
      },
    ]
  },
  {
    path: '/web/admin/account',
    component: () => import('layouts/WebAdmin.vue'),
    children: [
      { path: '', 
        name: 'admin-account', 
        component: () => import('pages/Admin/Account/Account.vue'),
        meta: {
          middleware:[
            websiteAuth,
            // isElectron,
            // desktopAuth
          ]
        },
      },
      { 
        path: '/web/admin/account/location/:locationId',
        name: 'accountLocationShow',  
        component: () => import('pages/Admin/Account/Location.vue'), 
        meta: {
          middleware:[
            websiteAuth,
          //   desktopAuth
          ]
        },
        props: true,
      },
      { 
        path: '/web/admin/account/location/expense/:locationId',
        name: 'accountExpenseShow',  
        component: () => import('pages/Admin/Account/Expense.vue'), 
        meta: {
          middleware:[
            websiteAuth,
          //   desktopAuth
          ]
        },
        props: true,
      },
      { 
        path: '/web/admin/account/location/income/:locationId',
        name: 'accountIncomeShow',  
        component: () => import('pages/Admin/Account/Income.vue'), 
        meta: {
          middleware:[
            websiteAuth,
          //   desktopAuth
          ]
        },
        props: true,
      },
    ]
  },



  // desktop admin
  {
    path: '/desktop/login',
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
    path: '/desktop/dashboard',
    component: () => import('layouts/Desktop.vue'),

    children: [
      { path: '', 
        name: 'desktopDashboard', 
        component: () => import('pages/Admin/Dashboard.vue'),
        meta: {
          middleware:[
            // websiteAuth,
            isElectron,
            // desktopAuth
          ]
        },
      }
    ]
  },

  {
    path: '/desktop/invoice',
    component: () => import('layouts/Desktop.vue'),
    children: [
      { path: '', 
        name: 'desktopInvoice', 
        component: () => import('pages/Admin/Invoice.vue'),
        meta: {
          middleware:[
            // websiteAuth,
            isElectron,
            // desktopAuth
          ]
        },
      }
    ]
  },
  {
    path: '/desktop/history',
    component: () => import('layouts/Desktop.vue'),
    children: [
      { path: '', 
        name: 'desktopHistory', 
        component: () => import('pages/Admin/History.vue'),
        meta: {
          middleware:[
            // websiteAuth,
            isElectron,
            // desktopAuth
          ]
        },
      }
    ]
  },
  {
    path: '/desktop/inbox',
    component: () => import('layouts/Desktop.vue'),
    children: [
      { path: '', 
        name: 'desktopInbox', 
        component: () => import('pages/Admin/Inbox.vue'),
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
    path: '/desktop/online/transactions',
    component: () => import('layouts/Desktop.vue'),
    children: [
      { path: '', 
        name: 'desktopOnlineTransactions', 
        component: () => import('pages/Admin/OnlineTransaction.vue'),
        meta: {
          middleware:[
            // websiteAuth,
            isElectron,
            // desktopAuth
          ]
        },
      }
    ]
  },
  {
    path: '/desktop/personnel/requests',
    component: () => import('layouts/Desktop.vue'),
    children: [
      { path: '', 
        name: 'desktopPersonnelRequests', 
        component: () => import('pages/Admin/PersonnelRequests.vue'),
        meta: {
          middleware:[
            // websiteAuth,
            isElectron,
            // desktopAuth
          ]
        },
      }
    ]
  },
  
  {
    path: '/desktop/expense/order',
    component: () => import('layouts/Desktop.vue'),
    children: [
      { path: '', 
        name: 'desktopExpenseOrder', 
        component: () => import('pages/Admin/ExpenseOrder.vue'),
        meta: {
          middleware:[
            // websiteAuth,
            isElectron,
            // desktopAuth
          ]
        },
      }
    ]
  },

  {
    path: '/desktop/report/fault',
    component: () => import('layouts/Desktop.vue'),
    children: [
      { path: '', 
        name: 'desktopReportFault', 
        component: () => import('pages/Admin/ReportFault.vue'),
        meta: {
          middleware:[
            // websiteAuth,
            isElectron,
            // desktopAuth
          ]
        },
      }
    ]
  },
  {
    path: '/desktop/requisition/order',
    component: () => import('layouts/Desktop.vue'),
    children: [
      { path: '', 
        name: 'desktopRequisitionOrder', 
        component: () => import('pages/Admin/RequisitionOrder.vue'),
      }
    ]
  },
  {
    path: '/desktop/suggestions/complaints',
    component: () => import('layouts/Desktop.vue'),
    children: [
      { path: '', 
        name: 'desktopSuggestionsComplaints', 
        component: () => import('pages/Admin/SuggestionsComplaints.vue'),
        meta: {
          middleware:[
            // websiteAuth,
            isElectron,
            // desktopAuth
          ]
        },
      }
    ]
  },
  {
    path: '/desktop/camera/feed',
    component: () => import('layouts/Desktop.vue'),
    children: [
      { path: '', 
        name: 'desktopCameraFeed', 
        component: () => import('pages/Admin/CameraFeed.vue'),
        meta: {
          middleware:[
            // websiteAuth,
            isElectron,
            // desktopAuth
          ]
        },
      }
    ]
  },
  {
    path: '/desktop/employees',
    component: () => import('layouts/Desktop.vue'),
    children: [
      { path: '', 
        name: 'desktopEmployees', 
        component: () => import('pages/Admin/Employees/Employees.vue'),
        meta: {
          middleware:[
            // websiteAuth,
            isElectron,
            // desktopAuth
          ]
        },
      },
      { path: '/desktop/employees/new', 
        name: 'desktopNewEmployees', 
        component: () => import('pages/Admin/Employees/NewEmployee.vue'),
        meta: {
          middleware:[
            // websiteAuth,
            isElectron,
            // desktopAuth
          ]
        },
      },
      { path: '/desktop/employees/view', 
        name: 'desktopViewEmployees', 
        component: () => import('pages/Admin/Employees/ViewEmployee.vue'),
        meta: {
          middleware:[
            // websiteAuth,
            isElectron,
            // desktopAuth
          ]
        },
      },
      { path: '/desktop/employees/loans-and-outstanding', 
        name: 'desktopEmployeesLoansAndOutstanding', 
        component: () => import('pages/Admin/Employees/EmployeeLoansAndOutstandings.vue'),
        meta: {
          middleware:[
            // websiteAuth,
            isElectron,
            // desktopAuth
          ]
        },
      },
      { path: '/desktop/employees/penalties-and-deductions', 
        name: 'desktopEmployeesPenaltiesAndDeductions', 
        component: () => import('pages/Admin/Employees/EmployeePenaltiesAndDeductions.vue'),
        meta: {
          middleware:[
            // websiteAuth,
            isElectron,
            // desktopAuth
          ]
        },
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
