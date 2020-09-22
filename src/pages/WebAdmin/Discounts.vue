<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label="Discounts"/>
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
	        <div class="q-gutter-y-md">
	            <Discounts />
	        </div>
	    </div>
  	</q-page>
</template>


<script>

import Discounts from 'components/Share/Discounts.vue'

export default {
	components: {
		Discounts
	}
}
</script>