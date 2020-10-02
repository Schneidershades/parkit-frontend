<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label="Employee Guarantors"/>
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
	        <div class="q-gutter-y-md">
	            <EmployeeGuarantors />
	        </div>
	    </div>
  	</q-page>
</template>


<script>

import EmployeeGuarantors from 'components/Desktop/Employees/EmployeeGuarantors.vue'

export default {
	components: {
		EmployeeGuarantors
	}
}
</script>