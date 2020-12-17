<template>
	<q-page padding>
		<div class="q-pa-md q-gutter-sm">
			<q-breadcrumbs>
				<q-breadcrumbs-el label="Home" />
				<q-breadcrumbs-el label="Dashboard" />
			</q-breadcrumbs>
		</div>

	    <div class="container">
		  	<div class="row">
		      	<div class="col-12 col-md-6">
		      		
		      	</div>
		      	<div class="col-12 col-md-6">
				    <q-card
				      class="q-my-md my-card text-white"
				      style="background: radial-gradient(circle, #98a2ff 0%, #614a88 100%)"
				    	>	
				      	<q-card-section class="row">

				      		<div class="col-12">
					        	<div class="text-h5 q-mb-md">Recent Transactions</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">Recent</div>
					      		<div class="text-h6">₦ {{todaysOrderTransaction ? todaysOrderTransaction : '0'}}.00</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">CARS</div>
					      		<div class="text-h6">{{carTransactionToday ? carTransactionToday : '0'}}</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">POS</div>
					      		<div class="text-h6">₦ {{posTransactionToday ? posTransactionToday : '0'}}.00</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">CASH</div>
					      		<div class="text-h6">₦ {{cashTransactionToday ? cashTransactionToday : '0'}}.00</div>
					      	</div>

					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">NOT PAID</div>
					      		<div class="text-h6">₦ {{notPaidTransactionToday ? notPaidTransactionToday : '0'}}.00</div>
					      	</div>
					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">PENDING</div>
					      		<div class="text-h6">₦ {{pendingTransactionToday ? pendingTransactionToday : '0'}}.00</div>
					      	</div>
					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">EDIT</div>
					      		<div class="text-h6">₦ {{editTransactionToday ? editTransactionToday : '0'}}.00</div>
					      	</div>
					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">DELETE</div>
					      		<div class="text-h6">₦ {{deleteTransactionToday ? deleteTransactionToday : '0'}}.00</div>
					      	</div>
					      	<!-- <div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">BALANCED</div>
					      		<div class="text-h6">no</div>
					      	</div> -->
				      	</q-card-section>

				        <!-- <div class="text-h5">₦ {{user.location.weeklyAmount}}.00</div> -->
				    </q-card>
				    <q-card
				      	class="q-my-md my-card text-white"
				      	style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
				    	>

				      	<q-card-section class="row">

				      		<div class="col-12">
					        	<div class="text-h5 q-mb-md">Today's Transactions</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">Today</div>
					      		<div class="text-h6">₦ {{dashboard.orders.today.transaction}}.00</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">CARS</div>
					      		<div class="text-h6">{{dashboard.orders.today.cars}}</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">POS</div>
					      		<div class="text-h6">₦ {{dashboard.orders.today.pos}}.00</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">CASH</div>
					      		<div class="text-h6">₦ {{dashboard.orders.today.cash}}.00</div>
					      	</div>

					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">NOT PAID</div>
					      		<div class="text-h6">₦ {{dashboard.orders.today.not_paid}}.00</div>
					      	</div>
					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">PENDING</div>
					      		<div class="text-h6">₦ {{dashboard.orders.today.pending}}.00</div>
					      	</div>
					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">EDIT</div>
					      		<div class="text-h6">₦ {{dashboard.orders.today.edit}}.00</div>
					      	</div>
					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">DELETE</div>
					      		<div class="text-h6">₦ {{dashboard.orders.today.delete}}.00</div>
					      	</div>
					      	<!-- <div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">BALANCED</div>
					        	{{dashboard.orders.today.transaction}}
					        	{{todaysOrderTransaction}}
					      		<div class="text-h6" 
					      			v-if="dashboard.orders.today.transaction == todaysOrderTransaction ? todaysOrderTransaction :0">yes</div>
					      		<div class="text-h6" v-else>no</div>
					      	</div> -->

				      	</q-card-section>
				    </q-card>
		    		<q-card
				      class="q-my-md my-card text-white"
				      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
				    	>

				      	<q-card-section class="row">

				      		<div class="col-12">
					        	<div class="text-h5 q-mb-md">Yesterday Transactions</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">Today</div>
					      		<div class="text-h6">₦ {{dashboard.orders.yesterday.transaction}}.00</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">CARS</div>
					      		<div class="text-h6">{{dashboard.orders.yesterday.cars}}</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">POS</div>
					      		<div class="text-h6">₦ {{dashboard.orders.yesterday.pos}}.00</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">CASH</div>
					      		<div class="text-h6">₦ {{dashboard.orders.yesterday.cash}}.00</div>
					      	</div>

					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">NOT PAID</div>
					      		<div class="text-h6">₦ {{dashboard.orders.yesterday.not_paid}}.00</div>
					      	</div>
					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">PENDING</div>
					      		<div class="text-h6">₦ {{dashboard.orders.yesterday.pending}}.00</div>
					      	</div>
					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">EDIT</div>
					      		<div class="text-h6">₦ {{dashboard.orders.yesterday.edit}}.00</div>
					      	</div>
					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">DELETE</div>
					      		<div class="text-h6">₦ {{dashboard.orders.yesterday.delete}}.00</div>
					      	</div>
					      	<!-- <div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">BALANCED</div>
					        	{{dashboard.orders.today.transaction}}
					        	{{todaysOrderTransaction}}
					      		<div class="text-h6" 
					      			v-if="dashboard.orders.today.transaction == todaysOrderTransaction ? todaysOrderTransaction :0">yes</div>
					      		<div class="text-h6" v-else>no</div>
					      	</div> -->

				      	</q-card-section>
				    </q-card>
				    <q-card
				      	class=" q-my-md my-card text-white"
				      	style="background: radial-gradient(circle, #98a2ff 0%, #614a88 100%)"
				    	>

				      	<q-card-section class="row">

				      		<div class="col-12">
					        	<div class="text-h5 q-mb-md">Week Transactions</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">Today</div>
					      		<div class="text-h6">₦ {{dashboard.orders.week.transaction}}.00</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">CARS</div>
					      		<div class="text-h6">{{dashboard.orders.week.cars}}</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">POS</div>
					      		<div class="text-h6">₦ {{dashboard.orders.week.pos}}.00</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">CASH</div>
					      		<div class="text-h6">₦ {{dashboard.orders.week.cash}}.00</div>
					      	</div>

					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">NOT PAID</div>
					      		<div class="text-h6">₦ {{dashboard.orders.week.not_paid}}.00</div>
					      	</div>
					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">PENDING</div>
					      		<div class="text-h6">₦ {{dashboard.orders.week.pending}}.00</div>
					      	</div>
					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">EDIT</div>
					      		<div class="text-h6">₦ {{dashboard.orders.week.edit}}.00</div>
					      	</div>
					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">DELETE</div>
					      		<div class="text-h6">₦ {{dashboard.orders.week.delete}}.00</div>
					      	</div>
					      	<!-- <div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">BALANCED</div>
					        	{{dashboard.orders.today.transaction}}
					        	{{todaysOrderTransaction}}
					      		<div class="text-h6" 
					      			v-if="dashboard.orders.today.transaction == todaysOrderTransaction ? todaysOrderTransaction :0">yes</div>
					      		<div class="text-h6" v-else>no</div>
					      	</div> -->

				      	</q-card-section>
				    </q-card>
				    <q-card
				      class="q-my-md my-card text-white"
				      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
				    	>

				      	<q-card-section class="row">

				      		<div class="col-12">
					        	<div class="text-h5 q-mb-md">This Month</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">Today</div>
					      		<div class="text-h6">₦ {{dashboard.orders.month.transaction}}.00</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">CARS</div>
					      		<div class="text-h6">{{dashboard.orders.month.cars}}</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">POS</div>
					      		<div class="text-h6">₦ {{dashboard.orders.month.pos}}.00</div>
					      	</div>

					      	<div class="col-3">
					        	<div class="text-subtitle2">CASH</div>
					      		<div class="text-h6">₦ {{dashboard.orders.month.cash}}.00</div>
					      	</div>

					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">NOT PAID</div>
					      		<div class="text-h6">₦ {{dashboard.orders.month.not_paid}}.00</div>
					      	</div>
					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">PENDING</div>
					      		<div class="text-h6">₦ {{dashboard.orders.month.pending}}.00</div>
					      	</div>
					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">EDIT</div>
					      		<div class="text-h6">₦ {{dashboard.orders.month.edit}}.00</div>
					      	</div>
					      	<div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">DELETE</div>
					      		<div class="text-h6">₦ {{dashboard.orders.month.delete}}.00</div>
					      	</div>
					      	<!-- <div class="col-3 q-pt-md">
					        	<div class="text-subtitle2">BALANCED</div>
					        	{{dashboard.orders.today.transaction}}
					        	{{todaysOrderTransaction}}
					      		<div class="text-h6" 
					      			v-if="dashboard.orders.today.transaction == todaysOrderTransaction ? todaysOrderTransaction :0">yes</div>
					      		<div class="text-h6" v-else>no</div>
					      	</div> -->

				      	</q-card-section>
				    </q-card>
		      	</div>
		    </div>
		</div>
	</q-page>
</template>

<style scoped>
	
</style>

<script>    
	import { mapActions, mapGetters } from 'vuex'

    export default {
    	
	    computed: {
		    ...mapGetters({
		        user: 'auth/user',
		        dashboard: 'dashboard/dashboard',
              	
	          	todaysOrderTransaction: 'adminOrders/totalTransactionToday',
	          	posTransactionToday: 'adminOrders/posTransactionToday',
	          	completeTransactionToday: 'adminOrders/completeTransactionToday',
	          	editTransactionToday: 'adminOrders/editTransactionToday',
	          	deleteTransactionToday: 'adminOrders/deleteTransactionToday',
	          	cashTransactionToday: 'adminOrders/cashTransactionToday',
	          	notPaidTransactionToday: 'adminOrders/notPaidTransactionToday',
	          	carTransactionToday: 'adminOrders/carTransactionToday',
	          	pendingTransactionToday: 'adminOrders/pendingTransactionToday',
          		location: 'accountLocation/accountLocationDetails',
		    })
	  	},

	  	methods:{
            ...mapActions({
              	getLocationDashboard: 'dashboard/getLocationDashboard',
            }),
	  	},

	  	mounted(){
	  		if(this.location == null){
				return window.history.length > 2
			}

		  	this.getLocationDashboard(this.location.id)
	  	}
    }
</script>