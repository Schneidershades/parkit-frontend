<template>   
    <q-card style="width: 800px; max-width: 80vw;" class="q-pa-sm">
        <q-card-section  style="max-height: 80vh" class="scroll"> 
            <div class="text-h6 text-center">Sign Up</div>
            <q-card-actions align="center">
                <img src="~assets/parkit_icon_logo.png" align="center" alt="Parkit Home service" width="300">
            </q-card-actions> 

            <template v-if="message" class="q-ma-md">

                <q-banner dense rounded inline-actions v-if="message.email || message.phone" class="text-white bg-red">
                    {{message.email ? message.email[0] : null}} {{message.phone ? message.phone[0] : null}}
                </q-banner>   

                <q-banner v-else dense rounded inline-actions class="text-white bg-green">
                    {{message}}
                </q-banner> 

            </template> 
                
                <q-stepper
                  v-model="step"
                  header-nav
                  ref="stepper"
                  color="primary"
                  animated
                  
                >
                  <q-step
                    :name="1"
                    title="Your phone number"
                    icon="settings"
                    :done="step > 1"
                    :header-nav="step > 1"
                  >
                        <q-form
                            @submit="submitPhone"
                            ref="form"
                        >
                           <q-input
                                filled
                                prefix="+234"
                                v-model="form.phone"
                                label="Phone Number"
                                mask="(###) ### - ####"
                                unmasked-value
                                hint="Hint : (222) 222 - 2222"
                                lazy-rules
                                :rules="[val => !!val || '* Required', val => val && val.length > 0 || 'Please type in your phone number']"
                                />

                            <q-stepper-navigation>
                              <q-btn type="submit" color="primary" label="Continue" :disable="disable"/>
                            </q-stepper-navigation>
                        </q-form>
                  </q-step>

                  <q-step
                        :name="2"
                        title="Input Otp received"
                        icon="create_new_folder"
                        :done="step > 2"
                        :header-nav="step > 2"
                      >
                        <q-form
                            @submit="submitOTP"
                        >
                            Kindly provide your OTP Code.
                            <q-input
                                filled
                                prefix="G-"
                                v-model="otpCode"
                                label="Input otp received"
                                mask="####"
                                unmasked-value
                                hint="Hint : 5705"
                                lazy-rules
                                :rules="[val => !!val || '* Required', val => val && val.length > 0 || 'Please type in your phone number']"
                                />

                            <q-stepper-navigation>
                              <q-btn type="submit" color="primary" label="Continue" :disable="disable"/>
                              <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" :disable="disable"/>
                            </q-stepper-navigation>
                        </q-form>
                    </q-step>

                  <q-step
                    :name="3"
                    title="Create your account"
                    icon="add_comment"
                    :header-nav="step > 3"
                  >
                    <q-form
                        @submit="submitNewUser"
                    >

                        <div class="row">

                            <div class="col-lg-6 col-xm-12 col-md-6 q-pl-sm">
                                <q-input standout v-model="newUser.phone" hint="Your Phone Number" :dense="dense" readonly />
                            </div>

                            <div class="col-lg-6 col-xm-12 col-md-6 q-pl-sm">
                                <q-input
                                    ref="name"
                                    filled
                                    v-model="newUser.first_name"
                                    label="Your First Name *"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please insert your first name']"
                                />
                            </div>

                            <div class="col-lg-6 col-xm-12 col-md-6 q-pl-sm">
                                <q-input
                                    ref="name"
                                    filled
                                    v-model="newUser.last_name"
                                    label="Your Last Name *"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please insert your last name']"
                                />
                            </div>

                            <div class="col-lg-6 col-xm-12 col-md-6 q-pl-sm">
                                <q-input
                                    ref="name"
                                    filled
                                    v-model="newUser.email"
                                    label="Your Email *"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please insert your email']"
                                />
                            </div>

                             <div class="col-lg-6 col-xm-12 col-md-6 q-pl-sm">
                                <q-input filled
                                        v-model="newUser.password"
                                        label="Create a password"
                                        v-bind:type="isPwd ? 'password' : ''"
                                        lazy-rules
                                        v-bind:rules="Required"
                                        ref="fldPasswordChange">
                                    <template v-slot:append>
                                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
                                                class="cursor-pointer"
                                                v-on:click="isPwd = !isPwd"></q-icon>
                                    </template>
                                </q-input>
                            </div>

                             <div class="col-lg-6 col-xm-12 col-md-6 q-pl-sm">
                                <q-input filled
                                        v-model="newUser.password_confirmation"
                                        label="Confirm your password"
                                        v-bind:type="isPwd ? 'password' : ''"
                                        lazy-rules
                                        v-bind:rules="ConfirmPWD"
                                        ref="fldPasswordChangeConfirm">
                                    <template v-slot:append>
                                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
                                                class="cursor-pointer"
                                                v-on:click="isPwd = !isPwd"></q-icon>
                                    </template>
                                </q-input>
                            </div>
                        </div>

                        <template v-if="message" class="q-ma-md">

                            <q-banner dense rounded inline-actions v-if="message.email || message.phone" class="text-white bg-red">
                                {{message.email ? message.email[0] : null}} {{message.phone ? message.phone[0] : null}}
                            </q-banner>   

                            <q-banner v-else dense rounded inline-actions class="text-white bg-green">
                                {{message}}
                            </q-banner> 

                        </template> 

                        <q-stepper-navigation>
                          <q-btn color="primary" type="submit" label="Finish" :disable="disable"/>
                          <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" :disable="disable"/>
                        </q-stepper-navigation>
                    </q-form>
                  </q-step>
                </q-stepper>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
            <q-btn flat label="Reset" color="white" text-color="primary" @click="step = 1" />
            <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
    </q-card>
</template>

<script>
    
    import { mapActions, mapGetters } from 'vuex'
    import { Notify } from 'quasar'

    export default{
        data(){
            return{
                 newUser: {
                    phone : '',
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                },
                otpCode: '',
                errorMessages: [],
                error: '',
                form : {
                    phone : ''
                },


                password_confirmation: '',

                step: 1,
                dense: false,
                isPwd: true,
                disable: false   
            }
        },

        computed: {
            ...mapGetters({
                message: 'errorbag/message',
                errorMessage: 'errorbag/errorMessage',
                newPhoneNumber: 'auth/phone',
            }),

            ConfirmPWD() {
                return [
                    (v) => !!v || "Choose a password",
                    (v) => v == this.$refs.fldPasswordChange.value || "Password does not match"
                 ]
            },
            Required() {
                return [(v) => !!v || 'Choose a password']
            }
        },
            
        methods:{
            ...mapActions({
              stepOneValidation: 'auth/sendPhoneNumber',
              stepTwoValidation: 'auth/verifyOTP',
              stepThreeValidation: 'auth/signUp',
            }),

            submitPhone(){
                this.disable = true 
                this.stepOneValidation(this.form).then((res) => {
                    this.newUser.phone = "234"+this.newPhoneNumber.phone
                    this.disable = false 
                    return this.step = 2 
                })
                .catch((error) => {
                    this.errorMessages = error
                    console.log(this.errorMessages)
                    this.disable = false 
                    if(this.errorMessages.phone){
                        this.negativeNotification(error.phone[0])
                    }
                    if(this.errorMessages){
                        this.negativeNotification(this.errorMessages)
                    }
                })           
            },

            submitOTP(){
                this.disable = true 
                this.stepTwoValidation({
                    phone : this.newPhoneNumber.phone,
                    otp: this.otpCode,
                }).then((res) => {
                    this.disable = false 
                    return this.step = 3
                })
                .catch((error) => {
                    console.log(error)
                    this.disable = false 
                    this.errorMessages = error
                    if(error){
                        this.negativeNotification(error.error)
                    }
                }) 
            },

            submitNewUser(){
                this.disable = true 
                this.stepThreeValidation(this.newUser).then((res) => {
                    this.positiveNotification('Welcome!! you are now logged in')
                    this.disable = false 
                    return this.$router.push({name: 'userDashboard'})
                }).catch((error) => {
                    console.log(error)
                    this.disable = false 
                    this.errorMessages = error
                    if(error){
                        this.negativeNotification(error.error)
                    }
                })
            },

            positiveNotification(message){
                Notify.create({
                    type: 'positive',
                    color: 'positive',
                    timeout: 6000,
                    position: 'center',
                    message: message
                })
            },

            negativeNotification(error){
                Notify.create({
                    type: 'negative',
                    color: 'negative',
                    timeout: 6000,
                    position: 'center',
                    message: error
                })
            },
        }
    }
</script>
