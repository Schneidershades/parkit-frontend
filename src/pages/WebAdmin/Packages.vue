<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label="Packages"/>
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
	        <div class="q-gutter-y-md">
	            <Packages />
	        </div>
	    </div>
  	</q-page>
</template>


<script>

import Packages from 'components/Share/Packages.vue'

export default {
	components: {
		Packages
	}
}
</script>