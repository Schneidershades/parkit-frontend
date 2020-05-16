<template>
	<q-page padding>
		<div class="q-pa-md q-gutter-sm print-hide" >
			<q-breadcrumbs>
				<q-breadcrumbs-el label="Home" />
				<q-breadcrumbs-el label="Invoice"/>
			</q-breadcrumbs>
		</div>

		<div class="print-hide" >
			<!-- receipt number <br>
			{{receiptNo}}<br>
			last transaction <br>
			{{orderTransaction}} <br>
			all orders<br>
		{{allOrders}} <br> -->
		<!-- {{freeWashStatus}} {{freeWash}}<br> -->
		</div>


		<div id="ticketPrinter">
			<div class="ticket print-only" v-if="orderTransaction">

				<q-card-actions align="center">
		            <img src="statics/parkit_logo.png" alt="Parkit Home service" width="150">
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
					To   : {{orderTransaction.vehicle.first_name ? orderTransaction.vehicle.first_name : 'N/A'}} {{orderTransaction.vehicle.last_name}}<br>
					Transaction ID   : {{orderTransaction.vehicle.plate_number}}<br>
					Payment Method   : {{orderTransaction.payment_method == 'not_paid' ? 'Not Paid' : ''}}
					{{orderTransaction.payment_method == 'pos' ? 'POS' : ''}}
					{{orderTransaction.payment_method == 'cash' ? 'Cash' : ''}}
					{{orderTransaction.payment_method == 'transfer' ? 'Transfer' : ''}}

					<br></b>
		        </div>
		       		
				<div class="text-h6">Items</div>
				
				<div class="q-py-sm" v-for="item in orderTransaction.packages">
					<p>
						<b>{{item.package}} - {{item.vehicle}}  || {{item.quantity}} @ ₦ {{item.amount}} || Total: ₦ {{item.total}}</b>
					</p>
				</div>
				<div class="q-py-sm"  align="right">
					<b>Sub-total: ₦{{orderTransaction.sub_total}}<br>
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
					Total: ₦ {{orderTransaction.total}}</b>
					<br><br><br>
		            	<i>Thank you for your patronage</i>
					<br>
					<br><br>
					<br>
					<hr>
				</div>
			</div>
	    </div>

		<div class="q-pa-md print-hide" >
			<div class="q-gutter-y-md">
			    <q-stepper
			      v-model="step"
			      vertical
			      color="primary"
			      animated
			    >
			      <q-step
			        :name="1"
			        title="Process Plate Number"
			        icon="settings"
			        :done="step > 1"
			      >
			      		<q-form
                            @submit="submitFindVehicle"
                            class="q-gutter-md"
                            ref="form"
                        	>
                        	<div class="row">
	                            <div class="col-6 q-pl-sm">
	                                <q-input
	                                    ref="name"
	                                    filled
	                                    v-model="plateNumber.number"
	                                    :dense="dense"
	                                    label="Get Vehicle Details *"
	                                    hint="Please insert a plate number"
	                                    lazy-rules
	                                    :rules="[ val => val && val.length > 0 || 'Please type in a vehicle number']"
	                                />
	                            </div>
	                            <div class="col-6 q-pl-sm">
	                            	<q-btn type="submit" color="primary" label="Search Plate Number" />
	                            </div>
	                        </div> 
                        </q-form>

                        <template v-if="order.vehicle.plate_number != null">
                        	<q-form
	                            @submit="updateUser"
	                            class="q-gutter-md q-pt-xl"
	                            ref="form"
	                        >
	                        	<div class="row">
	                        		<div class="col-4 q-pa-sm">
		                                <q-input
		                                    ref="name"
		                                    v-model="order.vehicle.plate_number"
		                                    filled
		                                    label="Plate Number *"
		                                    readonly
		                                    :value="order.vehicle.plate_number"
		                                />
		                            </div>

		                            <div class="col-4 q-pa-sm">
		                                <q-input
			                                filled
		                                    :dense="dense"
		                                    :readonly="readonly"
			                                v-model="order.vehicle.phone"
			                                label="Phone Number"
			                                mask="(###) - ### - ### - ####"
			                                unmasked-value
			                                hint="Hint : (234) - 702 - 222 - 2222"
			                                lazy-rules
		                                    :value="order.vehicle.phone"
			                                />
		                            </div>
		                            <div class="col-4 q-pa-sm">
										<q-select 
		                            		filled 
		                            		v-model="order.vehicle.vehicle_type" 
		                            		:options="vehicles" 
		                                    label="Get Vehicle Type *"
		                                    lazy-rules
		                                    :dense="dense"
		                                    :readonly="readonly"
		                                    :value="order.vehicle.vehicle_type"
	                                    	:rules="[ val => val && val.length > 0 || 'Select a vehicle type']"
		                            	/>
		                            </div>
		                            <div class="col-4 q-pa-sm">
		                            	<q-select 
		                            		filled 
		                                    v-model="order.vehicle.vehicle_model"
		                            		:options="models" 
		                                    label="Vehicle Model *"
		                                    lazy-rules
		                                    :dense="dense"
		                                    :readonly="readonly"
		                                    :value="order.vehicle.vehicle_model"
		                            	/>
		                            </div>
	                        		<div class="col-4 q-pa-sm">
		                                <q-input
		                                    ref="name"
		                                    v-model="order.vehicle.first_name"
		                                    filled
		                                    :dense="dense"
		                                    label="First Name *"
		                                    :readonly="readonly"
		                                    :value="order.vehicle.first_name"
		                                />
		                            </div>
		                            <div class="col-4 q-pa-sm">
		                                <q-input
		                                    ref="name"
		                                    filled
		                                    :dense="dense"
		                                    v-model="order.vehicle.last_name"
		                                    label="Last Name *"
		                                    :readonly="readonly"
		                                    :value="order.vehicle.last_name"
		                                />
		                            </div>
		                        	
		                        </div> 


		                        <q-card-actions align="right">
						          	<q-toggle color="warning" v-model="readonly" label="Edit User" /><br>
						          	<q-btn color="primary" v-if="readonly==false" type="submit" label="Save Details " />
							    </q-card-actions>
	                        </q-form>

	                        <div class="q-gutter-sm" v-if="freeWash==true">
	                        	<q-banner dense rounded inline-actions class="q-my-lg text-white bg-green">
	                              	This user has a free wash
	                            </q-banner>
						      	<q-radio v-model="order.free_wash" val="no" v-on:click.native="useFreeWash('no')" label="Reject Free Wash" />
						      	<q-radio v-model="order.free_wash" val="yes" v-on:click.native="useFreeWash('yes')" label="Use Free Wash" />

						      	<!-- {{freeWashStatus}} -->
						    </div>
                        </template>

                        <q-stepper-navigation >
				          	<q-btn v-if="order.vehicle.plate_number!=null  && readonly==true && order.vehicle.vehicle_type!=null" @click="step = 2" color="primary" label="Continue" />
				          	<q-btn v-else color="red" label="Please Make sure you Enter a plate number and select a Vehicle Type" disabled />
				        </q-stepper-navigation> 
			      </q-step>

			      <q-step
			        :name="2"
			        title="View Cart"
			        caption="Select Vehicle Packages"
			        icon="create_new_folder"
			        :done="step > 2"
			      >

			        
            		<PackageTabList/>

			        <q-stepper-navigation>
			          	<q-btn v-if="cart.length" @click="step = 3" color="primary" label="Continue" />
				        <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
			        </q-stepper-navigation>
			        
			      </q-step>

			      <q-step
			        :name="3"
			        title="Customer choosen Packages"
			        icon="assignment"
			        :done="step > 3"
			      >
			      		<cart></cart>

				        <q-stepper-navigation>
				          <q-btn v-if="cart.length" @click="step = 4" color="primary" label="Continue" />
				          <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
				        </q-stepper-navigation>
			        
						
			      </q-step>

			      <q-step
			        :name="4"
			        title="Payment Method"
			        icon="money"
			        :done="step > 4"
			      >
			        <div class="q-pa-md">
					    <div class="q-gutter-sm" v-if="freeWashStatus=='yes' && freeWash == true">
					      <q-radio v-model="order.payment_method" val="free" label="Free" />
					    </div>
					    <div class="q-gutter-sm" v-else >
					      <q-radio v-model="order.payment_method" val="not_paid" label="Not Paid" />
					      <q-radio v-model="order.payment_method" val="pos" label="POS Machine" />
					      <q-radio v-model="order.payment_method" val="cash" label="Cash" />
					      <q-radio v-model="order.payment_method" val="transfer" label="Bank Transfer" />
					    </div>
					</div>

			        <q-stepper-navigation>
			          <q-btn @click="placeOrder" color="primary" label="Continue" />
			          <q-btn flat @click="step = 3" color="primary" label="Back" class="q-ml-sm" />
			        </q-stepper-navigation>
			      </q-step>

			      

			      <q-step
			        :name="5"
			        title="Print Invoice"
			        icon="print"
			      >

			        <q-stepper-navigation>
			          <q-btn @click="beginStep" color="primary" label="Create new Transaction" />
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
	    font-size: 9px;
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
    import { Notify } from 'quasar'
  	import PackageTabList from 'components/Admin/Tabs/PackageTabList.vue'
    import Cart from 'components/Admin/Cart/Cart.vue'
	import { date } from 'quasar'
	const { remote } = require('electron')

	const {PosPrinter} = require('electron').remote.require("electron-pos-printer")
	const path = require("path")

    export default{
    	components:{
	        Cart,
	        PackageTabList,
	    },
        data(){
            return{
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
	                payment_method: 'not_paid',
	                sub_total: null,
	                total: null,
	                status: 'pending',
	                action: null,
	                reason: null,
	                cashier_id: null,
	                cashier: null,
	                free_wash: 'no',
	                discounted_amount: 0,
	                date: null,
	                time: null
                },
                
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
      			readonly: false,
            }
        },

        computed: {
            ...mapGetters({
                connectOnline: 'auth/onlineStatus',
            	cartTotal: 'adminShopping/cartTotal',
		        user: 'auth/user',
                message: 'message',
                errorMessage: 'errorMessage',
              	checkPlateNumber: 'customerPlateNumbers/plateNumber',
                newPhoneNumber: 'auth/phone',
                cart: 'adminShopping/cart',
				userDiscountPrivilege: 'adminShopping/userDiscountPrivilege',
				discount: 'adminShopping/discount',
				discountDetails: 'adminShopping/discountDetails',
				couponDetails: 'adminShopping/couponDetails',
				receiptNo: 'adminOrders/receiptNumber',
				subTotal: 'adminShopping/subTotal',
                online: 'auth/onlineStatus',
                freeWash: 'customerPlateNumbers/freeWash',
                freeWashStatus: 'customerPlateNumbers/useFreeWash',
                orderTransaction: 'adminOrders/transaction',
                allOrders: 'adminOrders/orders',
            }),
        },
            
        methods:{
            ...mapActions({
              	sendPlatenumber: 'customerPlateNumbers/checkPlateNumber',
              	updateCustomer: 'customerPlateNumbers/updateCustomer',
				placeCustomerOrder: 'adminOrders/storeOrder',
				setFreeWashStatus: 'customerPlateNumbers/useFreeWash',
				saveTransaction: 'adminOrders/saveTransaction',
				clearTransaction: 'adminOrders/clearTransaction',
            }),

            beginStep(){
            	// this.step = 1
            	this.clearTransaction().then((response) => {
					this.step = 1
	            }).catch((error) => {
	                console.log(error)
	                if(this.errorMessage){
	                    this.negativeNotification('cannot process order at the moment')
	                }
	            })    
	        	this.order.receipt_number = this.user.location.code+'0000000'+this.receiptNo
				this.order.vehicle.id = ''
    			this.order.vehicle.email = ''
        		this.order.vehicle.plate_number = ''
	            this.order.vehicle.phone = ''
	            this.order.vehicle.first_name = ''
	            this.order.vehicle.last_name = ''
	            this.order.vehicle.vehicle_type = ''
	            this.order.vehicle.vehicle_model = ''
	            this.order.receipt_number = ''
	            this.plateNumber.number = ''
	        	this.readonly= false
	            this.order.customer_id = null
				this.order.location = null
				this.order.location_id = null
				this.order.discount = null
				this.order.discount_id = null
				this.order.coupon = null
				this.order.coupon_id = null
	            this.order.payment_method = 'not_paid'
	            this.order.sub_total =  null
	            this.order.total= null
	            this.order.status = 'pending'
	            this.order.action= null
	            this.order.reason= null
	            this.order.cashier_id= null
	            this.order.cashier= null
	            this.order.free_wash = 'no'
	            this.order.discounted_amount =  0
             	this.order.receipt_number= null
            },

            placeOrder(){
            	this.order.packages = this.cart
	        	this.order.date = this.optionsFn()
	        	this.order.time = this.time()
	        	this.order.receipt_number = '0000000'+this.receiptNo
	        	this.order.location = this.user.location
	        	this.order.location_id = this.user.location.id
	        	this.order.total = this.cartTotal
	        	this.order.cashier = this.user.firstName
	        	this.order.cashier_id = this.user.id
	        	this.order.discount = this.discountDetails
	        	this.order.discount_id = this.discountDetails!=null ? this.discountDetails.id : null
	        	this.order.coupon = this.couponDetails
	        	this.order.coupon_id = this.couponDetails!=null ? this.couponDetails.id : null
	        	this.order.sub_total = this.subTotal
	        	// this.order.discounted_amount = this.subTotal
	        	this.order.vehicle.userId = this.checkPlateNumber.userId

	            this.saveTransaction(this.order).then((response) => {
					this.step = 5
					remote.getCurrentWebContents().print({silent:true, copies : 2})
	            }).catch((error) => {
	                console.log(error)
	                if(this.errorMessage){
	                    this.negativeNotification('cannot process order at the moment')
	                }
	            })    
	               
			},


            submitFindVehicle(){
            	this.sendPlatenumber(this.plateNumber.number).then((res) => {
            		this.trigger = true
        			this.order.vehicle.id = this.checkPlateNumber.id
        			this.order.vehicle.email = this.checkPlateNumber.email
	        		this.order.vehicle.plate_number = this.checkPlateNumber.plateNumber
		            this.order.vehicle.phone = this.checkPlateNumber.phone
		            this.order.vehicle.first_name = this.checkPlateNumber.firstName
		            this.order.vehicle.last_name = this.checkPlateNumber.lastName
		            this.order.vehicle.vehicle_type = this.checkPlateNumber.VehicleType
		            this.order.vehicle.vehicle_model = this.checkPlateNumber.VehicleModel
	        		this.order.receipt_number = this.user.location.code+'0000000'+this.receiptNo
                }).catch((error) => {
                    this.errorMessages = error
                    console.log(this.errorMessages)
                    if(this.errorMessages){
                        this.negativeNotification(this.errorMessages)
                    }
                })   
            },

            updateUser(){
            	this.updateCustomer(this.order.vehicle).then((res) => {
      				this.readonly = true
                }).catch((error) => {
                    this.errorMessages = error
                    console.log(this.errorMessages)
                    if(this.errorMessages){
                        this.negativeNotification(this.errorMessages)
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

            optionsFn () {
	     		var today = new Date();
	  			var bu = today.getDate();
		      	
	     		console.log(new Date())
	     		var timeStamp = Date.now()
				var formattedString = date.formatDate(timeStamp, 'DD-MM-YYYY')
				return formattedString
		    },

		    time(){
		    	var today = new Date();
		    	var time = today.getHours() + ":" + today.getMinutes() + ":" + 
            	today.getSeconds();
            	return time
		    },

		    useFreeWash(stats){
		    	this.setFreeWashStatus(stats).then((response) => {
		    		this.positiveNotification('free wash has been updated to ' + stats)
	            }).catch((error) => {
	                console.log(error)
	                if(this.errorMessage){
	                    this.negativeNotification('cannot process order at the moment')
	                }
	            })     
		    }
        },

        mounted()
        {
	        	
        }
    }
</script>