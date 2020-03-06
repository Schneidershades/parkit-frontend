<template>
	<q-page padding>
		<div class="q-pa-md q-gutter-sm">
			<q-breadcrumbs>
				<q-breadcrumbs-el label="Home" />
				<q-breadcrumbs-el label="Online Transaction" />
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
						</div>
            		
				        <q-stepper-navigation>
				          	<q-btn v-if="transactionDetails!=null" @click="step = 2" color="primary" label="Continue" />
				        </q-stepper-navigation>
			      	</q-step>

				    <q-step
				        :name="2"
				        title="View Order Packages"
				        caption="Customer choosen Packages"
				        icon="create_new_folder"
				        :done="step > 2"
				    	>
				    		<!-- {{transactionDetails}} -->

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
				      	<!-- {{transactionDetails}} -->
				        <div class="q-pa-md">
						    <!-- <div class="q-gutter-sm" v-if="transactionDetails.status != 'successful' || transactionDetails.payment_status!='free' ">
						      <q-radio v-model="payment_method" val="pos" label="POS Machine" />
						      <q-radio v-model="payment_method" val="cash" label="Cash" />
						      <q-radio v-model="payment_method" val="online" label="Online" />
						    </div>

						    <div v-else> {{transactionDetails.payment_status}}</div> -->

						    <!-- {{transactionDetails.status}} -->

						    <!-- <div class="q-px-sm">
						      Your selection is: <strong>{{ payment_method }}</strong>
						    </div> -->
						</div>

				        <q-stepper-navigation>
				          	<q-btn @click="step = 4" color="primary" label="Continue" />
				          	<q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
				        </q-stepper-navigation>
				    </q-step>

				    <q-step
					        :name="4"
					        title="Print Invoice"
					        icon="print"
					      >
				        
						<PrintTransaction/>
				        <q-stepper-navigation>
				          	<q-btn color="primary" label="Finish" />
				          	<q-btn flat @click="step = 3" color="primary" label="Back" class="q-ml-sm" />
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
    import Transactions from 'components/Admin/Orders/Transactions.vue'
    import TransactionDetailsPackage from 'components/Admin/Orders/TransactionDetailsPackage.vue'
    import PrintTransaction from 'components/Admin/Orders/PrintTransaction.vue'

    export default{
    	components:{
	        TabList,
	        Cart,
	        Transactions,
	        TransactionDetailsPackage,
	        PrintTransaction
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
				userDiscountPriviledge: 'shopping/userDiscountPriviledge',
				discount: 'shopping/discount',
				discountDetails: 'shopping/discountDetails',
				allTransactions: 'onlineTransaction/allTransactions',
				transactionDetails: 'onlineTransaction/transactionDetails',
            }),
        },
            
        methods:{
            ...mapActions({
              	sendPlatenumber: 'plateNumber/getPlateNumber',
              	updateCustomer: 'plateNumber/updateCustomer',
				placeCustomerOrder: 'orders/placeOrder',
				getTransactionOrdersOnline: 'onlineTransaction/getTransactionOrdersOnline',
            }),

			findTransaction(type, item){
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

            // print () {
            // 	navigator.bluetooth
            // 	.requestDevice(
            // 	{
            // 		filters: [
            // 		{
            // 			name: 'BlueTooth Printer',
            // 			services: ['000018f0-0000-1000-8000-00805f9b34fb']
            // 		}
            // 		]
            // 	},
            // 	{
            // 		optionalServices: ['00002af1-0000-1000-8000-00805f9b34fb']
            // 	}
            // 	)
            // 	.then(device => {
            // 		console.log('device', device)
            // 		if (device.gatt.connected) {
            // 			device.gatt.disconnect()
            // 		}
            // 		console.log('connect')
            // 		return this.connect(device)
            // 	})
            // 	.catch(this.handleError)
            // },
            // connect (device) {
            // 	const self = this
            // 	device.addEventListener('gattserverdisconnected', this.onDisconnected)
            // 	return device.gatt
            // 	.connect()
            // 	.then(server =>
            // 		server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb')
            // 		)
            // 	.then(service =>
            // 		service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb')
            // 		)
            // 	.then(characteristic => {
            // 		console.log('characteristic', characteristic)
            // 		self.printCharacteristic = characteristic
            // 		self.sendTextData(device)
            // 	})
            // 	.catch(error => {
            // 		this.handleError(error, device)
            // 	})
            // },
            // handleError (error, device) {
            // 	console.error('handleError => error', error)
            // 	if (device != null) {
            // 		device.gatt.disconnect()
            // 	}
            // 	let erro = JSON.stringify({
            // 		code: error.code,
            // 		message: error.message,
            // 		name: error.name
            // 	})
            // 	console.log('handleError => erro', erro)
            // 	if (error.code !== 8) {
            // 		this.$q.notify('Could not connect with the printer. Try it again')
            // 	}
            // },
            // getBytes (text) {
            // 	console.log('text', text)
            // 	let br = '\u000A\u000D'
            // 	text = text === undefined ? br : text
            // 	let replaced = this.$languages.replace(text)
            // 	console.log('replaced', replaced)
            // 	let bytes = new TextEncoder('utf-8').encode(replaced + br)
            // 	console.log('bytes', bytes)
            // 	return bytes
            // },
            // addText (arrayText) {
            // 	let text = this.msg
            // 	arrayText.push(text)
            // 	if (this.isMobile) {
            // 		while (text.length >= 20) {
            // 			let text2 = text.substring(20)
            // 			arrayText.push(text2)
            // 			text = text2
            // 		}
            // 	}
            // },
            // sendTextData (device) {
            // 	let arrayText = []
            // 	this.addText(arrayText)
            // 	console.log('sendTextData => arrayText', arrayText)
            // 	this.loop(0, arrayText, device)
            // },
            // loop (i, arrayText, device) {
            // 	let arrayBytes = this.getBytes(arrayText[i])
            // 	this.write(device, arrayBytes, () => {
            // 		i++
            // 		if (i < arrayText.length) {
            // 			this.loop(i, arrayText, device)
            // 		} else {
            // 			let arrayBytes = this.getBytes()
            // 			this.write(device, arrayBytes, () => {
            // 				device.gatt.disconnect()
            // 			})
            // 		}
            // 	})
            // },
            // write (device, array, callback) {
            // 	this.printCharacteristic
            // 	.writeValue(array)
            // 	.then(() => {
            // 		console.log('Printed Array: ' + array.length)
            // 		setTimeout(() => {
            // 			if (callback) {
            // 				callback()
            // 			}
            // 		}, 250)
            // 	})
            // 	.catch(error => {
            // 		this.handleError(error, device)
            // 	})
            // },

            reset () {
		      	this.theModel = null
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