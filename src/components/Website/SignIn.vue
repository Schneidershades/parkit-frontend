<template>
    <q-card flat style="width: 500px; max-width: 80vw;" class="q-pa-md">
        <q-card-section>
            <q-card flat class="my-card">
                <q-card-section>
                    <q-card-actions align="center">
                        <img src="statics/parkit_logo.png" align="center" alt="Parkit Home service" width="200">
                    </q-card-actions> 

                    <q-banner dense rounded inline-actions v-if="message" class="q-my-lg text-white bg-red">
                        {{message}}
                    </q-banner>
                </q-card-section>

                <q-tabs v-model="tab" class="text-primary">
                    <q-tab icon="phone"  label="Phone Number Sign In" name="one" color="primary"/>
                    <q-tab icon="mail" label="Email Sign In" name="two" color="primary"/>
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="one">
                        <q-form class="q-gutter-md" @submit="loginPhoneUser" ref="form">
                            <q-input
                                filled
                                v-model="phoneForm.phone"
                                prefix="+234"
                                label="Phone Number"
                                mask="(###) ### - ####"
                                unmasked-value
                                hint="Hint : (222) 222 - 2222"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please type in your phone number']"
                                />


                            <q-input 
                                filled 
                                v-model="phoneForm.password"
                                :type="isPwd ? 'password' : 'text'" 
                                label="Password"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please type in your password']"
                                >
                                <template v-slot:append>
                                    <q-icon
                                        :name="isPwd ? 'visibility_off' : 'visibility'"
                                        class="cursor-pointer"
                                        @click="isPwd = !isPwd"
                                        />
                                </template>
                            </q-input>

                            <q-card-actions align="center">
                                <q-btn type="submit" unelevated color="primary" size="lg" class="full-width" label="Login" />
                            </q-card-actions>
                        </q-form>
                    </q-tab-panel>

                    <q-tab-panel name="two">
                        <q-form class="q-gutter-md" @submit="loginEmailUser" ref="form">
                            <q-input
                                filled
                                type="email"
                                v-model="emailForm.email"
                                label="Email Address"
                                unmasked-value
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please type in your email address']"
                                />


                            <q-input 
                                filled 
                                v-model="emailForm.password"
                                :type="isPwd ? 'password' : 'text'" 
                                label="Password"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please type in your password']"
                                >
                                <template v-slot:append>
                                    <q-icon
                                        :name="isPwd ? 'visibility_off' : 'visibility'"
                                        class="cursor-pointer"
                                        @click="isPwd = !isPwd"
                                        />
                                </template>
                            </q-input>

                            <q-card-actions align="center">
                                <q-btn type="submit" unelevated color="primary" size="lg" class="full-width" label="Login" />
                            </q-card-actions>
                        </q-form>
                    </q-tab-panel>
              </q-tab-panels>
          </q-card>

            
           
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
            <q-btn flat label="Forgot Password" to="user/forgot-password" color="primary"  />
        </q-card-actions>
    </q-card>
</template>

<script>
    import router from '../../router/index';
    import { mapActions, mapGetters } from 'vuex'
    import { Notify } from 'quasar'
    
    export default{
        data(){
            return{
                phoneForm: {
                    phone: '',
                    password: ''
                },

                emailForm: {
                    email: '',
                    password: ''
                },

                isPwd: true,  
                tab: 'one'   
            }
        },
        computed: {
            ...mapGetters({
                message: 'message',
            })
        },
            
        methods:{
            ...mapActions({
              login: 'auth/signIn',
            }),

            loginEmailUser(){
                this.login(this.emailForm).then((res) => {
                    this.positiveNotification('Welcome!! you are now logged in')
                    return this.$router.push({name: 'userDashboard'})
                }).catch((error) => {
                    // console.log(error)
                    this.errorMessages = error
                    if(error){
                        this.negativeNotification(error.error)
                    }
                })
            },

            loginPhoneUser(){
                this.login(this.phoneForm).then((res) => {
                    this.positiveNotification('Welcome!! you are now logged in')
                    return this.$router.push({name: 'userDashboard'})
                }).catch((error) => {
                    // console.log(error)
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
