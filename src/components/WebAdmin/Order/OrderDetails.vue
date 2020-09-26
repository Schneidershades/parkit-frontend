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
                		<!-- <q-btn label="Pay at location" @click="payAtLocation(order.id)" color="primary"></q-btn> -->
                		<!-- <br>
                		<i>if you select pay at location discounts would not be applied</i> -->
                	</td>
                </tr>   
            </tbody>

        </table>

        <!-- { "id": 1068, "status": "pending", "receipt_number": "WEB-FREE0000000001067", "vehicle": null, "packages": 1, "home_service_booking_time": null, "home_service_booking_date": null, "address": null, "sub_total": 1500, "total": 0, "action": "online-free-wash", "customer": { "id": 67581, "first_name": "Gbolahan", "last_name": "Alli", "username": null, "phone": "2348162514280", "sex": null, "email": "gbollyally@gmail.com", "dob": null, "method": null, "email_verified_at": null, "phone_verified_at": null, "fb_id": null, "user_operator_id": null, "location_id": null, "platform_registered": null, "sms_notification": 1, "email_notification": 1, "free_wash_status": 1, "deleted_at": null, "created_at": "2020-07-18 17:07:22", "updated_at": "2020-07-18 17:07:22", "orders": [ { "id": 1068, "receipt_number": "WEB-FREE0000000001067", "customer_id": 67581, "customer_plate_number_id": null, "user_operator_id": 67581, "cashier_id": null, "location_id": null, "address_id": null, "coupon_id": null, "vat_id": null, "discount_id": null, "user_subscription_id": null, "is_free_wash": 1, "subtotal": 1500, "total": 0, "discounted_amount": 1500, "free_discount": 1, "action": "online-free-wash", "amount_paid": null, "currency_id": null, "payment_method": null, "payment_gateway": null, "payment_gateway_charged_percentage": null, "payment_gateway_expected_charged_percentage": null, "payment_reference": null, "payment_gateway_charge": 0, "payment_gateway_remittance": 0, "payment_code": null, "payment_message": null, "payment_status": "pending", "platform_initiated": null, "transaction_initiated_date": null, "transaction_initiated_time": null, "date_time_paid": null, "date_cancelled": null, "reason": null, "home_service_booking_date": null, "home_service_booking_time": null, "served_location_id": null, "service_status": "pending", "status": "pending", "deleted_at": null, "created_at": "2020-07-18 17:07:22", "updated_at": "2020-07-18 17:07:22" } ] }, "location": null, "locationId": null, "cashier": null, "cashierId": null, "payment_status": "pending", "free": 1, "customerNextWashIsFree": null, "customerWashes": 1, "payment_method": 67581, "discount": 1500, "discountDetails": null, "discountCoupon": null, "products": [ { "id": 1, "vehicle": "SUV & SPACE BUS", "package": "BASIC PACKAGE (Basic wash)", "venue": "parkit-location", "amount": "1500.00", "quantity": 1, "total": 1500 } ], "transaction_initiated": null, "date": "2020-07-18", "time": "17:07:22", "created_at": "2020-07-18" } -->


        <div class="q-py-md">
        	<template v-if="order">
        		<div class="text-h5 q-py-xl">More Information</div>
	        	<div class="row">
	        		<div class="col-4 q-py-sm">
	        			Status : <br><b>{{order.status}}</b>
		        	</div>
		        	<div class="col-4 q-py-sm">
	        			Type : <br><b>{{order.home_service_booking_date ? 'Home Service' : 'Location Service'}}</b>
		        	</div>

		        	<div class="col-4 q-py-sm">
	        			Free : <br><b>{{order.is_free_wash ? 'Yes' : 'No'}}</b>
		        	</div>

		        	<div class="col-4 q-py-sm">
	        			Paid : <br><b>{{order.amount_paid ? order.amount_paid : 'Not Paid'}}</b>
		        	</div>
		        	<div class="col-4 q-py-sm">
		        		Paid : <br><b>{{order.payment_method ? order.payment_method : 'Not Paid'}}</b>
		        	</div>
	        	</div>
        	</template>
	        	
        	<template v-if="order.customer">
        		<div class="text-h5 q-py-xl">Customer Information</div>
	        	<div class="row">
	        		<div class="col-4 q-py-sm">
	        			First Name: <br><b>{{order.customer.firstName  ? order.customer.firstName : 'N/A'}}</b>
		        	</div>
		        	<div class="col-4 q-py-sm">
	        			Last Name: <br><b>{{order.customer.lastName  ? order.customer.lastName : 'N/A'}}</b>
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
			raveKey: process.env.FLUTTERWAVE_PUBLIC_KEY,
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
            authenticated: 'auth/user',
        }),

        reference(){
	        let text = "";
	        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	 
	        for( let i=0; i < 10; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	 
	        return text;
	    }
    },

	methods:{
		...mapActions({
			gatewayResponse: 'orders/paymentProcess',
			payNowAtLocation: 'orders/payAtLocation',
			deleteOrder: 'webAdminOrders/deleteOrder',
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
        	
        }
	},
}
</script>