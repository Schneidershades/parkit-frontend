<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label="Employees"/>
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
	        <div class="q-gutter-y-md">
	            <LocationEmployee />
	        </div>
	    </div>
  	</q-page>
</template>


<script>

import LocationEmployee from 'components/WebAdmin/Employees/LocationEmployee.vue'

export default {
	components: {
		LocationEmployee
	}
}
</script>