<template>
	<q-page padding>
		<div class="q-pa-md q-gutter-sm">
			<q-breadcrumbs>
				<q-breadcrumbs-el label="Home" />
				<q-breadcrumbs-el label="Invoice"/>
			</q-breadcrumbs>
		</div>

		<div class="q-pa-md">
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
			        
            		<HomeServiceTabList/>

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
			        title="Process Customer Details"
			        icon="assignment"
			        :done="step > 3"
			      >
                        <template >
                        	<q-form
	                            class="q-gutter-md q-pt-xl"
	                            ref="form"
	                            @submit="processUser"
	                        	>
	                        	<div class="row">
		                            <div class="col-3 q-pa-sm">
		                                <q-input
		                                    ref="name"
		                                    :dense="dense"
		                                    :readonly="readonly"
		                                    filled
			                                prefix="+234"
			                                v-model="customer.phone"
			                                label="Phone Number"
			                                mask="(###) ### - ####"
			                                unmasked-value
			                                hint="Hint : (703) 749 - 5705"
			                                lazy-rules
			                                :rules="[val => !!val || '* Required', val => val && val.length > 0 || 'Please type in your phone number']"
		                                />
		                            </div>
	                        		<div class="col-3 q-pa-sm">
		                                <q-input
		                                    ref="name"
		                                    v-model="customer.email"
		                                    filled
		                                    type="email"
		                                    :dense="dense"
		                                    label="Email *"
		                                    :readonly="readonly"
		                                />
		                            </div>
	                        		<div class="col-3 q-pa-sm">
		                                <q-input
		                                    ref="name"
		                                    v-model="customer.first_name"
		                                    filled
		                                    :dense="dense"
		                                    label="First Name *"
		                                    :readonly="readonly"
		                                />
		                            </div>
		                            <div class="col-3 q-pa-sm">
		                                <q-input
		                                    ref="name"
		                                    filled
		                                    :dense="dense"
		                                    v-model="customer.last_name"
		                                    label="Last Name *"
		                                    :readonly="readonly"
		                                />
		                            </div>
		                            <div class="col-6 q-pa-sm">
		                                <q-input
		                                    ref="name"
		                                    filled
		                                    :dense="dense"
		                                    v-model="customer.address"
		                                    label="Customer Location *"
		                                    :readonly="readonly"
			                                :rules="[val => !!val || '* Required', val => val && val.length > 0 || 'Please type in your phone number']"
		                                />
		                            </div>
		                            <div class="col-6 q-pa-sm">
					                    <q-select 
					                        filled 
					                        :options="locations" 
					                        v-model="customer.location_id" 
					                        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
					                        :option-label="opt => Object(opt) === opt && 'id' in opt ? opt.address : null"
					                        :option-disable="opt => Object(opt) === opt ? opt.inactive === true : true"
					                        emit-value
					                        map-options
		                                    :readonly="readonly"
		                                    :dense="dense"
					                        label="Select Parent Office *" />
					                </div>

					                <div class="col-md-6 q-pa-sm">
		                                <q-input filled :readonly="readonly" :dense="dense"  v-model="customer.home_service_booking_date" mask="date"  :value="optionsFn" :rules="['date']">
									      	<template v-slot:append>
										        <q-icon name="event" class="cursor-pointer">
										          	<q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
										            	<q-date v-model="customer.home_service_booking_date" :options="optionsFn" @input="() => $refs.qDateProxy.hide()" />
										          	</q-popup-proxy>
										        </q-icon>
									      	</template>
									    </q-input>
		                            </div>
		                            
		                            <div class="col-md-6 q-pa-sm">
		                                 <q-input filled :readonly="readonly" :dense="dense" v-model="customer.home_service_booking_time" mask="time" :rules="['time']">
									        <template v-slot:append>
									          <q-icon name="access_time" class="cursor-pointer">
									            <q-popup-proxy transition-show="scale" transition-hide="scale">
									              <q-time v-model="customer.home_service_booking_time"  :options="optionsTime" format24h/>
									            </q-popup-proxy>
									          </q-icon>
									        </template>
									    </q-input>
		                            </div>
		                        </div> 

		                        <q-card-actions align="right">
						          	<q-toggle color="warning" v-model="readonly" label="Edit Customer Details" />
							    </q-card-actions>

							    <q-stepper-navigation >
						          	<q-btn type="submit" v-if="customer.email && customer.phone && customer.location_id && customer.address" color="primary" label="Continue" />
						          	<q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
						        </q-stepper-navigation> 
	                        </q-form>
                        </template>
			      </q-step>

			      <q-step
			        :name="4"
			        title="Payment Method"
			        icon="money"
			        :done="step > 4"
			      >
			        <div class="q-pa-md">
					    <div class="q-gutter-sm">
					      <q-radio v-model="customer.payment_method" val="not_paid" label="Not Paid" />
					      <q-radio v-model="customer.payment_method" val="pos" label="POS Machine" />
					      <q-radio v-model="customer.payment_method" val="cash" label="Cash" />
					      <q-radio v-model="customer.payment_method" val="card" label="Card" />
					      <q-radio v-model="customer.payment_method" val="online" label="Online" />
					      <q-radio v-model="customer.payment_method" val="reserved" label="Reserve" />
					    </div>

					    <div class="q-px-sm">
					      Your selection is: <strong>{{ customer.payment_method }}</strong>
					      <br>
					      {{customer}}
					      <br>
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
			          <q-btn color="primary" label="Finish" />
			          <q-btn flat @click="step = 4" color="primary" label="Back" class="q-ml-sm" />
			        </q-stepper-navigation>
			      </q-step>
			    </q-stepper>
			</div>
		</div>
	</q-page>
</template>


<script>
    
    import { mapActions, mapGetters } from 'vuex'
    import { Notify } from 'quasar'
  	import HomeServiceTabList from 'components/Tabs/HomeServiceTabList.vue'
    import Cart from 'components/Admin/Cart/Cart.vue'
	import { date } from 'quasar'

    export default{
    	components:{
	        HomeServiceTabList,
	        Cart
	    },
        data(){
            return{
                customer: {
                    phone : '',
                    email : '',
                    first_name: '',
                    last_name: '',
                    plate_number: '',
                	user_operator_id : '',
                	cashier_id : '',
                	location_id : '',
                	address : null,
                	address_id : '',
                	discount_id : null,
                	is_free_wash : false,
                	subtotal : null,
                	total : null,
                	discounted_amount : null,
                	free_discount : false,
                	action : null,
                	amount_paid : null,
                	currency_id : null,
                	payment_method : 'not_paid',
                	payment_status : 'pending',
                	platform_initiated : 'WebAdmin',
                	transaction_initiated_date : null,
                	transaction_initiated_time : null,
                	date_time_paid : null,
                	reason : null,
                	home_service_booking_date : null,
                	home_service_booking_time : null,
                	served_location_id : null,
                	service_status : null,
                	status : 'pending',
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
                message: 'message',
                errorMessage: 'errorMessage',
                newPhoneNumber: 'auth/phone',
                plateVehicleDetails: 'plateNumber/plateNumberDetails',
                cart: 'shopping/cart',
            	cartTotal: 'shopping/cartTotal',
				userDiscountPriviledge: 'shopping/userDiscountPriviledge',
				discount: 'shopping/discount',
				discountDetails: 'shopping/discountDetails',
          		locations: 'locationSettings/locations',
				subTotal: 'shopping/SubTotal',
            	user: 'auth/user',
            }),
        },
            
        methods:{

            ...mapActions({
              	sendPlatenumber: 'plateNumber/getPlateNumber',
              	updateCustomer: 'plateNumber/updateCustomer',
				placeHomeServiceOrder: 'webAdminOrders/placeHomeServiceOrder',
        		getLocations: 'locationSettings/getLocations',
            }),

            placeOrder(){
            	this.customer.phone = '234'+ this.customer.phone
            	this.customer.packages = this.cart
	        	this.customer.total = this.cartTotal
	        	this.customer.subtotal = this.subTotal
	        	this.customer.user_operator_id = this.user.id
	        	this.customer.cashier_id = this.user.id
	        	this.customer.served_location_id = this.customer.location_id
	        	this.customer.transaction_initiated_date = this.optionsFn()
	        	this.customer.transaction_initiated_time = this.time()
	        	this.customer.discount_id = this.discountDetails!=null ? this.discountDetails.id : null;
	        	this.customer.coupon_id = this.couponDetails!=null ? this.couponDetails.id : null

				this.placeHomeServiceOrder(this.customer).then((response) => {
					this.step = 5    		
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

            optionsFn (mon) {
	     		var today = new Date();
	  			var bu = today.getDate();
		      	
	     		console.log(new Date())
	     		var timeStamp = Date.now()
				var formattedString = date.formatDate(timeStamp, 'YYYY/MM/DD')
		      	return mon >= formattedString
		    },


		    time(){
		    	var today = new Date();
		    	var time = today.getHours() + ":" + today.getMinutes() + ":" + 
            	today.getSeconds();
            	return time
		    },

		    optionsTime (hr) {
		      	if (hr < 8 || hr > 17 ) {
		        	return false
		      	}
		      	return true
		    },

            processUser(){
            	this.readonly = true
            	this.step = 4
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
        	this.getLocations()
        }
    }
</script>