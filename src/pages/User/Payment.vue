<template>
	<q-page padding>
      <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="Cart" />
      </q-breadcrumbs>
    </div>

    <div class="q-pa-md">
        <div class="q-gutter-y-md">
          {{details}} <br>
          {{paymentTimeout}}
        </div>
    </div>
    
  </q-page>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		computed: {
	        ...mapGetters({
	            details: 'orders/paymentDetails',
	            paymentTimeout: 'orders/paymentTimeout',
	        })
	    },

		methods:{
			...mapActions({
				getOrderId: 'orders/getOrderId',
			}),
		},

	    mounted(){
	    	if(paymentTimeout == null){
	    		this.$router.push({name: 'userOrderPayment'}) 
	    	}
	    }
	}
</script>