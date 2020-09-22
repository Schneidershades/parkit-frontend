<template>
	<q-page padding>
		<div class="q-pa-md q-gutter-sm print-hide">
			<q-breadcrumbs>
				<q-breadcrumbs-el label="Home" />
				<q-breadcrumbs-el label="Online Transaction" />
			</q-breadcrumbs>
		</div>

		<!-- {{transactionDetails}}
		<br>
		<br>
		{{order}} -->

	    <div id="ticketPrinter">
			<div class="ticket print-only" v-if="orderTransaction">

				<q-card-actions align="center">
		            <img src="~assets/parkit_logo.png" alt="Parkit Home service" width="150">
		            <i>Welcome to parkit</i>
		        </q-card-actions>

		        <div class="q-py-sm">
		        	<b>Location : {{orderTransaction.location ? orderTransaction.location.code : ''}} -  {{orderTransaction.location ? orderTransaction.location.address : ''}}<br>
					Phone   : +234-903-152-6466 <br> 
					Email   : info@parkit.ng<br>
					Website   : www.parkit.ng<br></b>
				</div>
				<div class="q-py-sm">
					<b>Bill ID   : {{orderTransaction.receipt_number}}<br>
					Date   : {{orderTransaction.date}}<br>
					Time   : {{orderTransaction.time}}<br>
					Cashier   : {{orderTransaction.cashier}}<br>
					To   : {{orderTransaction.vehicle ? orderTransaction.vehicle.first_name : 'N/A'}} {{orderTransaction.vehicle.last_name}}<br>
					Transaction ID   : {{orderTransaction.vehicle.plate_number ? orderTransaction.vehicle.plate_number : 'Not Registered'}}<br>
					Payment Method   : {{orderTransaction.payment_method == 'not_paid' ? 'Not Paid' : ''}}
					{{orderTransaction.payment_method == 'pos' ? 'POS' : ''}}
					{{orderTransaction.payment_method == 'cash' ? 'Cash' : ''}}
					{{orderTransaction.payment_method == 'transfer' ? 'Transfer' : ''}}

					<br></b>
		        </div>
		       		
				<div class="text-h6">Items</div>
				
				<div class="q-py-sm" v-for="item in orderTransaction.packages" :key="item.id">
					<p>
						<b>{{item.package}} - {{item.vehicle}}  || {{item.quantity}} @ ₦ {{item.amount}} || Total: ₦ {{item.total}}</b>
					</p>
				</div>
				<div class="q-py-sm" >
					<b align="right">Sub-total: ₦{{orderTransaction.sub_total}}<br>
					<template v-if="orderTransaction.discount!=null">
						<template v-if="orderTransaction.discount.amountDiscount != null">
							Net-Total: ₦ {{ orderTransaction.discount.amountDiscount }}
						</template>
						<template v-if="orderTransaction.discount.percentageDiscount != null">
							Net-Total: ₦ {{ orderTransaction.percentageDiscount/100 * orderTransaction.sub_total }}
						</template>
					</template>
					<template v-if="orderTransaction.coupon!=null">
						<template v-if="orderTransaction.coupon.amountDiscount != null">
							Net-Total: ₦ {{ orderTransaction.coupon.amountDiscount }}
						</template>
						<template v-if="orderTransaction.coupon.percentageDiscount != null">
							Net-Total: ₦ {{ orderTransaction.coupon.percentageDiscount/100 * orderTransaction.sub_total }}
						</template>
					</template>

					<template v-if="orderTransaction.discount==null && orderTransaction.coupon==null">
						Net-Total: ₦ 0.00
					</template>
					
					<br>
					Total: ₦ {{orderTransaction.total}}
					</b>
					<br><br><br>
		            	<i>Thank you for your patronage</i>
		            	<hr>
		            <b align="center"><i>Would you like to own a parkit car wash Franchise or be a parkit car wash mobile operator
						Call: 09031526466 or send a mail to franchise@parkit.ng
					</i></b>
					<br><br>
					<br>
					
					<hr>
				</div>
			</div>
	    </div>
	    
		<div class="q-pa-md print-hide">
			<div class="q-gutter-y-md">
			    <q-stepper
			      v-model="step"
			      vertical
			      color="primary"
			      animated
			    >
			      	<q-step
				        :name="1"
				        title="Find user transaction"
				        icon="settings"
				        :done="step > 1"
				      >
				        <div class="q-pa-md">
						    <template >
						    	<q-card-actions align="left">
								    <div class="q-px-sm row no-wrap items-center">
								    	<div class="col-md-12">
									      	<q-radio v-model="find_transaction_via" val="phone" label="Phone Number" />
									      	<q-radio v-model="find_transaction_via" val="email" label="Email" />
								      	</div>
								      	<div class="col-md-6">
									     	 search transaction through: <strong>{{ find_transaction_via }}</strong>
								      	</div>					      	
								    </div>
							    </q-card-actions>
						    	<q-form
		                            @submit.prevent="findTransaction('phoneNumber', transaction.phone)"
		                            	ref="form"
		                            	v-if="find_transaction_via=='phone'"
		                        	>
		                        	<div class="row" >
		                        		<h6 class="col-12 q-pl-sm">Phone Number</h6>
			                            <div class="col-4 q-pr-md">
			                                <q-input
								                filled
								                v-model="transaction.phone"
								                prefix="+234"
								                label="Phone Number"
								                mask="(###) ### - ####"
								                unmasked-value
								                hint="Hint : (703) 749 - 5705"
								                lazy-rules
								                :rules="[ val => val && val.length > 0 || 'Please type in your phone number']"
								                />
			                            </div><br>
			                            <div class="col-4">
									      	<q-btn
										        type="submit"
										        :loading="submitting"
										        label="Find Transaction"
										        class="q-mt-md"
										        color="primary"
										    >
									        <template v-slot:loading>
									          <q-spinner-facebook />
									        </template>
									      </q-btn>
									    </div>
			                        </div>
		                        </q-form>
		                        <q-form
		                            @submit.prevent="findTransaction('orderNumber', transaction.orderId)"
		                            ref="form"
		                             v-if="find_transaction_via=='email'"
		                        	>
		                        	<div class="row">
		                        		<h6 class="col-12 q-pl-sm">Email</h6>
			                            <div class="col-4 q-pr-md">
			                                <q-input
			                                   	ref="name"
			                                    filled
			                                    v-model="newUser.email"
			                                    label="Your Email *"
			                                    hint="Please insert your email"
			                                    lazy-rules
			                                    :rules="[ val => val && val.length > 0 || 'Please type something']"
			                                />
			                            </div>
			                            <div class="col-4">
									      	<q-btn
										        type="submit"
										        :loading="submitting"
										        label="Find Transaction"
										        class="q-mt-md"
										        color="primary"
										    >
									        <template v-slot:loading>
									          <q-spinner-facebook />
									        </template>
									      </q-btn>
									    </div><br>
			                        </div> 
		                        </q-form>
							</template>

							<Transactions/>

				    		<!-- {{transactionDetails}} -->
						</div>
            		
				        <q-stepper-navigation>
				          	<q-btn v-if="transactionDetails!=null" @click="step = 2" color="primary" label="Continue" />
				        </q-stepper-navigation>
				    		<!-- {{transactionDetails}} -->
			      	</q-step>

				    <q-step
				        :name="2"
				        title="View Order Packages"
				        caption="Customer choosen Packages"
				        icon="create_new_folder"
				        :done="step > 2"
				    	>

				      		<TransactionDetailsPackage/>
				        <q-stepper-navigation>
				          	<q-btn v-if="transactionDetails!=null" @click="step = 3" color="primary" label="Continue" />
				          	<q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
				        </q-stepper-navigation>
				    </q-step>

				    <q-step
				        :name="3"
				        title="Payment Method"
				        icon="money"
				        :done="step > 3"
				      >
						<!-- {{order}} -->
	
				        <div class="q-pa-md" v-if="transactionDetails">

				        	<div v-if="transactionDetails.payment_status=='pending'">
								<div class="q-gutter-sm" v-if="transactionDetails.free==true">
							      	<q-radio v-model="order.payment_method" val="free" label="Free Wash" checked/>
							    </div>
							    <div class="q-gutter-sm" v-if="transactionDetails.free==false && transactionDetails.payment_status!='successful'">
						      		<q-radio v-model="order.payment_method" val="not_paid" label="Not Paid" />
						      		<q-radio v-model="order.payment_method" val="pos" label="POS Machine" />
						      		<q-radio v-model="order.payment_method" val="cash" label="Cash" />
							    </div>
				        	</div>
				        	<div v-if="transactionDetails.payment_status=='successful'">
				        		<q-radio v-model="order.payment_method" val="card" label="Card" checked/>
				        		User Paid Online (<i>Please proceed</i>)
				        	</div>					    

						</div>

				        <q-stepper-navigation>
				          	<q-btn @click="storeOnlineTransactionOffline" color="primary" label="Continue" />
				          	<q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
				        </q-stepper-navigation>
				    </q-step>

				    <q-step
					        :name="4"
					        title="Print Invoice"
					        icon="print"
					      >
						
				        <q-stepper-navigation>
				          	<q-btn @click="begin" color="primary" label="Finish" />
				          	<!-- <q-btn flat @click="step = 3" color="primary" label="Back" class="q-ml-sm" /> -->
				        </q-stepper-navigation>
				    </q-step>
			    </q-stepper>
			</div>
		</div>


	</q-page>
</template>

<style scoped>
	@page { margin: 0; }
	.ticket {
	    font-size: 11px;
	    margin:0;
	}

	td,
	th,
	tr,
	table {
	    border-top: 1px solid black;
	    border-collapse: collapse;
	}

	td.description,
	th.description {
	    width: 75px;
	    max-width: 75px;
	}

	td.quantity,
	th.quantity {
	    width: 40px;
	    max-width: 40px;
	    word-break: break-all;
	}

	td.price,
	th.price {
	    width: 40px;
	    max-width: 40px;
	    word-break: break-all;
	}

	.centered {
	    text-align: center;
	    align-content: center;
	}

	.ticket {
	    width: 200px;
	    max-width: 155px;
	}

	@page{
		margin:0cm;
	}

</style>

<script>
    
    import { mapActions, mapGetters } from 'vuex'
	import { date } from 'quasar'
    import { Notify } from 'quasar'
  	import TabList from 'components/Tabs/TabList.vue'
    import Cart from 'components/Admin/Cart/Cart.vue'
    import Transactions from 'components/Admin/Orders/Transactions.vue'
    import TransactionDetailsPackage from 'components/Admin/Orders/TransactionDetailsPackage.vue'
    import PrintTransaction from 'components/Admin/Orders/PrintTransaction.vue'
    const isOnline = require('is-online');
	// const { remote } = require('electron')

    export default{
    	components:{
	        // TabList,
	        // Cart,
	        Transactions,
	        TransactionDetailsPackage,
	        // PrintTransaction
	    },
        data(){
            return{
                newUser: {
                    phone : '',
                    vehicle_type: '',
                    vehicle_model: '',
                    first_name: '',
                    last_name: '',
                    plate_number: '',
                },

                order: {
                	receipt_number : null,
                	vehicle: {
	                    id : null,
	                    phone : null,
	                    email : null,
	                    vehicle_type: null,
	                    vehicle_model: null,
	                    first_name: null,
	                    last_name: null,
	                    plate_number: null,
	                    userId: null,
	                },
	                packages: null,
	                customer_id: null,
					location: null,
					location_id: null,
					discount: null,
					discount_id: null,
					coupon: null,
					coupon_id: null,
	                payment_method: '',
	                sub_total: null,
	                total: null,
					platform_initiated: 'web',
	                status: 'pending',
	                action: null,
	                reason: null,
	                cashier_id: null,
	                cashier: null,
	                free_wash: null,
	                discounted_amount: 0,
	                date: null,
	                time: null
                },

                transaction:{
                	phone: '',
                	orderId: '',
                },

                payment_method: 'cash',
                errorMessages: [],
                error: '',
                plateNumber : {
                    number : ''
                },
                vehicles: [
			        'SALOON CAR', 
			        'SUV & SPACE BUS', 
			        'TRUCK', 
			        '14 SEATER BUS', 
			        '18 SEATER BUS', 
			        '32 SEATER BUS', 
			        '36 SEATER BUS', 
			        'PICKUP TRUCK', 
			        'CARGO TRUCK', 
			        'MOTOCYCLE', 
			    ],

			    models: [
			        'Toyota', 
			        'Honda', 
			        'BMW', 
			    ],

                step: 1,
                dense: true,
      			splitterModel: 20,
      			trigger: false,
      			readonly: true,
      			theModel: null,
      			submitting: false,
      			readonlyOrderId: false,
      			denseOrderId: false,
      			find_transaction_via: 'phone',
            }
        },

        computed: {
            ...mapGetters({
                message: 'message',
                errorMessage: 'errorMessage',
                newPhoneNumber: 'auth/phone',
                plateVehicleDetails: 'plateNumber/plateNumberDetails',
                cart: 'shopping/cart',
				userDiscountPrivilege: 'shopping/userDiscountPrivilege',
				discount: 'shopping/discount',
				discountDetails: 'shopping/discountDetails',
				allTransactions: 'onlineTransaction/allTransactions',
				transactionDetails: 'onlineTransaction/transactionDetails',
                orderTransaction: 'adminOrders/transaction',
		        user: 'auth/user',
            }),
        },
            
        methods:{
            ...mapActions({
              	sendPlatenumber: 'plateNumber/getPlateNumber',
              	updateCustomer: 'plateNumber/updateCustomer',
				placeCustomerOrder: 'orders/placeOrder',
				getTransactionOrdersOnline: 'onlineTransaction/getTransactionOrdersOnline',
				clearTransaction: 'onlineTransaction/transactionOrderSelected',
				saveTransaction: 'adminOrders/saveTransaction',
                connected: 'internetStatus/setConnection',
            }),

			findTransaction(type, item){
				(async () => {
                    var check = await isOnline()
                    console.log(check);
                    this.connected(check).then((res) => {
                        if(check == false){
                            return this.negativeNotification('You are offline. Please connect to an available internet')
                        }else{
			                if(type == 'phoneNumber'){
								console.log(item)
								this.getTransactionOrdersOnline({phone: item}).then((response) => {
									// this.$router.push({name: 'userOrderShow'})      		
					            }).catch((error) => {
					                console.log(error)
					                if(this.errorMessage){
					                    this.negativeNotification('cannot process order at the moment')
					                }
					            }) 
							}

							if(type== 'orderNumber'){
								console.log(item)
								this.getTransactionOrdersOnline({email: item}).then((response) => {
									// this.$router.push({name: 'userOrderShow'})      		
					            }).catch((error) => {
					                console.log(error)
					                if(this.errorMessage){
					                    this.negativeNotification('cannot process order at the moment')
					                }
					            }) 
							}  
                        }
                    })
                    
                })(); 		
			},

            submitFindVehicle(){
                this.sendPlatenumber(this.plateNumber.number).then((res) => {
                    this.trigger = true
                    this.newUser.plate_number = this.plateNumber.number
                    console.log(this.plateVehicleDetails)
                    this.newUser.phone = this.plateVehicleDetails.user.phone
                    this.newUser.first_name = this.plateVehicleDetails.user.first_name
                    this.newUser.last_name = this.plateVehicleDetails.user.last_name
                    this.newUser.vehicle_type = this.plateVehicleDetails.vehicle
                    this.newUser.vehicle_model = this.plateVehicleDetails.model
                }).catch((error) => {
                    this.errorMessages = error
                    console.log(this.errorMessages)
                    if(this.errorMessages){
                        this.negativeNotification(this.errorMessages)
                    }
                })    
            },

            updateUser(){
            	this.updateCustomer(this.newUser).then((res) => {
      				this.readonly = true
                    this.newUser.plate_number = this.plateNumber.number
                    console.log(this.plateVehicleDetails)
                    this.newUser.phone = this.plateVehicleDetails.user.phone
                    this.newUser.first_name = this.plateVehicleDetails.user.first_name
                    this.newUser.last_name = this.plateVehicleDetails.user.last_name
                    this.newUser.vehicle_type = this.plateVehicleDetails.vehicle
                    this.newUser.vehicle_model = this.plateVehicleDetails.model
                }).catch((error) => {
                    this.errorMessages = error
                    console.log(this.errorMessages)
                    if(this.errorMessages){
                        this.negativeNotification(this.errorMessages)
                    }
                })
            },

            storeOnlineTransactionOffline(){
            	this.order.receipt_number = this.transactionDetails.receipt_number ? this.transactionDetails.receipt_number : null
				this.order.vehicle.id = this.transactionDetails.vehicle ? this.transactionDetails.vehicle.id : null
    			this.order.vehicle.email = this.transactionDetails.customer ? this.transactionDetails.customer.email : null
        		this.order.vehicle.plate_number = this.transactionDetails.vehicle ? this.transactionDetails.vehicle.plate_number : null
	            this.order.vehicle.phone =  this.transactionDetails.customer ? this.transactionDetails.customer.phone : null
	            this.order.vehicle.userId =  this.transactionDetails.customer ? this.transactionDetails.customer.id : null
	            this.order.vehicle.first_name =  this.transactionDetails.customer ? this.transactionDetails.customer.firstName : null
	            this.order.vehicle.last_name = this.transactionDetails.customer ? this.transactionDetails.customer.lastName : null
	            this.order.vehicle.vehicle_type = this.transactionDetails.vehicle ? this.transactionDetails.vehicle.vehicle_type : null
	            this.order.vehicle.vehicle_model = this.transactionDetails.vehicle ? this.transactionDetails.vehicle.vehicle_model : null
	            this.order.receipt_number = this.transactionDetails ? this.transactionDetails.receipt_number : null
	            this.plateNumber.number = this.transactionDetails.vehicle ? this.transactionDetails.vehicle.plate_number : null
	            this.order.customer_id = this.transactionDetails.customer ? this.transactionDetails.customer.id : null
				this.order.location = this.user.location ? this.user.location : null
				this.order.location_id = this.user.location ? this.user.location.id : null
				this.order.discount = this.transactionDetails.discountDetails ? this.transactionDetails.discountDetails : null
				this.order.discount_id = this.transactionDetails.discountDetails ? this.transactionDetails.discountDetails.id : null
				this.order.coupon = this.transactionDetails.coupontDetails ? this.transactionDetails.couponDetails : null
				this.order.coupon_id = this.transactionDetails.couponDetails ? this.transactionDetails.couponDetails.id : null
	            this.order.sub_total =  this.transactionDetails.sub_total ? this.transactionDetails.sub_total : null
	            this.order.total= this.transactionDetails.total ? this.transactionDetails.total : null
	            this.order.status = 'pending'
	            this.order.reason= null
	            this.order.cashier = this.user.firstName
	        	this.order.cashier_id = this.user.id
	        	this.order.platform_initiated = 'web'

	        	if(this.order.payment_method === 'free'){
	        		this.order.free_wash = 'yes' 
	            	this.order.action = 'online-free-wash'
	        	}else{
	        		this.order.free_wash = 'no'; 
	        	}
	            
	            this.order.discounted_amount =  this.transactionDetails.discount
             	this.order.receipt_number= this.transactionDetails.receipt_number
	            this.order.date = this.optionsFn()
	            this.order.time = this.time()
	            this.order.packages =  this.transactionDetails.products ? this.transactionDetails.products : null

	            console.log(this.order)

        		this.saveTransaction(this.order).then((response) => {
        			console.log(this.order)
					this.step = 4
					// remote.getCurrentWebContents().print({silent:true, copies : 2})
	            }).catch((error) => {
	                console.log(error)
	                if(this.errorMessage){
	                    this.negativeNotification('cannot process order at the moment')
	                }
	            })
            },

            begin(){
            	this.clearTransaction(null).then((response) => {
            		this.step = 1
	            })  
            },

            reset () {
		      	this.theModel = null
		    },

		    optionsFn () {
	     		var today = new Date();
	  			var bu = today.getDate();
		      	
	     		console.log(new Date())
	     		var timeStamp = Date.now()
				var formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')
				return formattedString
		    },

		    time(){
		    	var today = new Date();
		    	var time = today.getHours() + ":" + today.getMinutes() + ":" + 
            	today.getSeconds();
            	return time
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