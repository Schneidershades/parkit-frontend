<template>
	<q-card style="width: 400px; max-width: 80vw; margin: auto; margin-top:50px" class="q-pt-md">  
        <q-card-actions align="center">
            <img src="statics/parkit_icon_logo.png" align="center" alt="Parkit Home service" width="300">
        </q-card-actions> 

        <q-card-section  class="row" align="center">  
        	<div class="col-sm-12">
        		<p>Transaction ID : 
                    <b>
                        <template v-if="order.location != null && order.address != null">
                            <p class="text-left">HS/{{order.location.name}}000000000{{order.id}}</p>
                        </template>
                        <template v-if="order.location == null && order.address != null">
                            <p class="text-left">HS000000000{{order.id}}</p>
                        </template>
                        <template v-if="order.location != null && order.address == null">
                            <p class="text-left">{{order.location.name}}000000000{{order.id}}</p>
                        </template>
                    </b>
                </p>
        		<p>Transaction Status : <b>{{order.status}}</b></p>
        		<p>Payment Method  : <b>{{order.action}}</b></p>
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
	