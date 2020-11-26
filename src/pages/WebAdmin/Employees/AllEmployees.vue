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
	            <AllEmployees />
	        </div>
	    </div>
  	</q-page>
</template>


<script>

import AllEmployees from 'components/WebAdmin/Employees/AllEmployees.vue'

export default {
	components: {
		AllEmployees
	}
}
</script>