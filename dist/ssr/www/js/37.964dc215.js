(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[37],{"2b64":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-page",{attrs:{padding:""}},[r("div",{staticClass:"q-pa-md q-gutter-sm"},[r("q-breadcrumbs",[r("q-breadcrumbs-el",{attrs:{label:"Home"}}),r("q-breadcrumbs-el",{attrs:{label:"Security"}})],1)],1),r("div",{staticClass:"q-pa-md"},[r("div",{staticClass:"q-gutter-y-md"},[r("q-card",[r("q-tabs",{staticClass:"text-grey",attrs:{dense:"","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[r("q-tab",{attrs:{name:"mails",label:"Change Phone Number"}}),r("q-tab",{attrs:{name:"alarms",label:"Change Password"}}),r("q-tab",{attrs:{name:"movies",label:"Change Email"}})],1),r("q-separator"),r("q-tab-panels",{attrs:{animated:""},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[r("q-tab-panel",{attrs:{name:"mails"}},[r("ChangePhoneNumber")],1),r("q-tab-panel",{attrs:{name:"alarms"}},[r("ChangePassword")],1),r("q-tab-panel",{attrs:{name:"movies"}},[r("ChangeEmail")],1)],1)],1)],1)])])},a=[],s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"q-pa-md"},[r("div",{staticClass:"text-h6"},[e._v("Change Phone Number")]),e._v("\n        You can verify your new phone number here\n\t\t"),r("q-form",{staticClass:"q-gutter-md",on:{submit:e.onSubmit,reset:e.onReset}},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-12 q-pa-sm"},[r("q-input",{ref:"fldPasswordChangeConfirm",attrs:{filled:"",label:"Your current password",type:e.isPwd?"password":"","lazy-rules":"",rules:e.ConfirmPWD},scopedSlots:e._u([{key:"append",fn:function(){return[r("q-icon",{staticClass:"cursor-pointer",attrs:{name:e.isPwd?"visibility_off":"visibility"},on:{click:function(t){e.isPwd=!e.isPwd}}})]},proxy:!0}]),model:{value:e.form.current_password,callback:function(t){e.$set(e.form,"current_password",t)},expression:"form.current_password"}})],1),r("div",{staticClass:"col-12 q-pa-sm"},[r("q-input",{ref:"fldPasswordChange",attrs:{filled:"",label:"Create a password",type:e.isPwd?"password":"","lazy-rules":"",rules:e.Required},scopedSlots:e._u([{key:"append",fn:function(){return[r("q-icon",{staticClass:"cursor-pointer",attrs:{name:e.isPwd?"visibility_off":"visibility"},on:{click:function(t){e.isPwd=!e.isPwd}}})]},proxy:!0}]),model:{value:e.form.new_password,callback:function(t){e.$set(e.form,"new_password",t)},expression:"form.new_password"}})],1),r("div",{staticClass:"col-12 q-pa-sm"},[r("q-input",{ref:"fldPasswordChangeConfirm",attrs:{filled:"",label:"Confirm your password",type:e.isPwd?"password":"","lazy-rules":"",rules:e.ConfirmPWD},scopedSlots:e._u([{key:"append",fn:function(){return[r("q-icon",{staticClass:"cursor-pointer",attrs:{name:e.isPwd?"visibility_off":"visibility"},on:{click:function(t){e.isPwd=!e.isPwd}}})]},proxy:!0}]),model:{value:e.form.password_confirmation,callback:function(t){e.$set(e.form,"password_confirmation",t)},expression:"form.password_confirmation"}})],1)]),r("div",[r("q-btn",{attrs:{label:"Submit",type:"submit",color:"primary"}}),r("q-btn",{staticClass:"q-ml-sm",attrs:{label:"Reset",type:"reset",color:"primary",flat:""}})],1)])],1)},o=[],i={data:function(){return{password:"",isPwd:!0,form:{current_password:"",new_password:"",confirm_password:""}}},computed:{ConfirmPWD:function(){var e=this;return[function(e){return!!e||"Choose a password"},function(t){return t==e.$refs.fldPasswordChange.value||"Password does not match"}]},Required:function(){return[function(e){return!!e||"Choose a password"}]}}},l=i,c=r("2877"),u=r("eebe"),p=r.n(u),m=r("0378"),d=r("27f9"),f=r("0016"),b=r("9c40"),h=Object(c["a"])(l,s,o,!1,null,null,null),v=h.exports;p()(h,"components",{QForm:m["a"],QInput:d["a"],QIcon:f["a"],QBtn:b["a"]});var g=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"q-pa-md"},[r("div",{staticClass:"bg-primary"},[e._v(e._s(e.message))]),r("q-stepper",{ref:"stepper",attrs:{"header-nav":"",color:"primary",animated:"",flat:""},model:{value:e.step,callback:function(t){e.step=t},expression:"step"}},[r("q-step",{attrs:{name:1,title:"Your phone number",icon:"settings",done:e.step>1,"header-nav":e.step>1}},[r("q-form",{staticClass:"q-gutter-md",on:{submit:e.submitPhone}},[r("q-input",{attrs:{filled:"",prefix:"+234",label:"Phone Number",mask:"(###) ### - ####","unmasked-value":"",hint:"Hint : (703) 749 - 5705","lazy-rules":"",rules:[function(e){return!!e||"* Required"},function(e){return e&&e.length>0||"Please type in your phone number"}]},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}}),r("q-stepper-navigation",[r("q-btn",{attrs:{type:"submit",color:"primary",label:"Continue"}})],1)],1)],1),r("q-step",{attrs:{name:2,title:"Enter Otp received",icon:"create_new_folder",done:e.step>2,"header-nav":e.step>2}},[r("q-form",{staticClass:"q-gutter-md",on:{submit:e.submitPhone}},[e._v("\n    \t        \tKindly provide your OTP Code.\n    \t\t        "),r("q-input",{attrs:{filled:"",prefix:"G-",label:"Phone Number",mask:"####","unmasked-value":"",hint:"Hint : 5705","lazy-rules":"",rules:[function(e){return!!e||"* Required"},function(e){return e&&e.length>0||"Please type in your phone number"}]},model:{value:e.otpCode,callback:function(t){e.otpCode=t},expression:"otpCode"}}),r("q-stepper-navigation",[r("q-btn",{attrs:{color:"primary",label:"Continue"},on:{click:e.submitOTP}}),r("q-btn",{staticClass:"q-ml-sm",attrs:{flat:"",color:"primary",label:"Back"},on:{click:function(t){e.step=1}}})],1)],1)],1),r("q-step",{attrs:{name:3,title:"Phone number",icon:"add_comment","header-nav":e.step>3}},[r("div",{staticClass:"row"},[e._v("\n\t\t            The Phone number has been changed\n\t\t        ")]),r("q-stepper-navigation")],1)],1)],1)},y=[],w=(r("8e6e"),r("8a81"),r("ac6a"),r("cadf"),r("06db"),r("456d"),r("c47a")),P=r.n(w),q=r("2f62"),C=r("2a19");function O(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?O(Object(r),!0).forEach((function(t){P()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var k={data:function(){return{otpCode:"",errorMessages:[],error:"",form:{phone:""},step:1}},computed:_({},Object(q["c"])({message:"message",errorMessage:"errorMessage",newPhoneNumber:"auth/phone"}),{ConfirmPWD:function(){var e=this;return[function(e){return!!e||"Choose a password"},function(t){return t==e.$refs.fldPasswordChange.value||"Password does not match"}]},Required:function(){return[function(e){return!!e||"Choose a password"}]}}),methods:_({},Object(q["b"])({stepOneValidation:"auth/sendPhoneNumber",stepTwoValidation:"auth/verifyOTP",stepThreeValidation:"auth/signUp"}),{submitPhone:function(){var e=this;this.stepOneValidation(this.form).then((function(t){return e.newUser.phone="234"+e.newPhoneNumber.phone,e.step=2})).catch((function(t){e.errorMessages=t,console.log(e.errorMessages),e.errorMessages.phone&&e.negativeNotification(t.phone[0]),e.errorMessages&&e.negativeNotification(e.errorMessages)}))},submitOTP:function(){var e=this;this.stepTwoValidation({phone:this.newPhoneNumber.phone,otp:this.otpCode}).then((function(t){return e.step=3})).catch((function(t){console.log(t),e.errorMessages=t,t&&e.negativeNotification(t.error)}))},positiveNotification:function(e){C["a"].create({type:"positive",color:"positive",timeout:3e3,position:"center",message:e})},negativeNotification:function(e){C["a"].create({type:"negative",color:"negative",timeout:3e3,position:"center",message:e})}})},j=k,N=r("f531"),Q=r("87fe"),x=r("b19c"),E=Object(c["a"])(j,g,y,!1,null,null,null),T=E.exports;p()(E,"components",{QStepper:N["a"],QStep:Q["a"],QForm:m["a"],QInput:d["a"],QStepperNavigation:x["a"],QBtn:b["a"]});var M=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"q-pa-md"},[r("div",{staticClass:"bg-primary"},[e._v(e._s(e.message))]),r("q-stepper",{ref:"stepper",attrs:{"header-nav":"",color:"primary",animated:"",flat:""},model:{value:e.step,callback:function(t){e.step=t},expression:"step"}},[r("q-step",{attrs:{name:1,title:"Enter Email Address",icon:"settings",done:e.step>1,"header-nav":e.step>1},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}},[r("q-form",{staticClass:"q-gutter-md",on:{submit:e.submitPhone}},[r("q-input",{ref:"name",attrs:{filled:"",label:"Your Email *",hint:"Please insert your email","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please type something"}]}}),r("q-stepper-navigation",[r("q-btn",{attrs:{type:"submit",color:"primary",label:"Continue"}})],1)],1)],1),r("q-step",{attrs:{name:2,title:"Enter Code received",icon:"create_new_folder",done:e.step>2,"header-nav":e.step>2}},[r("q-form",{staticClass:"q-gutter-md",on:{submit:e.submitOTP}},[e._v("\n    \t        \tKindly provide your Email Code.\n    \t\t        "),r("q-input",{attrs:{filled:"",prefix:"G-",label:"Phone Number",mask:"####","unmasked-value":"",hint:"Hint : 5705","lazy-rules":"",rules:[function(e){return!!e||"* Required"},function(e){return e&&e.length>0||"Please type in your phone number"}]},model:{value:e.otpCode,callback:function(t){e.otpCode=t},expression:"otpCode"}}),r("q-stepper-navigation",[r("q-btn",{attrs:{type:"submit",color:"primary",label:"Continue"}}),r("q-btn",{staticClass:"q-ml-sm",attrs:{flat:"",color:"primary",label:"Back"},on:{click:function(t){e.step=1}}})],1)],1)],1),r("q-step",{attrs:{name:3,title:"Email Status",icon:"add_comment","header-nav":e.step>3}},[r("div",{staticClass:"row"},[e._v("\n\t\t            The Phone number has been changed\n\t\t        ")])])],1)],1)},S=[];function D(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function $(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?D(Object(r),!0).forEach((function(t){P()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var V={data:function(){return{otpCode:"",errorMessages:[],error:"",form:{email:""},step:1}},computed:$({},Object(q["c"])({message:"message",errorMessage:"errorMessage",newPhoneNumber:"auth/phone"})),methods:$({},Object(q["b"])({stepOneValidation:"auth/sendPhoneNumber",stepTwoValidation:"auth/verifyOTP",stepThreeValidation:"auth/signUp"}),{submitPhone:function(){var e=this;this.stepOneValidation(this.form).then((function(t){return e.newUser.phone="234"+e.newPhoneNumber.phone,e.step=2})).catch((function(t){e.errorMessages=t,console.log(e.errorMessages),e.errorMessages.phone&&e.negativeNotification(t.phone[0]),e.errorMessages&&e.negativeNotification(e.errorMessages)}))},submitOTP:function(){var e=this;this.stepTwoValidation({phone:this.newPhoneNumber.phone,otp:this.otpCode}).then((function(t){return e.step=3})).catch((function(t){console.log(t),e.errorMessages=t,t&&e.negativeNotification(t.error)}))},positiveNotification:function(e){C["a"].create({type:"positive",color:"positive",timeout:3e3,position:"center",message:e})},negativeNotification:function(e){C["a"].create({type:"negative",color:"negative",timeout:3e3,position:"center",message:e})}})},R=V,z=Object(c["a"])(R,M,S,!1,null,null,null),B=z.exports;p()(z,"components",{QStepper:N["a"],QStep:Q["a"],QForm:m["a"],QInput:d["a"],QStepperNavigation:x["a"],QBtn:b["a"]});var H={data:function(){return{tab:"mails"}},components:{ChangePassword:v,ChangePhoneNumber:T,ChangeEmail:B}},I=H,U=r("9989"),W=r("ead5"),Y=r("079e"),F=r("f09f"),G=r("429b"),J=r("7460"),K=r("eb85"),A=r("adad"),L=r("823b"),X=Object(c["a"])(I,n,a,!1,null,null,null);t["default"]=X.exports;p()(X,"components",{QPage:U["a"],QBreadcrumbs:W["a"],QBreadcrumbsEl:Y["a"],QCard:F["a"],QTabs:G["a"],QTab:J["a"],QSeparator:K["a"],QTabPanels:A["a"],QTabPanel:L["a"]})}}]);