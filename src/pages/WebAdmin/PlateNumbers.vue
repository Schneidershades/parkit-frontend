<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label="PlateNumbers"/>
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
	        <div class="q-gutter-y-md">
	            <PlateNumbers />
	        </div>
	    </div>
  	</q-page>
</template>


<script>

import PlateNumbers from 'components/Share/PlateNumbers.vue'

export default {
	components: {
		PlateNumbers
	}
}
</script>