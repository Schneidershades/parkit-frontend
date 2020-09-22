<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label="PriceSettings"/>
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
	        <div class="q-gutter-y-md">
	            <PriceSettings />
	        </div>
	    </div>
  	</q-page>
</template>


<script>

import PriceSettings from 'components/Share/PriceSettings.vue'

export default {
	components: {
		PriceSettings
	}
}
</script>