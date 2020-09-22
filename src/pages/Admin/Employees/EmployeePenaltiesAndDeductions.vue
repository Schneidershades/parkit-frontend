<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label="Employee Penalties And Deductions"/>
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
	        <div class="q-gutter-y-md">
	            <EmployeePenaltiesAndDeductions />
	        </div>
	    </div>
  	</q-page>
</template>


<script>

import EmployeePenaltiesAndDeductions from 'components/Desktop/Employees/EmployeePenaltiesAndDeductions.vue'

export default {
	components: {
		EmployeePenaltiesAndDeductions
	}
}
</script>