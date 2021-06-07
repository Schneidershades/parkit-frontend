<template>
	<div class="fixed-center">
		<div class="card-body ">
			<div class="column">
				<div class="row">
					<q-card square bordered class="shadow-1" style="width:290px ">
						<q-card-section>
							<q-card-actions align="center">
                                <img src="~assets/parkit_lm_logo.png" alt="Parkit Location Manager" width="180" v-if="platform != 'desktop'" >
                                <img src="~assets/express_logo.png" alt="Parkit Location Manager" width="180" v-else>
				            </q-card-actions>

                            <q-banner dense rounded inline-actions v-if="message" class="q-my-sm text-white bg-red">
                              {{message}}
                            </q-banner>

							<q-form class="q-gutter-sm" @submit="loginUser" ref="form">
								<q-input
									rounded
									v-model="form.username"
									label="username"
                                	lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type in your username']"
                                />
								<q-input
									rounded
									v-model="form.password"
									type="password"
									label="password"
					                lazy-rules
					                :rules="[ val => val && val.length > 0 || 'Please type in your password']"
									/>

								<q-card-actions align="right">
									<q-btn type="submit" unelevated color="primary" size="md"  label="Login" />
								</q-card-actions>

                                <q-card-actions align="left" class="q-mt-lg">
                                    <q-btn color="green" unelevated align="right" @click="checkOnline">Online Status *</q-btn>
                                </q-card-actions>
							</q-form>
						</q-card-section>
					</q-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex'
    import { Notify } from 'quasar'
    const isOnline = require('is-online');

    export default{
        data(){
            return{
                form: {
                    username : '',
                    password: '',
                },
                logo: '',
                step: 1,
                dense: false,
                isPwd: true
            }
        },

        components:{
        },

        computed: {

            logoshow() {
                if(process.env.MODE == 'electron'){
                    return 'img/parkit_lm_logo.png'
                }

                if(process.env.MODE == 'cordova'){
                    return 'img/express_logo.png'
                }

                return null
            },
            ...mapGetters({
                user: 'auth/user',
                message: 'errorbag/message',
                errorMessage: 'errorbag/errorMessage',
                newPhoneNumber: 'auth/phone',
                connectedOnline: 'internetStatus/connected',
                orders: 'adminOrders/orders',
            })
        },

        methods:{
            ...mapActions({
              	login: 'auth/adminSignIn',
                connected: 'internetStatus/setConnection',
                checkOnlineStatus: 'internetStatus/checkOnline',
                // plate_numbers: 'customerPlateNumbers/getPlateNumbers',
            }),

            handleConnectivityChange(status) {
                console.log(status);

                if(status == false){
                    return this.negativeNotification('You are offline. Please connect to an available internet')
                }
            },

           loginUser(){
                (async () => {
                    var check = await isOnline()
                    this.connected(check).then((res) => {
                        if(check == false){
                            return this.negativeNotification('You are offline. Please connect to an available internet')
                        }else{
                            this.login(this.form).then((res) => {
                                this.positiveNotification('Welcome!! you are now logged in')
                                return this.$router.replace({name: 'desktopDashboard'})
                                // return this.$router.push({name: 'desktopDashboard'})
                            })
                        }
                    })
                })();
            },

            checkOnline(){
                (async () => {
                    var check = await isOnline()
                    this.checkOnlineStatus(check).then((res) => {
                        if(check == false){
                            return this.negativeNotification('You are offline. Please connect to an available internet')
                        }
                        if(check == true){
                            return this.positiveNotification('You are online')
                        }
                    })
                })();
            },

            positiveNotification(message){
                Notify.create({
                    type: 'positive',
                    color: 'positive',
                    timeout: 10000,
                    position: 'bottom',
                    message: message
                })
            },

            negativeNotification(error){
                Notify.create({
                    type: 'negative',
                    color: 'negative',
                    timeout: 10000,
                    position: 'bottom',
                    message: error
                })
            },
        },

        mounted () {
            
            if(process.env.MODE == 'electron'){
                return this.platform = 'electron'
            }

            // if(process.env.MODE == 'desktop'){
            //     return this.platform = 'desktop'
            // }

            if(process.env.MODE == 'cordova'){
                return this.platform = 'cordova'
            }
        }
    }
</script>
