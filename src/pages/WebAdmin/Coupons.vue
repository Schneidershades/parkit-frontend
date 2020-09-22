<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label="Coupons"/>
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
	        <div class="q-gutter-y-md">
	            <Coupons />
	        </div>
	    </div>
  	</q-page>
</template>


<script>

import Coupons from 'components/Share/Coupons.vue'

export default {
	components: {
		Coupons
	}
}
</script>