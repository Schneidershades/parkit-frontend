<template>
	<q-page padding>
		<div class="q-pa-md q-gutter-sm">
			<q-breadcrumbs>
				<q-breadcrumbs-el label="Home" />
				<q-breadcrumbs-el label="Dashboard" />
			</q-breadcrumbs>
		</div>

		<!-- {{user}} -->
		<div class="q-pa-md">
			<div class="q-gutter-y-md">
				<div class="row">

					<!-- <div class="col-8">
  						<apexchart type="line" :options="options" :series="series"></apexchart>
					</div>
					<div class="col-4">j</div> -->
				</div>
			</div>
		</div>

	</q-page>
</template>


<script>    
	import { mapActions, mapGetters } from 'vuex'

    export default {
    	
	    computed: {
		    ...mapGetters({
		        user: 'auth/user',
		        locations: 'location/locations',
		    })
	  	},

	  	method:{
            ...mapActions({
              	getLocationDashboard: 'dashboard/getLocationDashboard',
            }),
	  	}

	  	mounted(){

	  	}
    }
</script>