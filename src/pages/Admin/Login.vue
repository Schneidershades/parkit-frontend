<template>
	<div class="login-box card">
		<div class="card-body ">
			<div class="column">
				<div class="row">
					<q-card square bordered class="q-pa-lg shadow-1" style="width:400px ">
						<q-card-section>
							<q-card-actions align="center">
				                <img src="statics/parkit_lm_logo.png" alt="Parkit Location Manager" width="300">
				            </q-card-actions> 

                            <!-- <offline @detected-condition="handleConnectivityChange"></offline> -->
                            <!-- <connection-light></connection-light> -->
                            <!-- <div>{{connected}}</div> -->

                            <!-- <q-btn color="black"  v-if="connectedOnline==false">Offline</q-btn> -->
                            <!-- <q-btn color="green"  v-if="connectedOnline==true">Online</q-btn> -->

                            <q-banner dense rounded inline-actions v-if="message" class="q-my-lg text-white bg-red">
                              {{message}}
                            </q-banner>

							<q-form class="q-gutter-md" @submit="loginUser" ref="form">
								<q-input 
									square 
									filled  
									v-model="form.username" 
									label="username"
                                	lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type in your username']"
                                />
								<q-input 
									square 
									filled  
									v-model="form.password" 
									type="password" 
									label="password" 
					                lazy-rules
					                :rules="[ val => val && val.length > 0 || 'Please type in your password']"
									/>

								<q-card-actions>
									<q-btn type="submit" unelevated color="primary" size="lg" class="full-width" label="Login" />
								</q-card-actions>
                                <q-card-actions align="right">
                                    <q-btn color="green" unelevated align="right" @click="checkOnline">check internet status</q-btn>
                                </q-card-actions>
							</q-form>
						</q-card-section>
					</q-card>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.login-register {
	  	background-size: cover;
	  	background-repeat: no-repeat;
	  	background-position: center center;
	  	height: 100%;
	  	width: 100%;
	  	padding: 10% 0;
	  	position: fixed; 
	}

	.login-box {
	  	width: 400px;
	  	margin: 70px auto; 
	}
  	.login-box .footer {
	    width: 100%;
	    left: 0px;
	    right: 0px; 
	}
  	.login-box .social {
    	display: block;
    	margin-bottom: 30px; 
	}

	#recoverform {
  		display: none; 
  	}

	.login-sidebar {
  		padding: 0px;
  		margin-top: 0px; 
  	}
  	.login-sidebar .login-box {
    	right: 0px;
    	position: absolute;
    	height: 100%; 
	}
</style>

<script>
    
    import { mapActions, mapGetters } from 'vuex'
    import { Notify } from 'quasar'
    import offline from 'v-offline'
    import ConnectionLight from 'components/Connectivity/Connectivity.vue'
    const isOnline = require('is-online');

    export default{
        data(){
            return{
                form: {
                    username : '',
                    password: '',
                },
                step: 1,
                dense: false,
                isPwd: true   
            }
        },

        components:{
            offline,
            // ConnectionLight
        },

        computed: {
            ...mapGetters({
                user: 'auth/user',
                message: 'message',
                errorMessage: 'errorMessage',
                newPhoneNumber: 'auth/phone',
                connectedOnline: 'internetStatus/connected',
            })
        },
            
        methods:{
            ...mapActions({
              	login: 'auth/adminSignIn',
                connected: 'internetStatus/setConnection',
                checkOnlineStatus: 'internetStatus/checkOnline',
                // plateNumbers: 'customerPlateNumbers/getPlateNumbers',
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
                                return this.$router.replace({name: 'adminDashboard'})
                                // return this.$router.push({name: 'adminDashboard'})
                            }).catch((error) => {
                                this.disable = false 
                                this.errorMessages = error
                                if(error){
                                    this.negativeNotification(error.error)
                                }
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
        }
    }
</script>
