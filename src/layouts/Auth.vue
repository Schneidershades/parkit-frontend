<template>
	<q-layout view="hHh lpR lfr">
		<!-- {{orders}} -->
		<q-page-container>
			<q-img class="login-register" src="~/assets/exp.jpg">
				<router-view />
			</q-img>
		</q-page-container>
	</q-layout>
</template>

<style scoped>	
	.login-register {
	    background-size: cover;
	    background-repeat: no-repeat;
	    background-position: center center;
	    height: 100%;
	    width: 100%;
	    padding: 10%;
	    position: fixed; 
	}
</style>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
	computed: {
        ...mapGetters({
            orders: 'adminOrders/orders',
        }),
    },
}

</script>

