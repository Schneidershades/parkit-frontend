(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{"2b43":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{attrs:{padding:""}},[a("div",{staticClass:"q-pa-md q-gutter-sm"},[a("q-breadcrumbs",[a("q-breadcrumbs-el",{attrs:{label:"Home"}}),a("q-breadcrumbs-el",{attrs:{label:"Online Transaction"}})],1)],1),a("div",{staticClass:"q-pa-md"},[a("div",{staticClass:"q-gutter-y-md"},[a("q-stepper",{attrs:{vertical:"",color:"primary",animated:""},model:{value:t.step,callback:function(e){t.step=e},expression:"step"}},[a("q-step",{attrs:{name:1,title:"Find user transaction",icon:"settings",done:t.step>1}},[a("div",{staticClass:"q-pa-md"},[[a("q-card-actions",{attrs:{align:"left"}},[a("div",{staticClass:"q-px-sm row no-wrap items-center"},[a("div",{staticClass:"col-md-12"},[a("q-radio",{attrs:{val:"phone",label:"Phone Number"},model:{value:t.find_transaction_via,callback:function(e){t.find_transaction_via=e},expression:"find_transaction_via"}}),a("q-radio",{attrs:{val:"email",label:"Email"},model:{value:t.find_transaction_via,callback:function(e){t.find_transaction_via=e},expression:"find_transaction_via"}})],1),a("div",{staticClass:"col-md-6"},[t._v("\n\t\t\t\t\t\t\t\t     \t search transaction through: "),a("strong",[t._v(t._s(t.find_transaction_via))])])])]),"phone"==t.find_transaction_via?a("q-form",{ref:"form",on:{submit:function(e){return e.preventDefault(),t.findTransaction("phoneNumber",t.transaction.phone)}}},[a("div",{staticClass:"row"},[a("h6",{staticClass:"col-12 q-pl-sm"},[t._v("Phone Number")]),a("div",{staticClass:"col-4 q-pr-md"},[a("q-input",{attrs:{filled:"",prefix:"+234",label:"Phone Number",mask:"(###) ### - ####","unmasked-value":"",hint:"Hint : (703) 749 - 5705","lazy-rules":"",rules:[function(t){return t&&t.length>0||"Please type in your phone number"}]},model:{value:t.transaction.phone,callback:function(e){t.$set(t.transaction,"phone",e)},expression:"transaction.phone"}})],1),a("br"),a("div",{staticClass:"col-4"},[a("q-btn",{staticClass:"q-mt-md",attrs:{type:"submit",loading:t.submitting,label:"Find Transaction",color:"primary"},scopedSlots:t._u([{key:"loading",fn:function(){return[a("q-spinner-facebook")]},proxy:!0}],null,!1,4102112682)})],1)])]):t._e(),"email"==t.find_transaction_via?a("q-form",{ref:"form",on:{submit:function(e){return e.preventDefault(),t.findTransaction("orderNumber",t.transaction.orderId)}}},[a("div",{staticClass:"row"},[a("h6",{staticClass:"col-12 q-pl-sm"},[t._v("Email")]),a("div",{staticClass:"col-4 q-pr-md"},[a("q-input",{ref:"name",attrs:{filled:"",label:"Your Email *",hint:"Please insert your email","lazy-rules":"",rules:[function(t){return t&&t.length>0||"Please type something"}]},model:{value:t.newUser.email,callback:function(e){t.$set(t.newUser,"email",e)},expression:"newUser.email"}})],1),a("div",{staticClass:"col-4"},[a("q-btn",{staticClass:"q-mt-md",attrs:{type:"submit",loading:t.submitting,label:"Find Transaction",color:"primary"},scopedSlots:t._u([{key:"loading",fn:function(){return[a("q-spinner-facebook")]},proxy:!0}],null,!1,4102112682)})],1),a("br")])]):t._e()],a("Transactions")],2),a("q-stepper-navigation",[null!=t.transactionDetails?a("q-btn",{attrs:{color:"primary",label:"Continue"},on:{click:function(e){t.step=2}}}):t._e()],1)],1),a("q-step",{attrs:{name:2,title:"View Order Packages",caption:"Customer choosen Packages",icon:"create_new_folder",done:t.step>2}},[a("TransactionDetailsPackage"),a("q-stepper-navigation",[null!=t.transactionDetails?a("q-btn",{attrs:{color:"primary",label:"Continue"},on:{click:function(e){t.step=3}}}):t._e(),a("q-btn",{staticClass:"q-ml-sm",attrs:{flat:"",color:"primary",label:"Back"},on:{click:function(e){t.step=1}}})],1)],1),a("q-step",{attrs:{name:3,title:"Payment Method",icon:"money",done:t.step>3}},[a("div",{staticClass:"q-pa-md"}),a("q-stepper-navigation",[a("q-btn",{attrs:{color:"primary",label:"Continue"},on:{click:function(e){t.step=4}}}),a("q-btn",{staticClass:"q-ml-sm",attrs:{flat:"",color:"primary",label:"Back"},on:{click:function(e){t.step=2}}})],1)],1),a("q-step",{attrs:{name:4,title:"Print Invoice",icon:"print"}},[a("PrintTransaction"),a("q-stepper-navigation",[a("q-btn",{attrs:{color:"primary",label:"Finish"}}),a("q-btn",{staticClass:"q-ml-sm",attrs:{flat:"",color:"primary",label:"Back"},on:{click:function(e){t.step=3}}})],1)],1)],1)],1)])])},r=[],s=(a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("c47a")),i=a.n(s),o=a("2f62"),c=a("2a19"),l=a("7833"),u=a("a3e7"),p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.allTransactions?a("div",{staticClass:"q-pt-md"},[a("h6",[t._v("Transaction Found")]),a("table",[t._m(0),a("tbody",t._l(t.allTransactions,(function(e){return a("tr",{key:e.id},[a("td",{attrs:{"data-label":"Initiate"}},[a("q-radio",{key:e.id,attrs:{val:e},on:{input:function(a){return t.pickTransaction(e)}},model:{value:t.transactionId,callback:function(e){t.transactionId=e},expression:"transactionId"}})],1),a("td",{attrs:{"data-label":"Order"}},[t._v(t._s(e.id))]),a("td",{attrs:{"data-label":"Type"}},[t._v(t._s(e.action))]),a("td",{attrs:{"data-label":"Quantity"}},[t._v(t._s(e.packages))]),a("td",{attrs:{"data-label":"Subtotal"}},[t._v("₦ "+t._s(e.subtotal))]),a("td",{attrs:{"data-label":"Discount"}},[t._v("₦ "+t._s(e.discount))]),a("td",{attrs:{"data-label":"Total"}},[t._v("₦ "+t._s(e.total))])])})),0)])]):a("div",{staticClass:"q-pa-sm text-center"},[a("h6",[t._v("No Transaction Found")])])},d=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("Initiate")]),a("th",{attrs:{scope:"col"}},[t._v("Order")]),a("th",{attrs:{scope:"col"}},[t._v("Type")]),a("th",{attrs:{scope:"col"}},[t._v("Package")]),a("th",{attrs:{scope:"col"}},[t._v("Subtotal")]),a("th",{attrs:{scope:"col"}},[t._v("Discount")]),a("th",{attrs:{scope:"col"}},[t._v("Total")])])])}];function b(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function m(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?b(Object(a),!0).forEach((function(e){i()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):b(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var f={components:{},data:function(){return{transactionId:this.transactionDetails?this.transactionDetails.id:""}},computed:m({},Object(o["c"])({allTransactions:"onlineTransaction/allTransactions",transactionDetails:"onlineTransaction/transactionDetails"})),methods:m({},Object(o["b"])({pickedTransaction:"onlineTransaction/transactionOrderSelected"}),{pickTransaction:function(t){this.pickedTransaction(t).then((function(t){}))}})},v=f,_=(a("5635"),a("2877")),h=a("eebe"),g=a.n(h),O=a("3786"),y=Object(_["a"])(v,p,d,!1,null,"454623a4",null),w=y.exports;g()(y,"components",{QRadio:O["a"]});var D=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"q-pa-sm"},[a("table",[t._m(0),a("tbody",[t._l(t.transactionDetails.products,(function(e){return a("tr",{key:e.id},[a("td",{attrs:{"data-label":"Package"}},[a("b",[t._v(t._s(e.vehicle))]),t._v(" - "+t._s(e.package))]),a("td",{attrs:{"data-label":"Quantity"}},[a("q-input",{ref:"platenumber",refInFor:!0,attrs:{label:"Plate Number *",filled:"",dense:"",readonly:"","lazy-rules":"",rules:[function(t){return null!==t&&""!==t||"Please type a plate number"}]}})],1),a("td",{attrs:{"data-label":"Venue"}},[t._v(t._s(e.venue))]),a("td",{attrs:{"data-label":"Quantity"}},[t._v(t._s(e.quantity))]),a("td",{attrs:{"data-label":"Unit"}},[t._v("₦ "+t._s(e.amount))])])})),a("tr",[a("td",{attrs:{colspan:"2"}},[a("q-btn",{attrs:{color:"primary",label:"Save Plate Number"}})],1),a("td",{attrs:{colspan:"3"}})]),a("tr",[a("td",{attrs:{colspan:"4"}},[a("b",[t._v("Discount \n\t\t\t\t\t    "),"online-free-wash"==t.transactionDetails.action?[t._v(" - "+t._s(t.transactionDetails.action))]:t._e()],2)]),a("td",[t.transactionDetails.discount?a("b",[t._v("₦ "+t._s(t.transactionDetails.discount)+".00 ")]):t._e()])]),a("tr",[t._m(1),a("td",[t.transactionDetails.subtotal?a("b",[t._v("₦ "+t._s(t.transactionDetails.subtotal)+".00 ")]):t._e()])]),a("tr",[t._m(2),a("td",[a("h6",[t._v("₦ "+t._s(t.transactionDetails.total)+".00")])])])],2)])])},P=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("Package")]),a("th",{attrs:{scope:"col"}},[t._v("Plate Number")]),a("th",{attrs:{scope:"col"}},[t._v("Location")]),a("th",{attrs:{scope:"col"}},[t._v("Quantity")]),a("th",{attrs:{scope:"col"}},[t._v("Amount")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("td",{attrs:{colspan:"4"}},[a("b",[t._v("Subtotal")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("td",{attrs:{colspan:"4"}},[a("b",[t._v("Total")])])}];function k(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function q(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?k(Object(a),!0).forEach((function(e){i()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):k(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var j={data:function(){return{}},computed:q({},Object(o["c"])({transactionDetails:"onlineTransaction/transactionDetails"}))},T=j,C=(a("a254"),a("27f9")),N=a("9c40"),S=Object(_["a"])(T,D,P,!1,null,"3906c836",null),E=S.exports;g()(S,"components",{QInput:C["a"],QBtn:N["a"]});var U=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ticket"},[a("div",{attrs:{id:"ticket"}},[a("q-card-actions",{attrs:{align:"center"}},[a("img",{attrs:{src:"statics/parkit_logo.png",alt:"Parkit Home service",width:"150"}})]),a("p",[a("b",[t._v("Location : street city, state 0000 "),a("br"),t._v("\n\t\t\t\tPhone   : 555-555-5555 "),a("br"),t._v(" \n\t\t\t\tEmail   : info@parkit.ng"),a("br"),t._v("\n\t\t\t\tWebsite   : www.parkit.ng"),a("br"),a("br"),t._v("\n\n\t\t\t\tBill ID   : www.parkit.ng"),a("br"),t._v("\n\t\t\t\tDate   : "+t._s(t.transactionDetails.customer.phone)),a("br"),t._v("\n\t\t\t\tService Date   : www.parkit.ng"),a("br"),t._v("\n\t\t\t\tCashier   : "+t._s(t.transactionDetails.customer.phone)),a("br"),t._v("\n\t\t\t\tTo   : www.parkit.ng"),a("br"),t._v("\n\t\t\t\tPayment Method   : www.parkit.ng"),a("br")])]),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),t._l(t.transactionDetails.products,(function(e){return a("div",[a("p",[a("b",[t._v("Package: "+t._s(e.package))])]),a("p",[a("b",[t._v("Location: "+t._s(e.venue))])]),a("p",[a("b",[t._v("Price: N "+t._s(e.amount))])]),a("hr")])})),a("br"),a("br"),a("br"),a("div",{attrs:{align:"left"}},[a("p",[a("b",[t._v("sub-total: N"+t._s(t.transactionDetails.subtotal))])]),a("p",[a("b",[t._v("discount: N"+t._s(t.transactionDetails.discount))])]),a("p",[a("b",[t._v("total: N"+t._s(t.transactionDetails.total))])]),a("hr")])],2),a("button",{attrs:{type:"button"},on:{click:t.pr}},[t._v("\n\t\t    Print Form\n\t\t ")])])},M=[],Q=a("add5"),V=a.n(Q);function I(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function x(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?I(Object(a),!0).forEach((function(e){i()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):I(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var B=a("bdb9"),A=(B.remote,{data:function(){return{}},computed:x({},Object(o["c"])({transactionDetails:"onlineTransaction/transactionDetails"})),methods:{pr:function(){V()({printable:"ticket",type:"html"})}}}),F=A,R=(a("d5b3"),a("4b7e")),$=Object(_["a"])(F,U,M,!1,null,"84644638",null),L=$.exports;function H(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function K(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?H(Object(a),!0).forEach((function(e){i()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):H(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}g()($,"components",{QCardActions:R["a"]});var z={components:{TabList:l["a"],Cart:u["a"],Transactions:w,TransactionDetailsPackage:E,PrintTransaction:L},data:function(){return{newUser:{phone:"",vehicle_type:"",vehicle_model:"",first_name:"",last_name:"",plate_number:""},transaction:{phone:"",orderId:""},payment_method:"cash",errorMessages:[],error:"",plateNumber:{number:""},vehicles:["SALOON CAR","SUV & SPACE BUS","TRUCK","14 SEATER BUS","18 SEATER BUS","32 SEATER BUS","36 SEATER BUS","PICKUP TRUCK","CARGO TRUCK","MOTOCYCLE"],models:["Toyota","Honda","BMW"],step:1,dense:!0,splitterModel:20,trigger:!1,readonly:!0,theModel:null,submitting:!1,readonlyOrderId:!1,denseOrderId:!1,find_transaction_via:"phone"}},computed:K({},Object(o["c"])({message:"message",errorMessage:"errorMessage",newPhoneNumber:"auth/phone",plateVehicleDetails:"plateNumber/plateNumberDetails",cart:"shopping/cart",userDiscountPriviledge:"shopping/userDiscountPriviledge",discount:"shopping/discount",discountDetails:"shopping/discountDetails",allTransactions:"onlineTransaction/allTransactions",transactionDetails:"onlineTransaction/transactionDetails"})),methods:K({},Object(o["b"])({sendPlatenumber:"plateNumber/getPlateNumber",updateCustomer:"plateNumber/updateCustomer",placeCustomerOrder:"orders/placeOrder",getTransactionOrdersOnline:"onlineTransaction/getTransactionOrdersOnline"}),{findTransaction:function(t,e){var a=this;"phoneNumber"==t&&(console.log(e),this.getTransactionOrdersOnline({phone:e}).then((function(t){})).catch((function(t){console.log(t),a.errorMessage&&a.negativeNotification("cannot process order at the moment")}))),"orderNumber"==t&&(console.log(e),this.getTransactionOrdersOnline({email:e}).then((function(t){})).catch((function(t){console.log(t),a.errorMessage&&a.negativeNotification("cannot process order at the moment")})))},submitFindVehicle:function(){var t=this;this.sendPlatenumber(this.plateNumber.number).then((function(e){t.trigger=!0,t.newUser.plate_number=t.plateNumber.number,console.log(t.plateVehicleDetails),t.newUser.phone=t.plateVehicleDetails.user.phone,t.newUser.first_name=t.plateVehicleDetails.user.first_name,t.newUser.last_name=t.plateVehicleDetails.user.last_name,t.newUser.vehicle_type=t.plateVehicleDetails.vehicle,t.newUser.vehicle_model=t.plateVehicleDetails.model})).catch((function(e){t.errorMessages=e,console.log(t.errorMessages),t.errorMessages&&t.negativeNotification(t.errorMessages)}))},updateUser:function(){var t=this;this.updateCustomer(this.newUser).then((function(e){t.readonly=!0,t.newUser.plate_number=t.plateNumber.number,console.log(t.plateVehicleDetails),t.newUser.phone=t.plateVehicleDetails.user.phone,t.newUser.first_name=t.plateVehicleDetails.user.first_name,t.newUser.last_name=t.plateVehicleDetails.user.last_name,t.newUser.vehicle_type=t.plateVehicleDetails.vehicle,t.newUser.vehicle_model=t.plateVehicleDetails.model})).catch((function(e){t.errorMessages=e,console.log(t.errorMessages),t.errorMessages&&t.negativeNotification(t.errorMessages)}))},reset:function(){this.theModel=null},positiveNotification:function(t){c["a"].create({type:"positive",color:"positive",timeout:3e3,position:"center",message:t})},negativeNotification:function(t){c["a"].create({type:"negative",color:"negative",timeout:3e3,position:"center",message:t})}})},J=z,W=a("9989"),Y=a("ead5"),G=a("079e"),X=a("f531"),Z=a("87fe"),tt=a("0378"),et=a("e669"),at=a("b19c"),nt=Object(_["a"])(J,n,r,!1,null,null,null);e["default"]=nt.exports;g()(nt,"components",{QPage:W["a"],QBreadcrumbs:Y["a"],QBreadcrumbsEl:G["a"],QStepper:X["a"],QStep:Z["a"],QCardActions:R["a"],QRadio:O["a"],QForm:tt["a"],QInput:C["a"],QBtn:N["a"],QSpinnerFacebook:et["a"],QStepperNavigation:at["a"]})},"2b4f":function(t,e,a){},5635:function(t,e,a){"use strict";var n=a("9fb6"),r=a.n(n);r.a},"9fb6":function(t,e,a){},a254:function(t,e,a){"use strict";var n=a("2b4f"),r=a.n(n);r.a},d5b3:function(t,e,a){"use strict";var n=a("e408"),r=a.n(n);r.a},e408:function(t,e,a){}}]);