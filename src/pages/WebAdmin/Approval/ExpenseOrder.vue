<template>
	<div class="fixed-center">
		<div class="card-body ">
			<div class="column">
				<div class="row">
					<q-card square bordered class="q-pa-lg shadow-1" style="width:400px ">
						<q-card-section v-if="expenseOrderDetails">
							<q-card-actions align="center">
				                <img src="~assets/parkit_lm_logo.png" alt="Parkit Location Manager" width="300">
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
                                    readonly
                                	lazy-rules
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

                                <q-select
                                    filled
                                    v-model="form.status"
                                    :options="decisions"
                                    label="Select Option *"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please select an option']"
                                />

								<q-card-actions>
									<q-btn type="submit" unelevated color="primary" size="md" class="full-width" label="Process" />
								</q-card-actions>
							</q-form>
						</q-card-section>

                        <q-card-section v-if="expenseOrderDetails==null">
                            <div class="text-h6" style="color:black">Sorry {{form.username}}!!! This Item is not available on record. Please be sure to select the right link to initate action</div>
                        </q-card-section>
					</q-card>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

	.login-box {
	  	width: 400px;
	  	margin: 70px 70px 70px 70px;
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
    const isOnline = require('is-online');

    export default{
        props: [
            'userId',
            'username',
        ],

        data(){
            return{
                form: {
                    id : '',
                    username : '',
                    password: '',
                    status: '',
                    permission: 'edit_expenseOrders',
                },
                step: 1,
                dense: false,
                isPwd: true,

                decisions: [
                    'decline',
                    'approve'
                ]
            }
        },

        components:{
        },

        computed: {
            ...mapGetters({
                user: 'auth/user',
                message: 'errorbag/message',
                errorMessage: 'errorbag/errorMessage',
                newPhoneNumber: 'auth/phone',
                connectedOnline: 'internetStatus/connected',
                orders: 'adminOrders/orders',
                expenseOrderDetails: 'expenseOrders/expenseOrderDetails',
            })
        },

        methods:{
            ...mapActions({
              	login: 'auth/adminSignIn',
                connected: 'internetStatus/setConnection',
                checkOnlineStatus: 'internetStatus/checkOnline',
                approveExpenseOrder: 'expenseOrders/approveExpenseOrder',
                findExpenseOrders: 'expenseOrders/findExpenseOrders',
            }),

           loginUser(){
                (async () => {
                    var check = await isOnline()
                    this.connected(check).then((res) => {
                        if(check == false){
                            return this.negativeNotification('You are offline. Please connect to an available internet')
                        }else{
                            this.approveExpenseOrder(this.form).then((res) => {
                                // this.positiveNotification('Welcome!! you are now logged in')
                                // return this.$router.replace({name: 'home'})
                                // return this.$router.push({name: 'desktopDashboard'})
                            })
                        }
                    }).catch(() => {
                        console.log('none')
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
        mounted(){
            this.findExpenseOrders(this.$route.params.userId)

            this.form.id = this.$route.params.userId
            this.form.username = this.$route.params.username
        }
    }
</script>
