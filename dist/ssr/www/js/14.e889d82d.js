(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[14],{8148:function(t,e,s){"use strict";var a=s("9069"),n=s.n(a);n.a},8347:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-page",{attrs:{padding:""}},[s("div",{staticClass:"q-pa-md q-gutter-sm"},[s("q-breadcrumbs",[s("q-breadcrumbs-el",{attrs:{label:"Home"}}),s("q-breadcrumbs-el",{attrs:{label:"Checkout"}})],1)],1),s("div",{staticClass:"q-pa-md"},[s("div",{staticClass:"q-gutter-y-md"},[s("CheckoutPage")],1)])])},n=[],o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.cart.length?s("div",{staticClass:"q-pa-sm"},[s("table",[t._m(0),s("tbody",[t._l(t.cart,(function(e){return s("tr",{key:e.id},[s("td",{attrs:{"data-label":"Package"}},[s("b",[t._v(t._s(e.vehicle))]),t._v(" - "+t._s(e.package))]),s("td",{attrs:{"data-label":"Venue"}},[t._v(t._s(e.venue))]),s("td",{attrs:{"data-label":"Unit"}},[t._v(t._s(e.quantity))]),s("td",{attrs:{"data-label":"Amount"}},[t._v("₦ "+t._s(e.amount))]),s("td",{attrs:{"data-label":"Total"}},[t._v("₦ "+t._s(e.amount*e.quantity))])])})),s("tr",[s("td"),s("td",{attrs:{colspan:"2"}},[[s("form",{ref:"form",staticClass:"q-pa-md",on:{submit:function(e){return e.preventDefault(),t.couponCheck(e)}}},[s("q-input",{attrs:{"lazy-rules":"",rules:[function(t){return t&&t.length>0||"Please type something"}],color:"primary",hint:"Type then then click Apply Coupon",label:"Have a coupon code? Place Here"},model:{value:t.couponId,callback:function(e){t.couponId=e},expression:"couponId"}}),s("div",{staticClass:"row justify-end"},[s("q-btn",{staticClass:"q-mt-md",attrs:{type:"submit",loading:t.submitting,label:"Apply Coupon",color:"primary"},scopedSlots:t._u([{key:"loading",fn:function(){return[s("q-spinner-facebook")]},proxy:!0}],null,!1,4102112682)})],1)],1)]],2),s("td",[t._v(t._s(t.errorMessage)+" "+t._s(t.errorMessage))]),s("td",[t.discount?s("b",[t._v(" "+t._s(t.discount)+" ")]):t._e()])]),s("tr",[s("td"),t._m(1),s("td",[s("h6",[t._v("₦ "+t._s(t.cartTotal))])])]),t.locationCount>0&&null!=t.authenticatedUser?s("tr",[s("td",[t._v("Select Location ")]),s("td",{attrs:{colspan:"4"}},t._l(t.locations.data,(function(e){return s("div",{key:e.id,staticClass:"q-gutter-sm"},[s("b",[s("q-radio",{attrs:{val:e.id,label:e.address},model:{value:t.location_id,callback:function(e){t.location_id=e},expression:"location_id"}})],1)])})),0)]):t._e(),t.packageHomeOfficeCount>0&&null!=t.authenticatedUser?[s("tr",[t._m(2),s("td",{attrs:{colspan:"2"}},t._l(t.addresses.data,(function(e){return s("div",{key:e.id,staticClass:"q-gutter-sm"},[s("b",[s("q-radio",{attrs:{val:e.id,label:e.name},model:{value:t.address_id,callback:function(e){t.address_id=e},expression:"address_id"}})],1)])})),0),s("td"),s("td",[s("q-btn",{staticClass:"q-mt-md",attrs:{label:"Add new address",color:"primary"},on:{click:function(e){t.newAddress=!t.newAddress}}})],1)]),1==t.newAddress?s("tr",[t._m(3),s("td",{attrs:{colspan:"4"}},[s("q-form",{on:{submit:function(e){return e.preventDefault(),t.submitNewAddress(e)}}},[s("div",{staticClass:"row q-pa-xl"},[s("div",{staticClass:"col-md-4 q-pa-sm"},[s("q-input",{ref:"name",attrs:{label:"Your Address Title *",hint:"For Example: My House, My Office, Schneider's House ","lazy-rules":"",rules:[function(t){return t&&t.length>0||"Please insert an address"}]},model:{value:t.newUserAddress.name,callback:function(e){t.$set(t.newUserAddress,"name",e)},expression:"newUserAddress.name"}})],1),s("div",{staticClass:"col-md-4 q-pa-sm"},[s("q-input",{ref:"name",attrs:{label:"Your City *",hint:"Please insert your city","lazy-rules":"",rules:[function(t){return t&&t.length>0||"Please type in you city"}]},model:{value:t.newUserAddress.city,callback:function(e){t.$set(t.newUserAddress,"city",e)},expression:"newUserAddress.city"}})],1),s("div",{staticClass:"col-md-4 q-pa-sm"},[s("q-input",{ref:"name",attrs:{label:"Your Postal Code *",hint:"Please insert your email","lazy-rules":"",rules:[function(t){return t&&t.length>0||"Please type something"}]},model:{value:t.newUserAddress.postal_code,callback:function(e){t.$set(t.newUserAddress,"postal_code",e)},expression:"newUserAddress.postal_code"}})],1),s("div",{staticClass:"col-md-12 q-pa-sm"},[s("q-input",{ref:"name",attrs:{label:"Your Address *",hint:"Please insert your last name","lazy-rules":"",rules:[function(t){return t&&t.length>0||"Please type something"}]},model:{value:t.newUserAddress.address,callback:function(e){t.$set(t.newUserAddress,"address",e)},expression:"newUserAddress.address"}})],1),s("div",{staticClass:"col-md-12 q-pa-sm"},[s("q-btn",{staticClass:"q-mt-md",attrs:{label:"Save New Address",color:"primary",type:"submit",loading:t.submittingAddress}})],1)])])],1)]):t._e(),s("tr",[t._m(4),s("td",{attrs:{colspan:"4"}},[s("div",{staticClass:"row q-pa-xl"},[s("div",{staticClass:"col-md-6 q-pl-sm"},[s("q-input",{attrs:{filled:"",mask:"date",value:t.optionsFn,rules:["date"]},scopedSlots:t._u([{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[s("q-popup-proxy",{ref:"qDateProxy",attrs:{"transition-show":"scale","transition-hide":"scale"}},[s("q-date",{attrs:{options:t.optionsFn},on:{input:function(){return t.$refs.qDateProxy.hide()}},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1)],1)]},proxy:!0}],null,!1,4197018447),model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1),s("div",{staticClass:"col-md-6 q-pl-sm"},[s("q-input",{attrs:{filled:"",mask:"time",rules:["time"]},scopedSlots:t._u([{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:"access_time"}},[s("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[s("q-time",{attrs:{options:t.optionsTime,format24h:""},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}})],1)],1)]},proxy:!0}],null,!1,2859197556),model:{value:t.time,callback:function(e){t.time=e},expression:"time"}})],1)])])]),s("tr",[t._m(5),s("td",[s("h6",[t._v("₦ "+t._s(t.cartTotal))])])])]:t._e(),s("tr",[s("td",{attrs:{colspan:"3"}},[s("h6",[t.authenticated?s("q-btn",{staticClass:"q-mt-md",attrs:{label:"Pay at Location",color:"primary"},on:{click:function(e){return t.placeOrder("book")}}}):t._e()],1),s("i",[t._v("if you select pay at location discounts would not be applied")])]),s("td",{attrs:{colspan:"2"}},[s("h6",[t.authenticated?s("q-btn",{staticClass:"q-mt-md",attrs:{label:"Pay now",color:"primary"},on:{click:function(e){return t.placeOrder("pay")}}}):t._e()],1),s("i",[t._v("proceed to payment with discounts applied")])])]),s("tr",[s("td",{attrs:{colspan:"5"}},[s("q-btn",{staticClass:"q-mt-md",attrs:{to:"/user/cart",type:"submit",label:"Back to Cart Page for Changes",color:"primary"}})],1)])],2)])]):s("div",{staticClass:"q-pa-sm text-center"},[s("h6",[t._v("No item in your cart")])])},r=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",{attrs:{scope:"col"}},[t._v("Package")]),s("th",{attrs:{scope:"col"}},[t._v("Venue")]),s("th",{attrs:{scope:"col"}},[t._v("Unit")]),s("th",{attrs:{scope:"col"}},[t._v("Amount")]),s("th",{attrs:{scope:"col"}},[t._v("Total")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("td",{attrs:{colspan:"3"}},[s("b",[t._v("Subtotal")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("td",[s("h6",[t._v("Select your home-office address")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("td",[s("h6",[t._v("Create a new Address here")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("td",[s("h6",[t._v("Please Select Date/Time of Delivery")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("td",{attrs:{colspan:"4"}},[s("h5",[t._v("Total")])])}],i=(s("8e6e"),s("8a81"),s("ac6a"),s("cadf"),s("06db"),s("456d"),s("c47a")),c=s.n(i),l=s("2f62"),d=s("2a19"),u=s("bd4c");function p(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,a)}return s}function m(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?p(Object(s),!0).forEach((function(e){c()(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):p(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}var f={data:function(){return{item:{quantity:""},coupon:0,couponId:"",test:"",submitting:!1,submittingAddress:!1,errorMessage:"",location_id:"",address_id:"",newAddress:!1,newUserAddress:{name:"",address:"",city:"",postal_code:"",state_id:"",country_id:""},date:"",time:""}},computed:m({},Object(l["c"])({cart:"shopping/cart",cartItemCount:"shopping/cartItemCount",cartTotal:"shopping/cartTotal",subTotal:"shopping/subTotal",discount:"shopping/discount",authenticated:"auth/authenticated",authenticatedUser:"auth/user",locationCount:"shopping/packageLocationCount",packageHomeOfficeCount:"shopping/packageHomeOfficeCount",locations:"location/locations",addresses:"address/addresses",discountDetails:"shopping/discountDetails",order:"orders/orderDetails"}),{carTotalLength:function(){return"Cart ("+this.cartItemCount+") - ₦"+this.cartTotal}}),methods:m({},Object(l["b"])({removeAllProductFromCart:"shopping/removeAllProductFromCart",updateCartTotals:"shopping/updateCartTotals",applyCoupon:"shopping/applyCoupon",getLocations:"location/getLocations",getAddresses:"address/getAddresses",placeUserOrder:"orders/placeOrder",saveAddress:"address/saveAddress"}),{submitNewAddress:function(){var t=this;this.saveAddress(this.newUserAddress).then((function(e){t.submittingAddress=!0})).catch((function(e){console.log(e),t.errorMessage&&t.negativeNotification(t.errorMessage)})),setTimeout((function(){t.submittingAddress=!1}),3e3)},placeOrder:function(t){var e=this;return this.locationCount>0&&""==this.location_id?this.negativeNotification("please select a location"):this.packageHomeOfficeCount>0&&""==this.address_id?this.negativeNotification("please select an address"):this.packageHomeOfficeCount>0&&""==this.time&&""==this.date?this.negativeNotification("please select an appointed date/time for home service"):void this.placeUserOrder({customer_id:this.authenticatedUser.id,address_id:this.address_id,location_id:this.location_id,coupon_id:this.coupon_id,action:t,booking_date:this.date,booking_time:this.time,discount_id:this.discountDetails?this.discountDetails.id:null}).then((function(t){return null!=e.order?e.$router.push({path:"/user/order/".concat(e.order.id)}):e.$router.push({name:"userOrder"})})).catch((function(t){console.log(t),e.errorMessage&&e.negativeNotification("cannot process order at the moment")}))},optionsFn:function(t){var e=new Date;e.getDate();console.log(new Date);var s=Date.now(),a=u["b"].formatDate(s,"YYYY/MM/DD");return t>=a},optionsTime:function(t){return!(t<8||t>17)},updateCart:function(t,e){this.updateCartTotals([{id:t,quantity:e}])},couponCheck:function(){var t=this;this.applyCoupon(this.couponId).then((function(e){t.submitting=!0,t.newAddress=!1})).catch((function(e){console.log(e),t.errorMessage&&t.negativeNotification(t.errorMessage)})),setTimeout((function(){t.submitting=!1}),3e3)},positiveNotification:function(t){d["a"].create({type:"positive",color:"positive",timeout:3e3,position:"left",message:t})},negativeNotification:function(t){d["a"].create({type:"negative",color:"negative",timeout:3e3,position:"left",message:t})}}),mounted:function(){this.getLocations(),this.getAddresses()}},h=f,v=(s("8148"),s("2877")),b=s("eebe"),_=s.n(b),g=s("27f9"),y=s("9c40"),C=s("e669"),q=s("3786"),w=s("0378"),k=s("0016"),A=s("7cbe"),O=s("52ee"),P=s("ca78"),x=Object(v["a"])(h,o,r,!1,null,"1a6f2a4f",null),D=x.exports;_()(x,"components",{QInput:g["a"],QBtn:y["a"],QSpinnerFacebook:C["a"],QRadio:q["a"],QForm:w["a"],QIcon:k["a"],QPopupProxy:A["a"],QDate:O["a"],QTime:P["a"]});var T={components:{CheckoutPage:D}},U=T,j=s("9989"),$=s("ead5"),E=s("079e"),M=Object(v["a"])(U,a,n,!1,null,null,null);e["default"]=M.exports;_()(M,"components",{QPage:j["a"],QBreadcrumbs:$["a"],QBreadcrumbsEl:E["a"]})},9069:function(t,e,s){}}]);