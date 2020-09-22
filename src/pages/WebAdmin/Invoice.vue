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
	            		<tab-list></tab-list>

				        <q-stepper-navigation>
				          	<q-btn 
				          		v-if="cart.length" 
				          		@click="step = 2" 
				          		color="primary"
				          		label="Continue" 
				          		/>
				        </q-stepper-navigation>
				      </q-step>

				      <q-step
				        :name="2"
				        title="View Cart"
				        caption="Customer choosen Packages"
				        icon="create_new_folder"
				        :done="step > 2"
				      >
				        
	            		<Cart/>

				        <q-stepper-navigation>
				          	<q-btn v-if="cart.length" 
				          		@click="step = 3" 
				          		color="primary" 
				          		label="Continue" 
				          		v-bind:disabled="packageLocationCount > 0 && packageHomeOfficeCount > 0  ? true : false" 
				          		/>
				          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
				        </q-stepper-navigation>
				      </q-step>

				      <q-step
				        :name="3"
				        title="Process Plate Number"
				        icon="assignment"
				        :done="step > 3"
				      	>
				        	
						    <div class="q-py-md">
						    	<template  v-if="packageLocationCount > 0 && packageHomeOfficeCount == 0">
						      		<q-radio v-model="order.userType" val="location-user" label="Registered User (Location)" /> 
						      		<!-- <q-radio v-model="order.userType" val="location-non-user" label="Not Registered User (Location)" /> -->
						    	</template>

						    	<template  v-if="packageHomeOfficeCount > 0 && packageLocationCount == 0">
						      		<!-- <q-radio v-model="order.userType" val="home-service-user" label="Registered User(Home Service)" />  -->
						      		<q-radio v-model="order.userType" val="home-service-non-user" label="Not Registered User(Home Service)" />
						    	</template>
						    </div>

							

	                        <template v-if="order.userType=='location-user'">
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
					                            mask="XXXXXXXXXXXXXXX"
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
		                        
	                        	<q-form
	                        		v-if="plateVehicleDetails && plateNumber.number"
		                            @submit="updateUser"
		                            class="q-gutter-md q-pt-xl"
		                            ref="form"
		                        	>
		                        	<div class="row">
		                        		<div class="col-6 q-pa-sm">
			                                <q-input
			                                    ref="name"
			                                    v-model="order.plate_number"
			                                    filled
			                                    label="Plate Number *"
			                                    readonly
			                                    :value="plateNumber.number"
			                                />
			                            </div>
			                            <div class="col-6 q-pa-sm">
			                                <q-input
			                                    ref="name"
			                                    :dense="dense"
			                                    :readonly="readonly"
			                                    filled
				                                :prefix="countryCodePrefix"
				                                v-model="phoneNumber"
				                                label="Phone Number"
				                                mask="(###) ### - ####"
				                                unmasked-value
				                                hint="Hint : (703) 749 - 5705"
				                                lazy-rules
				                                :rules="[val => !!val || '* Required', val => val && val.length > 0 || 'Please type in your phone number']"
			                                />
			                            </div>
			                            <div class="col-6 q-pa-sm">
											<q-select 
			                            		filled 
			                            		v-model="order.vehicle_type" 
			                            		:options="vehicles" 
			                                    label="Get Vehicle Type *"
			                                    lazy-rules
			                                    :dense="dense"
			                                    :readonly="readonly"
			                            	/>
			                            </div>
			                            <div class="col-6 q-pa-sm">
			                            	<q-select 
			                            		filled 
			                                    v-model="order.vehicle_model"
			                            		:options="models" 
			                                    label="Vehicle Model *"
			                                    lazy-rules
			                                    :dense="dense"
			                                    :readonly="readonly"
			                            	/>
			                            </div>
		                        		<div class="col-6 q-pa-sm">
			                                <q-input
			                                    ref="name"
			                                    v-model="order.first_name"
			                                    filled
			                                    :dense="dense"
			                                    label="First Name *"
			                                    :readonly="readonly"
			                                />
			                            </div>
			                            <div class="col-6 q-pa-sm">
			                                <q-input
			                                    ref="name"
			                                    filled
			                                    :dense="dense"
			                                    v-model="order.last_name"
			                                    label="Last Name *"
			                                    :readonly="readonly"
			                                />
			                            </div>

			                            <div class="col-6 q-pa-sm">
						                    <q-select 
						                        filled 
						                        :options="allLocations" 
						                        v-model="order.location_id" 
						                        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
						                        :option-label="opt => Object(opt) === opt && 'id' in opt ? opt.address : null"
						                        :option-disable="opt => Object(opt) === opt ? opt.inactive === true : true"
						                        emit-value
						                        map-options
			                                    :readonly="readonly"
			                                    :dense="dense"
						                        label="Select Parent Office *" />
						                </div>
			                        </div> 

			                        <q-card-actions align="right">
							          	<q-toggle color="warning" v-model="readonly" label="Edit User" /><br>
							          	<q-btn color="primary" type="submit" label="Save Details " />
								    </q-card-actions>
		                        </q-form>
	                        </template>

                        	<template v-if="order.userType=='home-service-user'">
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
				                                v-model="order.phone"
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
			                                    v-model="order.email"
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
			                                    v-model="order.first_name"
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
			                                    v-model="order.last_name"
			                                    label="Last Name *"
			                                    :readonly="readonly"
			                                />
			                            </div>
			                            <div class="col-6 q-pa-sm">
			                                <q-input
			                                    ref="name"
			                                    filled
			                                    :dense="dense"
			                                    v-model="order.address"
			                                    label="Customer Location *"
			                                    :readonly="readonly"
				                                :rules="[val => !!val || '* Required', val => val && val.length > 0 || 'Please type in your phone number']"
			                                />
			                            </div>
			                            <div class="col-6 q-pa-sm">
						                    <q-select 
						                        filled 
						                        :options="locations" 
						                        v-model="order.location_id" 
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
			                                <q-input filled :readonly="readonly" :dense="dense"  v-model="order.home_service_booking_date" mask="date"  :value="optionsFn" :rules="['date']">
										      	<template v-slot:append>
											        <q-icon name="event" class="cursor-pointer">
											          	<q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
											            	<q-date v-model="order.home_service_booking_date" :options="optionsFn" @input="() => $refs.qDateProxy.hide()" />
											          	</q-popup-proxy>
											        </q-icon>
										      	</template>
										    </q-input>
			                            </div>
			                            <div class="col-md-6 q-pa-sm">
			                            	
			                                 <q-input filled :readonly="readonly" :dense="dense" v-model="order.home_service_booking_time" mask="time" :rules="['time']">
										        <template v-slot:append>
										          <q-icon name="access_time" class="cursor-pointer">
										            <q-popup-proxy transition-show="scale" transition-hide="scale">
										              <q-time v-model="order.home_service_booking_time"  :options="optionsTime" format24h/>
										            </q-popup-proxy>
										          </q-icon>
										        </template>
										    </q-input>
			                            </div>
			                        </div> 

			                        <q-card-actions align="right">
							          	<q-toggle color="warning" v-model="readonly" label="Edit Customer Details" />
								    </q-card-actions>
		                        </q-form>
	                        </template>

	                        <template v-if="order.userType=='home-service-non-user'">
	                        	<q-form
		                            class="q-gutter-md q-pt-xl"
		                            ref="form"
		                            @submit="processUser"
		                        	>
		                        	<div class="row">
			                            <div class="col-6 q-pa-sm">
			                                <q-input
			                                    ref="name"
			                                    :dense="dense"
			                                    :readonly="readonly"
			                                    filled
				                                prefix="+234"
				                                v-model="order.phone"
				                                label="Phone Number"
				                                mask="(###) ### - ####"
				                                unmasked-value
				                                hint="Hint : (703) 749 - 5705"
				                                lazy-rules
				                                :rules="[val => !!val || '* Required', val => val && val.length > 0 || 'Please type in your phone number']"
			                                />
			                            </div>
		                        		<div class="col-6 q-pa-sm">
			                                <q-input
			                                    ref="name"
			                                    v-model="order.email"
			                                    filled
			                                    type="email"
			                                    :dense="dense"
			                                    label="Email *"
			                                    :readonly="readonly"
			                                />
			                            </div>
		                        		<div class="col-6 q-pa-sm">
			                                <q-input
			                                    ref="name"
			                                    v-model="order.first_name"
			                                    filled
			                                    :dense="dense"
			                                    label="First Name *"
			                                    :readonly="readonly"
			                                />
			                            </div>
			                            <div class="col-6 q-pa-sm">
			                                <q-input
			                                    ref="name"
			                                    filled
			                                    :dense="dense"
			                                    v-model="order.last_name"
			                                    label="Last Name *"
			                                    :readonly="readonly"
			                                />
			                            </div>
			                            <div class="col-6 q-pa-sm">
			                                <q-input
			                                    ref="name"
			                                    filled
			                                    :dense="dense"
			                                    v-model="order.address"
			                                    label="Customer Location *"
			                                    :readonly="readonly"
				                                :rules="[val => !!val || '* Required', val => val && val.length > 0 || 'Please type in your phone number']"
			                                />
			                            </div>
			                            <div class="col-6 q-pa-sm">
						                    <q-select 
						                        filled 
						                        :options="allLocations" 
						                        v-model="order.location_id" 
						                        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
						                        :option-label="opt => Object(opt) === opt && 'id' in opt ? opt.address : null"
						                        :option-disable="opt => Object(opt) === opt ? opt.inactive === true : true"
						                        emit-value
						                        map-options
			                                    :readonly="readonly"
			                                    :dense="dense"
						                        label="Select Parent Office *" />
						                </div>

						                <div class="col-6 q-pa-sm">
			                                <q-input filled :readonly="readonly" :dense="dense"  v-model="order.home_service_booking_date" mask="date" label="Select Date *"  :value="optionsFn" :rules="['date']">
										      	<template v-slot:append>
											        <q-icon name="event" class="cursor-pointer">
											          	<q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
											            	<q-date v-model="order.home_service_booking_date" :options="optionsFn" @input="() => $refs.qDateProxy.hide()" />
											          	</q-popup-proxy>
											        </q-icon>
										      	</template>
										    </q-input>
			                            </div>
			                            <div class="col-6 q-pa-sm">
			                            	
			                                 <q-input filled :readonly="readonly" label="Select Time *" :dense="dense" v-model="order.home_service_booking_time" mask="time" :rules="['time']">
										        <template v-slot:append>
										          <q-icon name="access_time" class="cursor-pointer">
										            <q-popup-proxy transition-show="scale" transition-hide="scale">
										              <q-time v-model="order.home_service_booking_time"  :options="optionsTime" format24h/>
										            </q-popup-proxy>
										          </q-icon>
										        </template>
										    </q-input>
			                            </div>
			                        </div> 

			                        <q-card-actions align="right">
							          	<q-toggle color="warning" v-model="readonly" label="Edit Customer Details" />
								    </q-card-actions>
		                        </q-form>
	                        </template>

	                        <q-stepper-navigation >
					          	<q-btn v-if="order.userType=='home-service-non-user' && order.email && order.phone && order.location_id && order.address" @click="step = 4" color="primary" label="Continue" />
					          	<q-btn v-if="plateVehicleDetails && order.userType=='location-user'" @click="step = 4" color="primary" label="Continue" />
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
						      	<q-radio v-model="order.payment_method" val="online" label="Online" />
						    </div>

						    <!-- {{ order.payment_method ? order.payment_method : 'Select Payment Method' }} @ {{order.location}} -->
						</div>

						<div class="q-pa-md">
						    <div class="q-gutter-sm">
						      	<q-radio v-model="order.status" val="pending" label="Pending" />
						      	<q-radio v-model="order.status" val="complete" label="Complete" />
						    </div>
						</div>

				        <q-stepper-navigation>
				          	<q-btn @click="placeOrder" v-if="order.payment_method && order.status" color="primary" label="Continue" />
				          	<q-btn flat @click="step = 3" color="primary" label="Back" class="q-ml-sm" />
				        </q-stepper-navigation>
				    </q-step>

			      
			    	<q-step
				        :name="5"
				        title="Print Invoice"
				        icon="print"
				    	>
			        	<q-stepper-navigation>
			          		<q-btn color="primary" @click="step = 1" label="Finish" />
			        	</q-stepper-navigation>
			      	</q-step>
			    </q-stepper>
			</div>
		</div>
	</q-page>
</template>


<script>
    
    import { mapActions, mapGetters } from 'vuex'
	import { date } from 'quasar'
    import { Notify } from 'quasar'
  	import TabList from 'components/Webadmin/Tabs/TabList.vue'
    import Cart from 'components/WebAdmin/Cart/Cart.vue'
  	import HomeServiceTabList from 'components/Webadmin/Tabs/HomeServiceTabList.vue'

    export default{
    	components:{
	        TabList,
	        Cart,
	        HomeServiceTabList,
	    },
        data(){
            return{
                oldPayment: null,
                order:{
                    vehicle_type: '',
                    vehicle_model: '',
                	phone : '',
                    email : '',
                	userType : '',
                    first_name: '',
                    last_name: '',
                    plate_number: '',
                	user_operator_id : null,
                	cashier_id : '',
                	customer_id : null,
					customer_plate_number_id : null,
                	location_id : '',
                	address : null,
                	address_id : '',
                	discount_id : null,
                	is_free_wash : false,
                	subtotal : 0,
                	total : 0,
                	discounted_amount : 0,
                	free_discount : false,
                	action : null,
                	amount_paid : 0,
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

                countryCodePrefix : '234',
                phoneNumber : '',

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
            }
        },

        computed: {
            ...mapGetters({
                message: 'message',
                errorMessage: 'errorMessage',
                newPhoneNumber: 'auth/phone',
                plateVehicleDetails: 'plateNumber/plateNumberDetails',
                cart: 'webAdminShopping/cart',
            	cartTotal: 'webAdminShopping/cartTotal',
				userDiscountPriviledge: 'webAdminShopping/userDiscountPriviledge',
				discount: 'webAdminShopping/discount',
				discountDetails: 'webAdminShopping/discountDetails',
				discountedAmount: 'webAdminShopping/discountedAmount',
          		locations: 'location/locations',
          		allLocations: 'locationSettings/locations',
            	authenticated: 'auth/user',
				packageLocationCount: 'webAdminShopping/packageLocationCount',
				packageHomeOfficeCount: 'webAdminShopping/packageHomeOfficeCount',
				subTotal: 'webAdminShopping/subTotal',
            	productTotal: 'webAdminShopping/productTotal',
            	user: 'auth/user',
            }),
        },
            
        methods:{
            ...mapActions({
              	sendPlatenumber: 'plateNumber/getPlateNumber',
              	updateCustomer: 'plateNumber/updateCustomer',
				placeCustomerOrder: 'orders/placeOrder',
        		getLocations: 'location/getLocations',
        		getAllLocations: 'locationSettings/getLocations',
				placeHomeServiceOrder: 'webAdminOrders/placeHomeServiceOrder',
				sendOrder: 'webAdminOrders/placeOrder',
            }),

            placeOrder(){
            	if(this.order.userType == 'location-user'){
	            	this.order.home_service_booking_date = null
	            	this.order.home_service_booking_time = null
            		// this.order.phone = this.order.phone
            	}

            	if(this.order.userType == 'home-service-non-user'){
            		
            	}

            	this.order.packages = this.cart
            	this.order.served_location_id = this.order.location_id
	        	this.order.location_id = this.user.location.id
	        	this.order.total = this.cartTotal
	        	this.order.cashier_id = this.user.id
	        	this.order.user_operator_id = this.user.id
	        	this.order.discount = this.discountDetails
	        	this.order.discount_id = this.discountDetails != null ? this.discountDetails.id : null
	        	this.order.coupon = this.couponDetails
	        	this.order.coupon_id = this.couponDetails != null ? this.couponDetails.id : null
	        	this.order.subtotal = this.subTotal
	        	this.order.discounted_amount = this.subTotal - this.cartTotal
	        	this.order.service_status = this.order.status
	        	this.order.transaction_initiated_date = this.currentDate()
	        	this.order.transaction_initiated_time = this.time()

	        	console.log(this.order)

				this.sendOrder(this.order).then((response) => {
					return this.step = 5
	            }).catch((error) => {
	                console.log(error)
	                if(this.errorMessage){
	                    this.negativeNotification('cannot process order at the moment')
	                }
	            })           
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

            optionsFn (mon) {
	     		var today = new Date();
	  			var bu = today.getDate();
		      	
	     		console.log(new Date())
	     		var timeStamp = Date.now()
				var formattedString = date.formatDate(timeStamp, 'YYYY/MM/DD')
		      	return mon >= formattedString
		    },

            submitFindVehicle(){
                this.sendPlatenumber(this.plateNumber.number).then((res) => {
                    this.trigger = true
                    this.order.plate_number = this.plateNumber.number
                    console.log(this.plateVehicleDetails)

		        	var n = this.plateVehicleDetails.phone ? this.plateVehicleDetails.phone : null

	        		if(n!=null && n.length == 13 && n.startsWith("234")){
	        			var phoneNum = n.slice(3)
	        			this.phoneNumber = phoneNum
	        		}

                    this.order.first_name = this.plateVehicleDetails.firstName
                    this.order.last_name = this.plateVehicleDetails.lastName
                    this.order.vehicle_type = this.plateVehicleDetails.vehicleModel
                    this.order.vehicle_model = this.plateVehicleDetails.vehicleType
                    this.order.customer_id = this.plateVehicleDetails.userId
                    this.order.customer_plate_number_id = this.plateVehicleDetails.id
                    
                }).catch((error) => {
                    this.errorMessages = error
                    console.log(this.errorMessages)
                    if(this.errorMessages){
                        this.negativeNotification(this.errorMessages)
                    }
                })    
            },

            currentDate () {
	     		var today = new Date();
	  			var bu = today.getDate();
		      	
	     		console.log(new Date())
	     		var timeStamp = Date.now()
				var formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')
				return formattedString
		    },

            updateUser(){
            	// attach country code to server
                this.order.phone = this.countryCodePrefix+this.phoneNumber

            	this.updateCustomer(this.order).then((res) => {
      				this.readonly = true
                    this.order.plate_number = this.plateNumber.number
                    console.log(this.plateVehicleDetails)
                    this.order.phone = this.plateVehicleDetails.phone
                    this.order.first_name = this.plateVehicleDetails.firstName
                    this.order.last_name = this.plateVehicleDetails.lastName
                    this.order.vehicle_type = this.plateVehicleDetails.vehicleModel
                    this.order.vehicle_model = this.plateVehicleDetails.vehicleType
                }).catch((error) => {
                    this.errorMessages = error
                    console.log(this.errorMessages)
                    if(this.errorMessages){
                        this.negativeNotification(this.errorMessages)
                    }
                })
            },
            
            processUser(){

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
		    this.getAllLocations()
		}
    }
</script>