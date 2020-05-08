<template>
	<q-page padding>
		<div class="q-pa-md q-gutter-sm">
			<q-breadcrumbs>
				<q-breadcrumbs-el label="Home" />
				<q-breadcrumbs-el label="Dashboard" />
			</q-breadcrumbs>
		</div>

		<div class="q-pa-md">
			<div class="q-gutter-y-md">
				<div class="row">
					<div class="col-8">
  						<apexchart type="line" :options="options" :series="series"></apexchart>
					</div>
					<div class="col-4">j</div>
				</div>
			</div>
		</div>

	</q-page>
</template>


<script>    
	import VueApexCharts from 'vue-apexcharts'
	import { mapActions, mapGetters } from 'vuex'

    export default {
    	data(){
            return{
            	options: {
            		chart: {
            			id: 'Todays Transactions'
            		},
            		xaxis: {
            			categories: []
            		}
            	},
            	series: [{
            		name: 'Amount',
            		data: []
            	}] 
            }
        },
        components:{
	        'apexchart' : VueApexCharts,
	    },

	    computed: {
		    ...mapGetters({
		        user: 'auth/user',
		        locations: 'location/locations',
		    })
	  	},

	  	mounted(){
	  		this.options.xaxis.categories = this.user.location.chart.transactions
	  		this.series[0].data = this.user.location.chart.dates
	  	}
    }
</script>