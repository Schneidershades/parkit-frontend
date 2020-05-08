<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label="Orders"/>
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
	        <div class="q-gutter-y-md">
	            <Orders />
	        </div>
	    </div>
	    <!-- <div class="q-pa-md" v-else>No order item found</div> -->
		<!-- <div class="q-pa-sm text-center" v-else ><h6>No item in your cart</h6></div> -->
  	</q-page>
</template>


<script>

import { mapActions, mapGetters } from 'vuex'
import Orders from 'components/Admin/Orders/Orders.vue'

export default {
	components: {
		Orders
	},
	data () {
		return {
			
		}
	}
}
</script>