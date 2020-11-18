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
                      		<p class="text-left">Home-Service Address: {{order.address.address ? order.address.address : 'NA'}}</p>
                      		<p class="text-left">Location : {{order.location ? order.location.short_name : 'Not Assigned'}}</p>
                      	</template>
                      	<template v-if="order.location == null && order.address != null">
                      		<p class="text-left">Home-Service Address: {{order.address.address ? order.address.address : 'NA'}}</p>
                      	</template>
                      	<template v-if="order.location != null && order.address == null">
                      		<p class="text-left">Location: {{order.location ? order.location.short_name : 'Not Assigned'}}</p>
                      	</template>

                      	<template v-if="order.home_service_booking_date == null || order.location == null">
                      		<p class="text-left">Location: {{order.location ? order.location.name : 'Not Assigned'}}</p>
                      	</template>
                	</td>
                </tr>

                <tr v-if="order.address != null">
                	<td colspan="3">
                      	Home Service Date: {{order.home_service_booking_Date}}
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

                <tr v-if="order.action == 'online-payment' && order.status != 'successful'">
                	<td></td>
                	<td colspan="2">
                	</td>

                	<td colspan="2">
                	</td>
                </tr>   
            </tbody>

        </table>


        <div class="q-py-md">
        	<template v-if="order">
        		<div class="text-h5 q-py-md">More Information</div>
	        	<div class="row">
	        		<div class="col-xs-4 ">
	        			<b>Status :</b> {{order.status}}
		        	</div>
		        	<div class="col-xs-4 ">
	        			<b>Type :</b>{{order.home_service_booking_date ? 'Home Service' : 'Location Service'}}
		        	</div>

		        	<div class="col-xs-4 ">
	        			<b>Free :</b> {{order.is_free_wash ? 'Yes' : 'No'}}
		        	</div>

		        	<div class="col-xs-4 ">
	        			<b>Paid :</b> {{order.amount_paid ? order.amount_paid : 'Not Paid'}}
		        	</div>
		        	<div class="col-xs-4 ">
		        		<b>Payment Method : </b> {{order.payment_method ? order.payment_method : 'Not Paid'}}
		        	</div>

		        	<div class="col-xs-4 ">
		        		<b>Date :</b> {{order.transaction_initiated ? order.transaction_initiated : 'N/A'}} - {{order.time ? order.time : 'N/A'}}
		        	</div>

		        	
	        	</div>
        	</template>
	        	
        	<template v-if="order.customer">
        		<div class="text-h5 q-py-md">Customer & Vehicle Information</div>
	        	<div class="row">

	        		<div class="col-4 q-py-sm">
	        			Number: <br><b>{{order.vehicle.plate_number  ? order.vehicle.plate_number : 'N/A'}}</b>
		        	</div>
		        	<div class="col-4 q-py-sm">
	        			Vehicle Type: <br><b>{{order.vehicle.vehicle_type  ? order.vehicle.vehicle_type : 'N/A'}}</b>
		        	</div>

		        	<div class="col-4 q-py-sm">
	        			Model: <br><b>{{order.vehicle.vehicle_model  ? order.vehicle.vehicle_model : 'N/A'}}</b>
		        	</div>

	        		<div class="col-4 q-py-sm">
	        			First Name: <br><b>{{order.customer.first_name  ? order.customer.first_name : 'N/A'}}</b>
		        	</div>
		        	<div class="col-4 q-py-sm">
	        			Last Name: <br><b>{{order.customer.last_name  ? order.customer.last_name : 'N/A'}}</b>
		        	</div>

		        	<div class="col-4 q-py-sm">
	        			Middle Name: <br><b>{{order.customer.middleName  ? order.customer.middleName : 'N/A'}}</b>
		        	</div>

		        	<div class="col-4 q-py-sm">
	        			Phone: <br><b>{{order.customer.phone ? order.customer.phone : 'N/A'}}</b>
		        	</div>
		        	<div class="col-4 q-py-sm">
	        			Username: <br><b>{{order.customer.username ? 'admin' : 'user-account'}}</b>
		        	</div>
		        	<div class="col-4 q-py-sm">
	        			Email: <br><b>{{order.customer.email ? order.customer.email : 'N/A'}}</b>
		        	</div>
		        	
		        	<div class="col-4 q-py-sm">
	        			Free Next Wash : <br><b>{{order.customerNextWashIsFree ? order.customerNextWashIsFree : 'No'}}</b>
		        	</div>

		        	<div class="col-4 q-py-sm">
	        			Washes: <br><b>{{order.customerWashes ? order.customerWashes : 'N/A'}}</b>
		        	</div>
	        	</div>
        	</template>
	        	
        	<template v-if="order">
        		<div class="text-h5 q-py-xl">Process Payment Method</div>
        		
	        	<div class="row">
	        		<div class="col-3 q-py-sm">
	        			Transfer
		        	</div>
		        	<div class="col-3 q-py-sm">
	        			Cash
		        	</div>

		        	<div class="col-3 q-py-sm">
		        		Pos
		        	</div>

		        	<div class="col-3 q-py-sm">
		        		<q-btn color="red" unelevated label="Not Paid" />
		        	</div>
	        	</div>

        		<div class="text-h5 q-py-xl">Process Action</div>

	        	<div class="row">
	        		<div class="col-3 q-py-sm">
	        			Complete Wash
		        	</div>
		        	<div class="col-3 q-py-sm">
	        			Ongoing Wash
		        	</div>

		        	<div class="col-3 q-py-sm">
		        		Cancel Wash
		        	</div>

		        	<div class="col-3 q-py-sm">
		        		<q-btn color="red" unelevated label="Delete Wash" @click="deleteOrderId(order.id)"/>
		        	</div>
	        	</div>
        	</template>

	    </div>
	</div>	
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
	props :[
		'orderId'
	],
	components: {
    },
	data () {
		return {

		}
	},
	computed: {
        ...mapGetters({
            order: 'webAdminOrders/orderDetails',
            authenticated: 'auth/user',
        }),
    },

	methods:{
		...mapActions({
			gatewayResponse: 'orders/paymentProcess',
			payNowAtLocation: 'orders/payAtLocation',
			deleteOrder: 'webAdminOrders/deleteOrder',
			getOrderId: 'webAdminOrders/getOrderId',
		}),

		payAtLocation(orderId)
		{
			this.payNowAtLocation(orderId).then((response) => {
	        	var redirect = "/user/order/payment/"+this.$route.params.orderId + "/transaction"
	      		this.$router.push({ path: redirect })	
            }).catch((error) => {
                
            })  
		},

		deleteOrderId(orderId)
		{
			this.deleteOrder(orderId).then((response) => {
	        	return this.$router.push({ path: `/web/admin/history` })
            })  
		},

		callback: function(response){ 
	        console.log(response.data)
	        
	        var content = {
	        	responseDetails : response
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

        mounted(){
        	this.getOrderId(this.$route.params.orderId)
        }
	},
}
</script>