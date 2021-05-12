<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label="Order Number" />
		        <q-breadcrumbs-el :label="order.receipt_number" v-if="order.id"/>
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md" v-if="order.id">
	        <div class="q-gutter-y-md">
	            <OrderDetails :order="order" />
	        </div>
	    </div>
	    <div class="q-pa-md" v-else>No order item found</div>
  	</q-page>
</template>


<script>

import { mapActions, mapGetters } from 'vuex'
import OrderDetails from 'components/WebAdmin/Order/OrderDetails.vue'

export default {
	props :[
		'orderId'
	],
	components: {
		OrderDetails
	},
	computed: {
        ...mapGetters({
            order: 'webAdminOrders/orderDetails',
        })
    },

	methods:{
		...mapActions({
            getOrderId: 'webAdminOrders/getOrderId',
		}),
		placeOrder(){
			this.placeUserOrder([{
				customer_id: this.authenticatedUser.id,
				address_id: this.address_id,
				location_id: this.location_id,
				coupon_id: this.coupon_id,
				discount_id: this.discount_id,
			}]).then((response) => {
				this.$router.push({name: 'userOrderShow'})      		
            }).catch((error) => {
                console.log(error)
                if(this.errorMessage){
                    this.negativeNotification('cannot process order at the moment')
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
	},

    mounted(){
    	this.getOrderId(this.$route.params.orderId)
    },
}
</script>