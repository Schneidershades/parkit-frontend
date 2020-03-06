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
			        
            		<tab-list></tab-list>

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

                        <template v-if="plateVehicleDetails.user">
                        	<q-form
	                            @submit="updateUser"
	                            class="q-gutter-md q-pt-xl"
	                            ref="form"
	                        >
	                        	<div class="row">
	                        		<div class="col-4 q-pa-sm">
		                                <q-input
		                                    ref="name"
		                                    v-model="newUser.plate_number"
		                                    filled
		                                    label="Plate Number *"
		                                    readonly
		                                    :value="plateNumber.number"
		                                />
		                            </div>
		                            <div class="col-4 q-pa-sm">
		                                <q-input
		                                    ref="name"
		                                    :dense="dense"
		                                    :readonly="readonly"
		                                    filled
			                                prefix="+234"
			                                v-model="newUser.phone"
			                                label="Phone Number"
			                                mask="(###) ### - ####"
			                                unmasked-value
			                                hint="Hint : (703) 749 - 5705"
			                                lazy-rules
			                                :rules="[val => !!val || '* Required', val => val && val.length > 0 || 'Please type in your phone number']"
		                                />
		                            </div>
		                            <div class="col-4 q-pa-sm">
										<q-select 
		                            		filled 
		                            		v-model="newUser.vehicle_type" 
		                            		:options="vehicles" 
		                                    label="Get Vehicle Type *"
		                                    lazy-rules
		                                    :dense="dense"
		                                    :readonly="readonly"
		                            	/>
		                            </div>
		                            <div class="col-4 q-pa-sm">
		                            	<q-select 
		                            		filled 
		                                    v-model="newUser.vehicle_model"
		                            		:options="models" 
		                                    label="Vehicle Model *"
		                                    lazy-rules
		                                    :dense="dense"
		                                    :readonly="readonly"
		                            	/>
		                            </div>
	                        		<div class="col-4 q-pa-sm">
		                                <q-input
		                                    ref="name"
		                                    v-model="newUser.first_name"
		                                    filled
		                                    :dense="dense"
		                                    label="First Name *"
		                                    :readonly="readonly"
		                                />
		                            </div>
		                            <div class="col-4 q-pa-sm">
		                                <q-input
		                                    ref="name"
		                                    filled
		                                    :dense="dense"
		                                    v-model="newUser.last_name"
		                                    label="Last Name *"
		                                    :readonly="readonly"
		                                />
		                            </div>
		                        </div> 

		                        <q-card-actions align="right">
						          	<q-toggle color="warning" v-model="readonly" label="Edit User" /><br>
						          	<q-btn color="primary" type="submit" label="Save Details " />
							    </q-card-actions>
	                        </q-form>
                        </template>

                        <q-stepper-navigation >
				          	<q-btn v-if="plateVehicleDetails.user" @click="step = 4" color="primary" label="Continue" />
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
					      <q-radio v-model="payment_method" val="pos" label="POS Machine" />
					      <q-radio v-model="payment_method" val="cash" label="Cash" />
					      <q-radio v-model="payment_method" val="online" label="Online" />
					    </div>

					    <div class="q-px-sm">
					      Your selection is: <strong>{{ payment_method }}</strong>
					    </div>
					</div>

			        <q-stepper-navigation>
			          <q-btn @click="step = 5" color="primary" label="Continue" />
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
  	import TabList from 'components/Tabs/TabList.vue'
    import Cart from 'components/Admin/Cart/Cart.vue'

    export default{
    	components:{
	        TabList,
	        Cart
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

                order:{

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
            }
        },

        computed: {
            ...mapGetters({
                message: 'message',
                errorMessage: 'errorMessage',
                newPhoneNumber: 'auth/phone',
                plateVehicleDetails: 'plateNumber/plateNumberDetails',
                cart: 'shopping/cart',
				userDiscountPriviledge: 'shopping/userDiscountPriviledge',
				discount: 'shopping/discount',
				discountDetails: 'shopping/discountDetails',
            }),
        },
            
        methods:{
            ...mapActions({
              	sendPlatenumber: 'plateNumber/getPlateNumber',
              	updateCustomer: 'plateNumber/updateCustomer',
				placeCustomerOrder: 'orders/placeOrder',
            }),

            placeOrder(){
				this.placeCustomerOrder([{
					customer_id: this.authenticatedUser.id,
					address_id: this.address_id,
					location_id: this.location_id,
					coupon_id: this.coupon_id,
					discount_id: this.discountDetails.id,
				}]).then((response) => {
					this.$router.push({name: 'userOrderShow'})      		
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