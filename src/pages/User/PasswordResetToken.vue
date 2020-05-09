<template>
	<q-card style="width: 500px; max-width: 80vw; margin: auto;" class="q-pt-md"> 
        <q-card-actions align="center">
            <img src="statics/parkit_icon_logo.png" align="center" alt="Parkit Home service" width="300">
        </q-card-actions> 
        <div class="text-h6 text-center">Reset Password</div> 

        <q-card-section  style="max-height: 80vh" class="scroll">  
            <q-banner dense rounded inline-actions v-if="message" class="q-my-lg text-white bg-green">
                {{message}}
            </q-banner>

            <q-banner dense rounded inline-actions v-if="errorMessage" class="q-my-lg text-white bg-red">
                {{errorMessage}}
            </q-banner>

            <q-form
                @submit="resetPassword"
                class="q-gutter-md"
                v-if="resetUserPassword.token"
                >
                <div class="row">

                     <div class="col-xm-12 col-12">
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

                     <div class="col-xm-12 col-12">
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
                  <q-btn color="primary" type="submit" label="Reset Password" :disable="disable"/>
                </q-stepper-navigation>
            </q-form>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
            <q-btn to="/" label="Back to Home" color="primary" v-close-popup />
        </q-card-actions>
    </q-card>
</template>

<script>
    
    import { mapActions, mapGetters } from 'vuex'
    import { Notify } from 'quasar'

    export default{

        props :[
            'token'
        ],

        data(){
            return{
                resetUserPassword: {
                    token: '',
                    password: '',
                    password_confirmation: '',
                },

                

                otpCode: '',
                errorMessages: null,
                error: '',
                form : {
                    email : ''
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
              sendLink: 'auth/PasswordReset',
              checkPasswordResetToken: 'auth/CheckPasswordResetToken',
              NewPasswordReset: 'auth/NewPasswordReset',
            }),

            resetPassword(){
                this.disable = true 
                this.NewPasswordReset(this.resetUserPassword).then((res) => {
                    this.positiveNotification('Password Sucessfully changed. you can now login with credentials')
                    this.disable = false 
                    this.$router.replace({
                        name: 'home'
                    })
                }).catch((error) => {
                    this.errorMessages = error
                    this.disable = false 
                })           
            },

            submitPhone(){
                this.disable = true 
                this.stepOneValidation(this.form).then((res) => {
                    this.resetUserPassword.phone = "234"+this.newPhoneNumber.phone
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

        },
        mounted () {
            // if(this.$route.params.locationId = null || this.location==null){
            //   this.negativeNotification('Please wait for 5 seconds please')
            //   return this.$router.push({ path: `/admin/account` }) 
            // }
            
            this.checkPasswordResetToken(this.$route.params.token).then((res) => {
                if(res.status){
                    this.resetUserPassword.token = this.$route.params.token
                }
            })            
        }

    }
</script>
