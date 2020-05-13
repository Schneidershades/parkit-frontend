<template>
	<q-page padding>
		<div class="q-pa-md q-gutter-sm print-hide" >
			<q-breadcrumbs>
				<q-breadcrumbs-el label="Home" />
				<q-breadcrumbs-el label="Invoice"/>
			</q-breadcrumbs>
		</div>

		<!-- {{couponDetails}}
		{{connectOnline}} -->

		<div id="ticketPrinter">
			<div class="ticket print-only" v-if="order">

				<q-card-actions align="center">
		            <img src="statics/parkit_logo.png" alt="Parkit Home service" width="150">
		        </q-card-actions>

		        <div class="q-py-sm">
		        	<b>Location : {{order.location ? order.location.code : ''}} -  {{order.location ? order.location.address : ''}}<br>
					Phone   : +234-903-152-6466 <br> 
					Email   : info@parkit.ng<br>
					Website   : www.parkit.ng<br></b>
				</div>
				<div class="q-py-sm">
					<b>Bill ID   : {{order.receipt_number}}<br>
					Date   : {{order.date}}<br>
					Time   : {{order.time}}<br>
					Cashier   : {{order.cashier}}<br>
					To   : {{order.vehicle.first_name}} {{order.vehicle.last_name}}<br>
					Transaction ID   : {{order.vehicle.plate_number}}<br>
					Payment Method   : {{order.payment_method == 'not_paid' ? 'Not Paid' : ''}}
					{{order.payment_method == 'pos' ? 'POS' : ''}}
					{{order.payment_method == 'cash' ? 'Cash' : ''}}
					{{order.payment_method == 'transfer' ? 'Transfer' : ''}}

					<br></b>
		        </div>
		       		
				<div class="text-h6">Items</div>
				
				<div class="q-py-sm" v-for="item in order.packages">
					<p>
						<b>{{item.package}} - {{item.vehicle}}  || {{item.quantity}} @ ₦ {{item.amount}} || Total: ₦ {{item.total}}</b>
					</p>
				</div>
				<div class="q-py-sm"  align="right">
					<b>Sub-total: ₦{{order.sub_total}}<br>
					Discount: ₦ {{order.discount==null ? order.discount : '0.00'}}
					<br>
					Total: ₦ {{order.total}}</b>
					<br><br><br><br>
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
			        title="Select Vehicle Packages"
			        icon="settings"
			        :done="step > 1"
			      >
			        
            		<PackageTabList/>

			        <q-stepper-navigation>
			          <q-btn v-if="cart.length" @click="step = 2" color="primary" label="Continue" />
			        </q-stepper-navigation>
			      </q-step>

			      <q-step
			        :name="2"
			        title="View Cart"
			        caption="Customer choosen Packages"
			        icon="create_new_folder"
			        :done="step > 2"
			      >
			        <cart></cart>

			        <q-stepper-navigation>
			          <q-btn v-if="cart.length" @click="step = 3" color="primary" label="Continue" />
			          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
			        </q-stepper-navigation>
			      </q-step>

			      <q-step
			        :name="3"
			        title="Process Plate Number"
			        icon="assignment"
			        :done="step > 3"
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
	                                    :rules="[ val => val && val.length > 0 || 'Please type something']"
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
		                                    ref="name"
		                                    :dense="dense"
		                                    :readonly="readonly"
		                                    filled
			                                v-model="order.vehicle.phone"
			                                label="Phone Number"
			                                lazy-rules
			                                :rules="[val => !!val || '* Required', val => val && val.length > 0 || 'Please type in your phone number']"
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
                        </template>

                        <q-stepper-navigation >
				          	<q-btn v-if="order.vehicle.plate_number!=null  && readonly==true" @click="step = 4" color="primary" label="Continue" />
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
					    <div class="q-gutter-sm">
					      <q-radio v-model="order.payment_method" val="not_paid" label="Not Paid" />
					      <q-radio v-model="order.payment_method" val="pos" label="POS Machine" />
					      <q-radio v-model="order.payment_method" val="cash" label="Cash" />
					      <q-radio v-model="order.payment_method" val="transfer" label="Bank Transfer" />
					      <q-radio v-model="order.payment_method" val="free" label="Free" />
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


			      	<!-- {{printData}} -->
			      	<!-- <Receipt/> -->
					
			        

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
	import print  from 'print-js'
	import VueHtmlToPaper from 'vue-html-to-paper';
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
                order:{
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
	                },
	                packages: null,
	                customer_id: this.checkPlateNumber ? this.checkPlateNumber.user.id : null,
					location: null,
					discount: null,
					coupon: null,
	                payment_method: 'not_paid',
	                sub_total: null,
	                total: null,
	                status: 'pending',
	                action: null,
	                reason: null,
	                cashier_id: null,
	                cashier: null,
	                date: null,
	                time: null,
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
      			readonly: true,
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
            }),
        },
            
        methods:{
            ...mapActions({
              	sendPlatenumber: 'customerPlateNumbers/checkPlateNumber',
              	updateCustomer: 'customerPlateNumbers/updateCustomer',
				placeCustomerOrder: 'adminOrders/storeOrder',
            }),

            beginStep(){
            	this.step = 1

				this.order.vehicle.id = ''
    			this.order.vehicle.email = ''
        		this.order.vehicle.plate_number = ''
	            this.order.vehicle.phone = ''
	            this.order.vehicle.first_name = ''
	            this.order.vehicle.last_name = ''
	            this.order.vehicle.vehicle_type = ''
	            this.order.vehicle.vehicle_model = ''  	
            },

            placeOrder(){
            	this.order.packages = this.cart
	        	this.order.date = this.optionsFn()
	        	this.order.time = this.time()
	        	this.order.receipt_number = this.user.location.code+'0000000'+this.receiptNo
	        	this.order.location = this.user.location
	        	this.order.total = this.cartTotal
	        	this.order.cashier = this.user.firstName
	        	this.order.discount = this.discountDetails
	        	this.order.coupon = this.couponDetails
	        	this.order.sub_total = this.subTotal

				this.placeCustomerOrder(this.order).then((response) => {
					this.step = 5
					remote.getCurrentWebContents().print({silent:true, copies : 2})

		   //  		var printContents = document.getElementById('ticket').innerHTML;
					// var originalContents = document.body.innerHTML;
					// document.body.innerHTML = printContents;
					// window.print();
					// document.body.innerHTML = originalContents;

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
		    }
        },

        mounted()
        {
        	if(this.checkPlateNumber != null){
    			this.order.vehicle.id = this.checkPlateNumber.id
    			this.order.vehicle.email = this.checkPlateNumber.email
        		this.order.vehicle.plate_number = this.checkPlateNumber.plateNumber
	            this.order.vehicle.phone = this.checkPlateNumber.phone
	            this.order.vehicle.first_name = this.checkPlateNumber.firstName
	            this.order.vehicle.last_name = this.checkPlateNumber.lastName
	            this.order.vehicle.vehicle_type = this.checkPlateNumber.vehicleType
	            this.order.vehicle.vehicle_model = this.checkPlateNumber.vehicleModel
        	}
	        	
        }
    }
</script>