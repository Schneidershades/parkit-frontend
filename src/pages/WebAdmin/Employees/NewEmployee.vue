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
	            <NewEmployee />
	        </div>
	    </div>
  	</q-page>
</template>


<script>

import NewEmployee from 'components/WebAdmin/Employees/NewEmployee.vue'

export default {
	components: {
		NewEmployee
	}
}
</script>