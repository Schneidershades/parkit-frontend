<template>
	<div class="q-pa-sm"  v-if="cart.length">
		<table>
            <thead>
                <tr>
                    <th scope="col">Action</th>
                    <th scope="col">Package</th>
                    <th scope="col">Venue</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in cart" :key="item.id">
                    <td data-label="Action">
                    	<q-btn flat color="danger" icon="delete_outline" @click.prevent="removeProductFromCart(item.id)"></q-btn>
                    </td>
                    <td data-label="Package"><b>{{item.vehicle}}</b> - {{item.package}}</td>
                    <td data-label="Venue">{{item.venue}}</td>
                    <td data-label="Quantity">
						<q-input
					      	ref="quantity"
					        type="number"
					        min="1"
					        v-model="item.quantity"
					        label="Your quantity *"

					        @change="updateCart(item, item.quantity)"
					        lazy-rules
					        :rules="[
					          val => val !== null && val !== '' || 'Please type a number',
					          val => val > 0  || 'Please type a number'
					        ]"
					    />
					</td>
                    <td data-label="Unit">₦ {{item.amount}}</td>
                    <td data-label="Amount">₦ {{item.amount * item.quantity}}</td>
                </tr>
                <tr>
                	<td colspan="4">
						<template v-if="userDiscountPrivilege == true">
					    	<q-card-actions align="left">
							    <div class="q-px-sm row ">
							    	<div class="col-12 col-md-12">
							         	<h6>Discount</h6>
							      	</div>
							      	<div class="col-12 col-md-8">
							        	Amount <q-toggle toggle-indeterminate size="lg" v-model="theModel" label="Percentage" />
							      	</div>
							      	<div class="col-12 col-md-4">
							         	<q-btn color="primary" label="Reset" @click="reset" class="q-ml-md"/>
							      	</div>
							    </div>
						    </q-card-actions>
					    	<q-form
	                            @submit.prevent="submitDiscount"
	                            class="q-gutter-md q-pt-xl"
	                            ref="form"
	                        >
	                        	<div class="row" v-if="theModel==true">
	                        		<h6 class="col-12 col-md-12 q-pl-sm">Discount Percentage</h6>
		                            <div class="col-12 col-md-4 q-pl-sm">
		                                <q-input
		                                    ref="name"
		                                    v-model="number.percentage"
		                                    filled
		                                    type="number"
		                                    min="0"
		                                    max="100"
		                                    :dense="densePercentage"
		                                    label="Discount Percentage *"
		                                    :readonly="readonlyPercentage"
		                                />
		                            </div><br>
		                            <div class="col-12 col-md-4">
								      	<q-btn
									         @click="submitDiscount('percentage', number.percentage)"
									        :loading="submitting"
									        label="Apply Discount"
									        class="q-mt-md"
									        color="primary"
									    >
								        <template v-slot:loading>
								          <q-spinner-facebook />
								        </template>
								      </q-btn>
								    </div>
		                        </div>
	                        	<div class="row" v-if="theModel==false">
	                        		<h6 class="col-12 col-md-12 q-pl-sm">Discount Amount</h6>
		                            <div class="col-12 col-md-4 q-pl-sm">
		                                <q-input
		                                    ref="name"
		                                    filled
		                                    type="number"
		                                    min="0"
		                                    :max="this.cartTotal"
		                                    :dense="denseAmount"
		                                    v-model="number.amount"
		                                    label="Discount Amount *"
		                                    :readonly="readonlyAmount"
		                                />
		                            </div>
		                            <div class="col-12 col-md-4">
								      	<q-btn
									        @click="submitDiscount('amount', number.amount)"
									        :loading="submitting"
									        label="Apply Discount"
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

						<template v-else>
							<q-btn type="submit"
							        label="Authorize Discounts"
							        class="q-mt-md"
							        color="primary"
							        @click="signInDiscountModal = true"
							>
							
							</q-btn>

							<q-dialog v-model="signInDiscountModal">
					            <SignInDiscountModal/>
					        </q-dialog>
						</template>

						<template>
						  <form @submit.prevent="simulateSubmit" class="q-pa-md" ref="form">
						    <q-input
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please type something']"
						      	color="primary"
						      	hint="Type then hit Enter key above"
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
                	<td><b v-if="discount"> {{discount}}</b></td>
                </tr>
                <tr>
                	<td></td>
                	<td></td>
                	<td colspan="3"><b>Subtotal</b></td>
                	<td><h6>₦ {{cartTotal}}</h6></td>
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
import SignInDiscountModal from 'components/Admin/Modal/SignInDiscountModal.vue'
import { Platform } from 'quasar'
    const isOnline = require('is-online');

export default {
	components:{
        SignInDiscountModal
    },
	data () {
		return {
			item: {
				quantity: ''
			},
            signInDiscountModal: false,
			number:{
				percentage: 0,
				amount: 0,
			},

			signInDiscount:{
				user: '',
				password: '',
				permission: '',
			},

            densePercentage: null,
      		readonlyPercentage: null,
            denseAmount: null,
      		readonlyAmount: null,
			coupon: 0,
			couponId: '',
			test: '',
      		submitting: false,
      		errorMessage: '',
      		location_id: '',
      		address_id: '',
      		newAddress: false,
      		theModel: null,
      		theModel2: 'maybe',

      		newUserAddress: {
      			name:'',
      			address: '',
      			city: '',
      			postal_code: '',
      			country_id: '',
      		}
		}
	},
	computed: {
        ...mapGetters({
            cart: 'shopping/cart',
            cartItemCount: 'shopping/cartItemCount',
            cartTotal: 'shopping/cartTotal',
            subTotal: 'shopping/subTotal',
            discount: 'shopping/discount',
            user: 'auth/user',
			packageLocationCount: 'shopping/packageLocationCount',
			packageHomeOfficeCount: 'shopping/packageHomeOfficeCount',
			locations: 'location/locations',
			addresses: 'address/addresses',
			userDiscountPrivilege: 'shopping/userDiscountPrivilege',
			discountDetails: 'shopping/discountDetails',
			setDefaultDiscountToZero: 'shopping/setDefaultDiscountToZero',
            online: 'auth/onlineStatus',
        }),
        
        carTotalLength(){
            return "Cart (" + this.cartItemCount + ") - ₦" + this.cartTotal
        },

    },

	methods:{
		...mapActions({
			removeProductFromCart: 'shopping/removeProductFromCart',
			removeAllProductFromCart: 'shopping/removeAllProductFromCart',
			updateCartTotals: 'shopping/updateCartTotals',
			applyCoupon: 'shopping/applyCoupon',
			getLocations: 'location/getLocations',
			getAddresses: 'address/getAddresses',
			applyDiscount: 'shopping/applyCustomerDiscount',
			resetDiscount: 'shopping/applyResetDiscount',
			setUserDiscountPrivilege: 'shopping/setUserDiscountPrivilege',
			getUsersWithDiscountPrivilege: 'shopping/getUsersWithDiscountPrivilege',
			defaultDiscountOnWeb: 'shopping/defaultDiscountOnWeb',
			defaultDiscountToZeroOnLocationManagerApp: 'shopping/defaultDiscountToZeroOnLocationManagerApp',
            connected: 'internetStatus/setConnection',
		}),

		updateCart(item,quantity){
			this.updateCartTotals([{
				id: item,
				quantity: quantity
			}])
		},


        optionsFn (date) {
     		var today = new Date();
  			var bu = today.getDate();
	      	return date >= bu
	    },

	    discountAmountOrPercentage(){
	    	conole.log('good')
	    },

	    reset () {
	      	this.theModel = null
	      	this.resetDiscount()
	    },

	    simulateSubmit () {
	    	(async () => {
                var check = await isOnline()
                console.log(check);
                if(check == false){
                    return this.negativeNotification('You are offline. Please connect to an available internet')
                }
                this.connected(check).then((res) => {
                    
                })
                
            })(); 
        	
	      	this.applyCoupon(this.couponId).then((response) => {
	      		this.submitting = true
            }).catch((error) => {

            	this.negativeNotification(error)
                // console.log(error)
                // if(error){
                //     this.negativeNotification(this.error.error)
                // }
            })           

	      	// Simulating a delay here.
	      	// When we are done, we reset "submitting"
	      	// Boolean to false to restore the
	      	// initial state.
	      	setTimeout(() => {
		        // delay simulated, we are done,
		        // now restoring submit to its initial state
		        this.submitting = false
	      	}, 3000)
	    },

		submitDiscount (type, number) {
			// if (!this.$can('create', 'discounts')){
			// 	return this.negativeNotification('You are not authorized to give discounts at this moment')
			// }
			
        	(async () => {
                var check = await isOnline()
                console.log(check);
                if(check == false){
                    return this.negativeNotification('You are offline. Please connect to an available internet')
                }
                this.connected(check).then((res) => {
                    
                })
                
            })(); 
			
			if(type == 'percentage' && parseInt(number) > 0 ){
				this.number.amount = 0
			}

			if(type == 'percentage' && parseInt(number) > 100 ){
				this.number.amount = 0
				return this.negativeNotification('please your percentage should be less than 100')
			}

			if(type == 'amount' && parseInt(number) > 0 ){
				this.number.percentage = 0
			}

			if(type == 'amount' && parseInt(number) > this.cartTotal){
				return this.negativeNotification('please your amount should not be more than total amount ' + this.cartTotal)
			}

			if(this.userDiscountPrivilege == null || this.userDiscountPrivilege == []){
				var user_discount_operator_id = this.user.id
			}else{
				var user_discount_operator_id = this.userDiscountPrivilege.id
			}

			this.applyDiscount({
				percentage: this.number.percentage,
				amount: this.number.amount,
				user_discount_operator_id: user_discount_operator_id
			}).then((response) => {
	      		this.submitting = true
            }).catch((error) => {
                // this.errorMessage = error
                // console.log(this.errorMessage)
                console.log(error)
                // if(this.errorMessage){
                //     this.negativeNotification(this.errorMessage)
                // }
            })  

	      	// Simulating a delay here.
	      	// When we are done, we reset "submitting"
	      	// Boolean to false to restore the
	      	// initial state.
	      	setTimeout(() => {
		        // delay simulated, we are done,
		        // now restoring submit to its initial state
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

		if(this.$can('create', 'discounts')){
			this.setUserDiscountPrivilege(true)
		}else{
			this.setUserDiscountPrivilege(false)
		}
		this.getUsersWithDiscountPrivilege()


		// if(Platform.is.electron){
		// 	return this.defaultDiscountToZeroOnLocationManagerApp()
		// }else{
		// 	return this.defaultDiscountOnWeb()
		// }
	}
}
</script>