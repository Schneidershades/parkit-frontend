<template>
	<div class="q-pa-sm"  v-if="cart.length">
		<table>
            <thead>
                <tr>
                    <th scope="col">Action</th>
                    <th scope="col">Package</th>
                    <th scope="col">Location</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in cart" :key="item.id">
                    <td data-label="Action">
                    	<q-btn flat color="danger" icon="delete_outline" @click.prevent="removeProductFromCart(item.id)"></q-btn>
                    </td>
                    <td data-label="Package"><b>{{item.vehicle}}</b> - {{item.package}}</td>
                    <td data-label="Location">{{item.venue}}</td>
                    <td data-label="Unit">
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
                    <td data-label="Amount">₦ {{item.amount}}</td>
                    <td data-label="Total">₦ {{item.amount * item.quantity}}</td>
                </tr><tr>
                	<td></td>
                	<td></td>
                	<td colspan="3"><b>Subtotal</b></td>
                	<td><h6>₦ {{cartTotal}}</h6></td>
                </tr>
                <tr>
                	<td></td>
                	<td></td>
                	<td></td>
                	<td></td>
                	<td></td>
                	<td colspan="">
                		<h6>
                		<q-btn
                			to="/user/checkout"
					        type="submit"
					        label="Checkout"
					        class="q-mt-md"
					        color="primary"
					    ></q-btn>
					</h6></td>
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
      		errorMessage: '',
      		location_id: '',
      		address_id: '',
      		newAddress: false,

      		newUserAddress: {
      			name:'',
      			address: '',
      			city: '',
      			postal_code: '',
      			country_id: '',
      		},

      		date: '2019/02/01',
      		options: [ '2019/02/01', '2019/02/05', '2019/02/06', '2019/02/09', '2019/02/23' ]
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
			packageLocationCount: 'shopping/packageLocationCount',
			packageHomeOfficeCount: 'shopping/packageHomeOfficeCount',
			locations: 'location/locations',
			addresses: 'address/addresses',
        }),
        
        carTotalLength(){
            return "Cart (" + this.cartItemCount + ") - ₦" + this.cartTotal
        },

        percentageDiscount(){
        	return this.discount + '% Discount Applied'
        }


    },

	methods:{
		...mapActions({
			removeProductFromCart: 'shopping/removeProductFromCart',
			removeAllProductFromCart: 'shopping/removeAllProductFromCart',
			updateCartTotals: 'shopping/updateCartTotals',
			applyCoupon: 'shopping/applyCoupon',
			getLocations: 'location/getLocations',
			getAddresses: 'address/getAddresses',
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

		simulateSubmit () {
	      	this.applyCoupon(this.couponId).then((response) => {
	      		this.submitting = true
                console.log(response)
                // console.log(response.data.data)
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
		this.getLocations()
		this.getAddresses()
	}
}
</script>