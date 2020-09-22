<template>
	<q-card class="q-pt-md fixed-center bg">  
        <q-card-actions align="center">
            <img src="~assets/parkit_icon_logo.png" align="center" alt="Parkit Home service" width="300">
        </q-card-actions> 

        <q-card-section  class="row" align="center">  
        	<div class="col-sm-12">
        		<p>Transaction ID : 
                    <b>
                        {{order.receipt_number}}
                    </b>
                </p>
        		<p>Transaction Status : <b>{{order.status}}</b></p>
                <p>Payment Status : <b>{{order.payment_status}}</b></p>
        		<p>Payment Method  : <b>{{order.payment_method}}</b></p>
        		<p>Payment Amount  : <b>₦{{order.total}}.00</b></p>
        	
        	</div> 
        </q-card-section>
        <q-separator />
        <q-card-actions align="center" v-if="timeout == null">
            <q-btn to="/" label="Back to Home" color="primary" v-close-popup />
            <q-btn v-if="authenticated != null" to="/user/dashboard" label="Back to Dashboard" color="primary"/>
        </q-card-actions>
    </q-card>
</template>

<script>
    
    import { mapActions, mapGetters } from 'vuex'

    export default{
    	props :[
			'orderId'
		],
        data(){
            return{
                  
            }
        },

        computed: {
            ...mapGetters({
                details: 'orders/paymentDetails',
                timeout: 'orders/paymentTimeout',
            	authenticated: 'auth/user',
            	order: 'orders/orderDetails',
            }),
        },
            
        methods:{
        	...mapActions({
				timer: 'orders/startPaymentTimeout',
				getOrderId: 'orders/getOrderId',
			})

        },

        mounted(){
        	this.timer()
        	this.getOrderId(this.$route.params.orderId)
        }
    }
</script>
	