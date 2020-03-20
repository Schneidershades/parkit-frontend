<template>
	<q-card style="width: 500px; max-width: 80vw; margin: auto;" class="q-pt-md">


        <div class="text-h6 text-center">Reset Password</div>  
        <q-card-actions align="center">
            <img src="statics/parkit_icon_logo.png" align="center" alt="Parkit Home service" width="300">
        </q-card-actions> 

        <q-card-section  style="max-height: 80vh" class="scroll">  
            <q-banner dense rounded inline-actions v-if="message" class="q-my-lg text-white bg-green">
                {{message}}
            </q-banner>

            <q-banner dense rounded inline-actions v-if="errorMessage==null || errorMessage==[]" class="q-my-lg text-white bg-red">
                {{errorMessage}}
            </q-banner>
        
            <div class="gi">
                <q-stepper
                  v-model="step"
                  header-nav
                  ref="stepper"
                  color="primary"
                  animated
                  flat
                  
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
                            class="q-gutter-md"
                            ref="form"
                        >
                           <q-input
                                filled
                                prefix="+234"
                                v-model="form.phone"
                                label="Phone Number"
                                mask="(###) ### - ####"
                                unmasked-value
                                hint="Hint : (703) 222 - 2222"
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
                        title="Input OTP"
                        icon="create_new_folder"
                        :done="step > 2"
                        :header-nav="step > 2"
                      >
                        <q-form
                            @submit="submitOTP"
                            class="q-gutter-md"
                        >
                            Kindly provide your OTP Code.
                            <q-input
                                filled
                                prefix="G-"
                                v-model="otpCode"
                                label="OTP"
                                mask="####"
                                unmasked-value
                                hint="Hint : 5705"
                                lazy-rules
                                :rules="[val => !!val || '* Required', val => val && val.length > 0 || 'Please type in OTP received']"
                                />

                            <q-stepper-navigation>
                              <q-btn type="submit" color="primary" label="Continue" :disable="disable" />
                              <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" :disable="disable"/>
                            </q-stepper-navigation>
                        </q-form>
                    </q-step>

                  <q-step
                    :name="3"
                    title="Reset your password"
                    icon="add_comment"
                    :header-nav="step > 3"
                  >
                    <q-form
                        @submit="resetPassword"
                        class="q-gutter-md"
                    >
                        <div class="row">
                            <div class="col-6 q-pl-sm">
                                <q-input
                                    filled
                                    prefix="+234"
                                    v-model="form.phone"
                                    label="Phone Number"
                                    :dense="dense"
                                    mask="(###) ### - ####"
                                    unmasked-value
                                    readonly
                                    hint="Hint : (703) 749 - 5705"
                                    lazy-rules
                                    />
                            </div>

                             <div class="col-6 q-pl-sm">
                                <q-input filled
                                        v-model="resetUserPassword.password"
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

                             <div class="col-6 q-pl-sm">
                                <q-input filled
                                        v-model="resetUserPassword.password_confirmation"
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

                        <q-stepper-navigation>
                          <q-btn color="primary" type="submit" label="Finish" :disable="disable"/>
                          <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" :disable="disable"/>
                        </q-stepper-navigation>
                    </q-form>
                  </q-step>
                </q-stepper>
              </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
            <q-btn to="/" label="Back to Home" color="primary" v-close-popup />
            <q-btn label="Reset" color="home" text-color="primary" @click="step = 1" />
        </q-card-actions>
    </q-card>
</template>

<script>
    
    import { mapActions, mapGetters } from 'vuex'
    import { Notify } from 'quasar'

    export default{
        data(){
            return{
                 resetUserPassword: {
                    phone : '',
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
                message: 'message',
                errorMessage: 'errorMessage',
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
              stepOneValidation: 'auth/sendForgotPasswordPhoneNumber',
              stepTwoValidation: 'auth/verifyForgotPasswordOTP',
              stepThreeValidation: 'auth/ForgotPasswordChange',
            }),

            submitPhone(){
                this.disable = true 
                this.stepOneValidation(this.form).then((res) => {
                    this.resetPassword.phone = "234"+this.newPhoneNumber.phone
                    this.disable = false 
                    return this.step = 2 
                })
                .catch((error) => {
                    this.errorMessages = error
                    this.disable = false 
                    console.log(this.errorMessages)
                    if(this.errorMessages.phone){
                        this.negativeNotification(error.phone[0])
                    }
                    if(this.errorMessages){
                        this.negativeNotification(this.errorMessages)
                        // this.negativeNotification('The phone number does not exist')
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
                        // this.negativeNotification('cannot verify otp')
                    }
                }) 
            },

            resetPassword(){
                this.disable = true
                this.stepThreeValidation(this.resetUserPassword).then((res) => {
                    this.positiveNotification('Password Sucessfully changed. you can now login with credentials')
                    this.disable = false 
                    this.$router.replace({
                        name: 'home'
                    })
                }).catch((error) => {
                    console.log(error)
                    this.errorMessages = error
                    this.disable = false 
                    if(error){
                        this.negativeNotification(error.error)
                        // this.negativeNotification('Cannot change password')
                    }
                })
            },

            positiveNotification(message){
                Notify.create({
                    type: 'positive',
                    color: 'positive',
                    timeout: 3000,
                    position: 'center',
                    message: message
                })
            },

            negativeNotification(error){
                Notify.create({
                    type: 'negative',
                    color: 'negative',
                    timeout: 3000,
                    position: 'center',
                    message: error
                })
            },
        }
    }
</script>
