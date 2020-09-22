<template>
	<div class="q-pa-sm" v-if="order">
		<table>
            <thead>
                <tr>
                	<td>
                      	<p class="text-left"><b> ID No</b></p>
                      	<p class="text-left">{{order ? order.receipt_number : 'N/A'}}</p>
                  	</td>
                	<td>
                		<p class="text-left"><b>Status</b></p>
                      	<p class="text-left">{{order.status}}</p>
                	</td>

                	<td>
                      	<p class="text-left"><b> Date</b></p>
                      	<p class="text-left">{{order.created_at}}</p>
                	</td>
                	<td  colspan="2">
                		<p class="text-left"><b> Location</b></p>
						
                		<template v-if="order.location != null && order.address != null">
                      		<p class="text-left">Home-Service Address: {{order.address.address}}</p>
                      		<p class="text-left">Location : {{order.location.short_name}}</p>
                      	</template>
                      	<template v-if="order.location == null && order.address != null">
                      		<p class="text-left">Home-Service Address: {{order.address.address}}</p>
                      	</template>
                      	<template v-if="order.location != null && order.address == null">
                      		<p class="text-left">Location: {{order.location.short_name}}</p>
                      	</template>
                	</td>
                </tr>

                <tr v-if="order.address != null">
                	<td colspan="3">
                      	Home Service Date: {{order.home_service_booking_date}}
                  	</td>

                  	<td colspan="2">
                      	Home Service Time: {{order.home_service_booking_time}}
                  	</td>
                </tr>
                <tr>
                    <th scope="col">Package</th>
                    <th scope="col">Location</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>

                <tr v-for="item in order.products" :key="item.id">
                    <td data-label="Package">{{item.package}}</td>
                    <td data-label="Location">{{item.venue}}</td>
                    <td data-label="Unit">{{item.quantity}}</td>
                    <td data-label="Amount">{{item.amount}}</td>
                    <td data-label="Total">₦ {{item.total}}</td>
                </tr>

                <tr v-if="order.subtotal">
                	<td></td>
                	<td colspan="3"><b>Subtotal</b></td>
                	<td colspan="1"><b>₦ {{order.sub_total}}</b></td>
                </tr>
                <tr v-if="order.discount">
                	<td></td>
                	<td colspan="3"><b>Discount</b></td>
                	<td colspan="1"><b>₦ {{order.discount}}</b></td>
                </tr>

                <tr v-if="order.total">
                	<td></td>
                	<td colspan="3"><b>Total</b></td>
                	<td colspan="1"><b>₦ {{order.total}}</b></td>
                </tr>

                <tr v-if="order.payment_status != 'successful'">
                	<td></td>
                	<td colspan="2">
                		<Rave
					       	:email="email"
					       	:amount="payAmount"
					       	:reference="reference"
					       	:rave-key="raveKey"
					       	:callback="callback"
					       	:close="close"
					       	:metadata="meta"
					       	:subaccounts="sub"
					       	:redirectUrl="redirect"
					       	:paymentPlan="plan"
					       	:customerFirstname="fname"
					       	:customerLastname="fname"
					       	paymentOptions="card,barter,account,ussd"
					       	hostedPayemt="1"
					       	customTitle="Car Wash Package Purchase"
					       	currency="NGN"
					       	country="NG"
					       	class="q-btn q-mt-md"
					   		>
					   		<q-btn :label="payWithCardAmountLabel" @click="payAtLocation(order.id)" color="primary"></q-btn>
						</Rave>
                	</td>

                	<td colspan="2">
                		<q-btn :label="payAtLocationAmountLabel" @click="payAtLocation(order.id)" color="primary"></q-btn>
                	</td>
                </tr> 
                <tr v-else>
                	<td></td>
                	<td colspan="2"><b>Status</b> <br>{{order.payment_status}}</td>
                	<td colspan="2"><b>Wash Status</b> <br>{{order.status}}</td>
                </tr>  
            </tbody>
        </table>
	</div>	
</template>

<style scoped>
	.rave-btn{

	}
	
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
import Rave from 'vue-ravepayment'

export default {
	props :[
		'orderId'
	],
	components: {
        Rave
    },
	data () {
		return {
			raveKey: '',
	        email: "parkitng@gmail.com",
	        amount: "",
	        plan: 0,
	        fname: "parkit",
	        lname: "parkit",
	        redirect: "/user/order/payment/"+this.$route.params.orderId + "/transaction",
	        // close: false,
	        meta: [{
	            metaname: 'orderId',
	            metavalue: this.$route.params.orderId
	        }],
	        sub: [],
	        paymentContent: []
		}
	},
	computed: {
        ...mapGetters({
            order: 'orders/orderDetails',
            discount: 'shopping/payWithCard',
            authenticated: 'auth/user',
        }),

        reference(){
	        let text = "";
	        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	 
	        for( let i=0; i < 10; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	 
	        return text;
	    },

	    payAmount(){
	    	var amt = this.discount / 100 * this.order.total
	    	return this.order.total - amt
	    },

	    payWithCardAmountLabel(){
	    	var amt = this.discount / 100 * this.order.total
	    	var amount = this.order.total - amt
	    	return  'Pay ₦' + amount + ' with card '
	    },

	    payAtLocationAmountLabel(){
	    	return  'Pay ₦' + this.order.total + ' at location '
	    },
    },

	methods:{
		...mapActions({
			gatewayResponse: 'orders/paymentProcess',
			payNowAtLocation: 'orders/payAtLocation',
		}),

		payAtLocation(orderId)
		{
			this.payNowAtLocation(orderId).then((response) => {
	        	var redirect = "/user/order/payment/"+this.$route.params.orderId + "/transaction"
	      		this.$router.push({ path: redirect })	
            }).catch((error) => {
                
            })  
		},

		callback: function(response){ 
	        console.log(response.data)
	        
	        var content = {
	        	payment_reference : response.tx.txRef
	        }

	        this.gatewayResponse(content).then((response) => {
	        	var redirect = "/user/order/payment/"+this.$route.params.orderId + "/transaction"
	      		this.$router.push({ path: redirect })	      		
            }).catch((error) => {
                console.log(error)
            })  
	    },

	    close: function(){
	        console.log("Payment closed")
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
	mounted()
	{
		this.raveKey = 'FLWPUBK_TEST-89dd826197ba331a9c3545690f8d2416-X'
	}
}
</script>