<template>
	<q-layout view="hHh lpR lfr">
		<q-page-container>
			<q-page class="login-register" style="background-image:url(statics/exp.jpg);">
				<router-view />
			</q-page>
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
	    /*position: fixed; */
	}
</style>

