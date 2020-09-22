<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label="Send Order"/>
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
	        <div class="q-gutter-y-md">
	            <Report />
	        </div>
	    </div>
  	</q-page>
</template>


<script>

import { mapActions, mapGetters } from 'vuex'
import Report from 'components/Share/Report.vue'

export default {
	components: {
		Report
	}
}
</script>