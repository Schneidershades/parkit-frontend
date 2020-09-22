<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label=" View Employee"/>
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
	        <div class="q-gutter-y-md">
	            <ViewEmployee />
	        </div>
	    </div>
  	</q-page>
</template>


<script>

import ViewEmployee from 'components/WebAdmin/Employees/ViewEmployee.vue'

export default {
	components: {
		ViewEmployee
	}
}
</script>