<template>
	<div class="q-pa-sm"  v-if="cart.length">
		<table>
            <thead>
                <tr>
                    <th scope="col">Package</th>
                    <th scope="col">Location</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in cart" :key="item.id">
                    <td data-label="Package"><b>{{item.vehicle}}</b> - {{item.package}}</td>
                    <td data-label="Location">{{item.venue}}</td>
                    <td data-label="Unit">{{item.quantity}}</td>
                    <td data-label="Amount">₦ {{item.amount}}</td>
                    <td data-label="Total">₦ {{item.amount * item.quantity}}</td>
                </tr>
                <tr>
                	<td></td>
                	<td colspan="2">
					    <template>
						  <form @submit.prevent="couponCheck" class="q-pa-md" ref="form">
						    <q-input
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please type something']"
						      	color="primary"
						      	hint="Type then then click Apply Coupon"
						      	v-model="couponId" 
						        label="Have a coupon code? Place Here"
						    />
						    <div class="row justify-end">
						      	<q-btn
							        type="submit"
							        :loading="submitting"
							        label="Apply Coupon"
							        class="q-mt-md"
							        color="primary"
							    >
						        <template v-slot:loading>
						          <q-spinner-facebook />
						        </template>
						      </q-btn>
						    </div>
						  </form>
						</template>
                	</td>
                	<td>{{errorMessage}} {{errorMessage}}</td>
                	<td><b v-if="discount"> {{discount}} </b></td>
                </tr>
                <tr>
                	<td></td>
                	<td colspan="3"><b>Subtotal</b></td>
                	<td><h6>₦ {{cartTotal}}</h6></td>
                </tr>

                <tr v-if="locationCount > 0 && authenticatedUser!=null">
                	<td>Select Location </td>
                	<td colspan="4">
                		<div class="q-gutter-sm" v-for="location in locations.data" :key="location.id">
                			<b>	<q-radio v-model="location_id" :val="location.id" :label="location.address" /></b>
					    </div>
                	</td>
                </tr>

                <template v-if="packageHomeOfficeCount > 0 && authenticatedUser!=null">
                	<tr>
	                	<td><h6>Select your home-office address</h6></td>
	                	<td colspan="2">
	                		<div class="q-gutter-sm" v-for="address in addresses.data" :key="address.id">
	                			<b>	<q-radio v-model="address_id" :val="address.id" :label="address.name" /></b>
						    </div>

						    <!-- <div v-else>Create a new address</div> -->
	                	</td>

	                	<!-- <td colspan="2" v-else>
	                		
	                	</td> -->

	                	<td></td>
	                	<td>
	                		<q-btn
						        label="Add new address"
						        class="q-mt-md"
						        color="primary"
						        @click="newAddress = !newAddress"

						    >
							</q-btn>
						</td>
	                </tr>

	                <tr v-if="newAddress==true" >
	                	<td><h6>Create a new Address here</h6></td>
	                	<td colspan="4">
	                		<q-form
	                            @submit.prevent="submitNewAddress"
	                        >
		                		<div class="row q-pa-xl">
		                			
			                            <div class="col-md-4 q-pa-sm">
			                                <q-input
			                                    ref="name"
			                                    v-model="newUserAddress.name"
			                                    label="Your Address Title *"
			                                    hint="For Example: My House, My Office, Schneider's House "
			                                    lazy-rules
			                                    :rules="[ val => val && val.length > 0 || 'Please insert an address']"
			                                />
			                            </div>

			                            <div class="col-md-4 q-pa-sm">
			                                <q-input
			                                    ref="name"
			                                    v-model="newUserAddress.city"
			                                    label="Your City *"
			                                    hint="Please insert your city"
			                                    lazy-rules
			                                    :rules="[ val => val && val.length > 0 || 'Please type in you city']"
			                                />
			                            </div>
			                            <div class="col-md-4 q-pa-sm">
			                                <q-input
			                                    ref="name"
			                                    v-model="newUserAddress.postal_code"
			                                    label="Your Postal Code *"
			                                    hint="Please insert your email"
			                                    lazy-rules
			                                    :rules="[ val => val && val.length > 0 || 'Please type something']"
			                                />
			                            </div>
			                            <div class="col-md-12 q-pa-sm">
			                                <q-input
			                                    ref="name"
			                                    v-model="newUserAddress.address"
			                                    label="Your Address *"
			                                    hint="Please insert your full address"
			                                    lazy-rules
			                                    :rules="[ val => val && val.length > 0 || 'Please type something']"
			                                />
			                            </div>
			                            <div class="col-md-12 q-pa-sm">
			                                <q-btn
										        label="Save New Address"
										        class="q-mt-md"
										        color="primary"
										        type="submit"
										        :loading="submittingAddress"
										    >
											</q-btn>
			                            </div>
		                        </div>
		                    </q-form>
	                	</td>
	                </tr>
	                <tr>
	                	<td><h6>Please Select Date/Time of Delivery</h6></td>

	                	<td colspan="4">
	                		<div class="row q-pa-xl">
	                            <div class="col-md-6 q-pl-sm">
	                                <q-input filled v-model="date" mask="date"  :value="optionsFn" :rules="['date']">
								      	<template v-slot:append>
									        <q-icon name="event" class="cursor-pointer">
									          	<q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
									            	<q-date v-model="date" :options="optionsFn" @input="() => $refs.qDateProxy.hide()" />
									          	</q-popup-proxy>
									        </q-icon>
								      	</template>
								    </q-input>
	                            </div>
	                            <div class="col-md-6 q-pl-sm">
	                            	
	                                 <q-input filled v-model="time" mask="time" :rules="['time']">
								        <template v-slot:append>
								          <q-icon name="access_time" class="cursor-pointer">
								            <q-popup-proxy transition-show="scale" transition-hide="scale">
								              <q-time v-model="time"  :options="optionsTime" format24h/>
								            </q-popup-proxy>
								          </q-icon>
								        </template>
								    </q-input>
	                            </div>
	                        </div>
	                	</td>
	                </tr>

	                <tr>
	                	<td colspan="4"><h5>Total</h5></td>
	                	
	                	<td><h6>₦ {{cartTotal}}</h6></td>
	                </tr>
                </template>
                <tr>
					<td colspan="3">
                		<q-btn
                			to="/user/cart"
					        type="submit"
					        label="Back to Cart Page for Changes"
					        class="q-mt-md"
					        color="primary"
					    ></q-btn>
					</td>
					<td colspan="2">
                		<q-btn
	            			@click="placeOrder('book')"
					        label="Proceed"
					        class="q-mt-md"
					        color="primary"
					        v-if="authenticated"
					    ></q-btn>
					</td>
                </tr>
            </tbody>
        </table>
	</div>	
	<div class="q-pa-sm text-center" v-else ><h6>No item in your cart</h6></div>			

</template>

<style scoped>
	table {
		border: 1px solid #ccc;
		border-collapse: collapse;
		margin: 0;
		padding: 0;
		width: 100%;
		table-layout: fixed;
	}

	table caption {
		font-size: 1.5em;
		/*margin: .5em 0 .75em;*/
	}

	table tr {
		background-color: #f8f8f8;
		border: 1px solid #ddd;
		/*padding: .35em;*/
	}

	table th,
	table td {
		padding: .625em;
		text-align: center;
	}

	table th {
		font-size: .85em;
		letter-spacing: .1em;
		text-transform: uppercase;
	}

	@media screen and (max-width: 600px) {
		table {
			border: 0;
		}

		table caption {
			font-size: 1.3em;
		}

		table thead {
			border: none;
			clip: rect(0 0 0 0);
			height: 1px;
			margin: -1px;
			overflow: hidden;
			padding: 0;
			position: absolute;
			width: 1px;
		}

		table tr {
			border-bottom: 3px solid #ddd;
			display: block;
			margin-bottom: .325em;
		}

		table td {
			border-bottom: 1px solid #ddd;
			display: block;
			font-size: .8em;
			text-align: right;
		}

		table td::before {
		    /*
		    * aria-label has no advantage, it won't be read inside a table
		    content: attr(aria-label);
		    */
		    content: attr(data-label);
		    float: left;
		    font-weight: bold;
		    text-transform: uppercase;
		}

		table td:last-child {
			border-bottom: 0;
		}
	}
</style>

<script>

import { mapActions, mapGetters } from 'vuex'
import { Notify } from 'quasar'
import { date } from 'quasar'

export default {
	data () {
		return {
			item: {
				quantity: ''
			},
			coupon: 0,
			couponId: '',
			test: '',
      		submitting: false,
      		submittingAddress: false,
      		errorMessage: '',
      		location_id: '',
      		address_id: '',
      		newAddress: false,

      		newUserAddress: {
      			name:'',
      			address: '',
      			city: '',
      			postal_code: '',
      			state_id: '',
      			country_id: '',
      		},
  			date: '',
			time: '',
		}
	},
	computed: {
        ...mapGetters({
            cart: 'shopping/cart',
            cartItemCount: 'shopping/cartItemCount',
            cartTotal: 'shopping/cartTotal',
            subTotal: 'shopping/subTotal',
            discount: 'shopping/discount',
            authenticated: 'auth/user',
            authenticatedUser: 'auth/user',
			locationCount: 'shopping/packageLocationCount',
			packageHomeOfficeCount: 'shopping/packageHomeOfficeCount',
			locations: 'location/locations',
			addresses: 'address/addresses',
			discountDetails: 'shopping/discountDetails',
			order: 'orders/orderDetails',
        }),
        
        carTotalLength(){
            return "Cart (" + this.cartItemCount + ") - ₦" + this.cartTotal
        },
    },

	methods:{
		...mapActions({
			removeAllProductFromCart: 'shopping/removeAllProductFromCart',
			updateCartTotals: 'shopping/updateCartTotals',
			applyCoupon: 'shopping/applyCoupon',
			getLocations: 'location/getLocations',
			getAddresses: 'address/getAddresses',
			placeUserOrder: 'orders/placeOrder',
			saveAddress: 'address/saveAddress',
		}),

		submitNewAddress () {
	      	this.saveAddress(this.newUserAddress).then((response) => {
	      		this.submittingAddress = true
            }).catch((error) => {
                console.log(error)
                if(this.errorMessage){
                    this.negativeNotification(this.errorMessage)
                }
            })           
	      	setTimeout(() => {
		        this.submittingAddress = false
	      	}, 3000)
	    },
		
		placeOrder(action){ 
			if(this.locationCount > 0 && this.location_id == '' ){
				return this.negativeNotification('please select a location')
			}

			if(this.packageHomeOfficeCount > 0 && this.address_id == ''){
				return this.negativeNotification('please select an address')
			}

			if(this.packageHomeOfficeCount > 0 && this.time == '' && this.date == '' ){
				return this.negativeNotification('please select an appointed date/time for home service')
			}

			// if(this.locationCount = 0 && this.packageHomeOfficeCount > 0){
			// 	this.location_id = ""
			// }else{
			// 	this.date = ""
			// 	this.time = ""
			// 	this.address = ""
			// }

			// if(this.packageLocationCount > 0 && this.packageHomeOfficeCount = 0){
			// 	this.date = ""
			// 	this.time = ""
			// 	this.address = ""
			// }

			// console.log(action)
			this.placeUserOrder({
				customer_id: this.authenticatedUser.id,
				address_id: this.address_id,
				location_id: this.location_id,
				coupon_id: this.coupon_id,
				platform_initiated: 'web',
				action: action,
				home_service_booking_date: this.date,
				home_service_booking_time: this.time,
				discount_id: this.discountDetails ? this.discountDetails.id : null,
			}).then((response) => {
				if(this.order != null){
					return this.$router.push({ path: `/user/order/${this.order.receipt_number}` })
				}else{
					return this.$router.push({ name: 'userOrder'})
				}
            }).catch((error) => {
                console.log(error)
                if(this.errorMessage){
                    this.negativeNotification('cannot process order at the moment')
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

	    optionsTime (hr) {
	      if (hr < 8 || hr > 17 ) {
	        return false
	      }
	      // if (min !== null && (min <= 25 || min >= 58)) {
	      //   return false
	      // }
	      // if (sec !== null && sec % 10 !== 0) {
	      //   return false
	      // }
	      return true
	    },


		updateCart(item,quantity){
			this.updateCartTotals([{
				id: item,
				quantity: quantity
			}])
		},


		couponCheck () {
	      	this.applyCoupon(this.couponId).then((response) => {
	      		this.submitting = true
      			this.newAddress = false
            }).catch((error) => {
                console.log(error)
                if(this.errorMessage){
                    this.negativeNotification(this.errorMessage)
                }
            })           
	      	setTimeout(() => {
		        this.submitting = false
	      	}, 3000)
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
		this.getAddresses()
	}
}
</script>