<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label="Employee Loans And Outstandings"/>
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
	        <div class="q-gutter-y-md">
	            <EmployeeLoansAndOutstandings />
	        </div>
	    </div>
  	</q-page>
</template>


<script>

import EmployeeLoansAndOutstandings from 'components/Desktop/Employees/EmployeeLoansAndOutstandings.vue'

export default {
	components: {
		EmployeeLoansAndOutstandings
	}
}
</script>