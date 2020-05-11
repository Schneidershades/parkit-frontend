<template>
    <q-card flat style="width: 500px; max-width: 80vw;" class="q-pa-md" v-if="deletePrivilege==null || deletePrivilege==false ">
        <!-- {{deletePrivilege}} -->
        <q-card-section>
            <div class="text-h6 text-center">Delete Order Request</div>
            <q-card-actions align="center">
                <img src="statics/parkit_icon_logo.png" align="center" alt="Parkit Home service" width="300">
            </q-card-actions> 
           
        </q-card-section>

        <q-card-section style="max-height: 50vh" class="scroll" v-if="online === true || online === null">
            <q-select 
                filled 
                v-model="form.username" 
                :options="usernames" 
                label="Select User *"
                lazy-rules
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

        <q-card-section style="max-height: 50vh" class="scroll" v-else>
            please connect to an internet
        </q-card-section>


        <q-separator />

        <q-card-actions align="center">
            <q-btn label="Close" color="primary" v-close-popup />
            <q-btn @click="loginUser" label="Sign In" color="primary"  />
        </q-card-actions>
    </q-card>
</template>

<script>
    import router from '../../../router/index';
    import { mapActions, mapGetters } from 'vuex'
    import { Notify } from 'quasar'
    
    export default{
        data(){
            return{
                form:{
                    username: null,
                    password: '',
                    permission: 'edit_orders',
                },
                usernames: [],
                isPwd: true,     
            }
        },computed: {
            ...mapGetters({
                message: 'message',
                usersWithRights: 'adminOrders/usersWithRights',
                deletePrivilege: 'adminOrders/deletePrivilege',
                online: 'auth/onlineStatus',
            })
        },
            
        methods:{
            ...mapActions({
                login: 'adminOrders/signInaUserWithDeletePrivilege',
                getRight: 'adminOrders/getUsersWithRight',
            }),

            loginUser(){
                if( this.form.username != '' && this.form.password != '' && this.form.permission != ''){
                    this.login(this.form).then((res) => {
                        this.positiveNotification('Welcome!! you can now edit an order')
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
        }, 
        mounted(){
            if(this.getRight('delete_orders')){
                this.usernames = this.usersWithRights
            }
        }
    }
</script>
