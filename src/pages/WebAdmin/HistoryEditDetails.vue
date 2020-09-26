<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label="Edit Number" />
		        <q-breadcrumbs-el :label="orderDetails.receipt_number" v-if="orderDetails"/>
	      	</q-breadcrumbs>
	    </div>


	    <OrderEditDetails />

  	</q-page>
</template>


<script>

import { mapActions, mapGetters } from 'vuex'
import OrderEditDetails from 'components/WebAdmin/Order/OrderEditDetails.vue'

export default {
	props :[
		'orderId'
	],
	components: {
		OrderEditDetails
	},
	data () {
		return {
			
		}
	},
	computed: {
        ...mapGetters({
            orderDetails: 'webAdminOrders/orderDetails',
        })
    },

	methods:{
		...mapActions({
            getOrderId: 'webAdminOrders/getOrderId',
		}),

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