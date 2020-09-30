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
				{{user}}
			</div>
		</div>

	</q-page>
</template>


<script>  
    import { mapActions, mapGetters } from 'vuex' 

    export default {
    	computed: {
            ...mapGetters({
                message: 'message',
                errorMessage: 'errorMessage',
                newPhoneNumber: 'auth/phone',
                user: 'auth/user',
            })
        }     
    }
</script>