<template>
	<q-page padding>
		<div class="q-pa-md q-gutter-sm">
			<q-breadcrumbs>
				<q-breadcrumbs-el label="Home" />
				<q-breadcrumbs-el label="Pending Bookings" />
			</q-breadcrumbs>
		</div>

		<div class="q-pa-md">
			<div class="q-gutter-y-md">
				<PendingOrders />
			</div>
		</div>

	</q-page>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import PendingOrders from 'components/WebAdmin/Order/PendingOrders.vue'

export default {
	props :[
		'orderId'
	],
	components: {
		PendingOrders
	}
}
</script>