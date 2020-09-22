<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label="Vehicles"/>
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
	        <div class="q-gutter-y-md">
	            <Vehicles />
	        </div>
	    </div>
  	</q-page>
</template>


<script>

import Vehicles from 'components/Share/Vehicles.vue'

export default {
	components: {
		Vehicles
	}
}
</script>