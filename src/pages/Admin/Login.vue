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

        computed: {
            ...mapGetters({
                message: 'message',
                errorMessage: 'errorMessage',
                newPhoneNumber: 'auth/phone',
            })
        },
            
        methods:{
            ...mapActions({
              	login: 'auth/adminSignIn',
            }),

           loginUser(){
                this.login(this.form).then((res) => {
                    this.positiveNotification('Welcome!! you are now logged in')
                    return this.$router.push({name: 'adminDashboard'})
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
