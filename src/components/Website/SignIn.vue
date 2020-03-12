<template>
    <q-card flat style="width: 500px; max-width: 80vw;" class="q-pa-md">
        <q-card-section>
            <div class="text-h6 text-center">Sign In</div>
            <q-card-actions align="center">
                <img src="statics/parkit_icon_logo.png" align="center" alt="Parkit Home service" width="300">
            </q-card-actions> 

            <q-banner dense rounded inline-actions v-if="message" class="q-my-lg text-white bg-red">
                {{message}}
            </q-banner>
           
        </q-card-section>
        <!-- <q-separator /> -->
        <q-card-section style="max-height: 50vh" class="scroll">
            <q-input
                filled
                v-model="form.phone"
                prefix="+234"
                label="Phone Number"
                mask="(###) ### - ####"
                unmasked-value
                hint="Hint : (222) 222 - 2222"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type in your phone number']"
                />
            <br><br>
            <q-input 
                filled 
                v-model="form.password"
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
        </q-card-section>
        <q-separator />

        <q-card-actions align="center">
            <q-btn label="Close" color="primary" v-close-popup />
            <q-btn @click="loginUser" label="Sign In" color="primary"  />
        </q-card-actions>

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
                form: {
                    phone: '',
                    password: ''
                },

                isPwd: true,     
            }
        },computed: {
            ...mapGetters({
                message: 'message',
            })
        },
            
        methods:{
            ...mapActions({
              login: 'auth/signIn',
            }),

            loginUser(){
                if( this.form.email != '' && this.form.password != ''){
                    this.login(this.form).then((res) => {
                        this.positiveNotification('Welcome!! you are now logged in')
                        return this.$router.push({name: 'userDashboard'})
                    }).catch((error) => {
                        console.log(error)
                        this.errorMessages = error
                        if(error){
                            this.negativeNotification(error.error)
                        }
                    })
                }else{
                    this.negativeNotification('All fields are required')
                }
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
