<template>
	<div class="q-pa-sm"  v-if="packages">

		<q-btn type="submit" unelevated color="primary" class="q-my-md" size="md" label="Create Package Type" @click="createModel = true" />
		
        <q-table
		    title="Packages"
		    :columns="columns"
		    row-key="name"
		    :data="packages"
		    :grid="$q.screen.xs"
		    :pagination.sync="pagination"
	      	:filter="filterModel"
		    >
	    	<template v-slot:top-right>
		        <q-input borderless dense debounce="300" v-model="filterModel" placeholder="Search">
		          <template v-slot:append>
		            <q-icon name="search" v-model="filterModel"/>
		          </template> 
		        </q-input>
	      	</template>

		    <template slot="body" slot-scope="props">
		      	<q-tr :props="props">
		      		<q-td key="action" :props="props">
		      			ncie
		      		</q-td>
		      		<q-td key="type" :props="props">{{props.row.type}}</q-td>
		      		<q-td key="short_name" :props="props">{{ props.row.short_name }}</q-td>
		      		<q-td key="venue" :props="props">{{ props.row.venue }}</q-td>
		      		<q-td key="services" :props="props">{{ props.row.package_services.length }}</q-td>
		      	</q-tr>
		    </template>
	    </q-table> 

	    <q-dialog v-model="createModel">
          	<q-card>
	            <q-card-section>
	              <div class="text-h6">Create a Package type</div>
	            </q-card-section>

	            <q-separator />

	            <q-card-section style="max-height: 500vh">
	              	<q-form
		                @submit.prevent="saveRole"
		                ref="form"
		                >
		                <div class="row">
		                  	<div class="col-12 q-pa-sm">
			                    <q-input
			                    filled
			                    v-model="form.type"
			                    label="Package Type *"
			                    lazy-rules
			                    :rules="[ val => val && val.length > 0 || 'Please type a package type']"
			                    />
			                </div>

			                <div class="col-12 q-pa-sm">
			                    <q-input
			                    filled
			                    v-model="form.short_name"
			                    label="Package Short Name *"
			                    lazy-rules
			                    :rules="[ val => val && val.length > 0 || 'Please type a package alias']"
			                    />
			                </div>

			                <div class="col-12 q-pa-sm">
			                    <q-input
			                    filled
			                    v-model="form.description"
			                    label="Package Description *"
			                    lazy-rules
			                    :rules="[ val => val && val.length > 0 || 'Please type a package description']"
			                    />
			                </div>

			                <div class="col-12 q-pa-sm">
			                    <q-select 
					                filled 
					                v-model="form.service_venue" 
					                :options="venueLists" 
					                label="Select service operation venue *"
					                lazy-rules
					            />
			                </div>
				               
		                </div>

		                <q-btn
		                  	type="submit"
		                  	label="Create package type"
		                  	class="q-mt-md"
		                  	color="primary"
		                  	>
		                </q-btn>
	              	</q-form>
	            </q-card-section>

	            <q-separator />

	            <q-card-actions align="right">
	              <q-btn flat label="Close" color="primary" v-close-popup />
	            </q-card-actions>
          	</q-card>
        </q-dialog>
	</div>	
</template>


<script>

import { mapActions, mapGetters } from 'vuex'

export default {
	data () {
		return {
			form:{
		        type: '',
                short_name: '',
                description: '',
                service_venue: '',
		    },

		    venueLists : [
		    	'parkit-location',
		    	'home-office'
		    ],

      		createModel: null,

		    filterModel: '',

			separator: 'cell',

			pagination: {
		        rowsPerPage: 30,
		        page: 1
		    },
		    text: '',
		    columns: [
		       	{
		          	name: 'type',
		          	align: 'left',
		          	label: 'Type',
		          	field: 'type',
		          	sortable: true
		       	},
		       	{
		          	name: 'short_name',
		          	align: 'left',
		          	label: 'Short Name',
		          	field: 'short_name',
		          	sortable: true
		       	},
		       	{
		          	name: 'venue',
		          	align: 'left',
		          	label: 'Venue',
		          	field: 'venue',
		          	sortable: true
		       	},
		       	{
		          	name: 'services',
		          	align: 'left',
		          	label: 'Package Services(s)',
		          	field: 'services',
		          	sortable: true
		       	},
		       	{
		          	name: 'action',
		          	align: 'left',
		          	label: 'Actions(s)',
		          	field: 'action',
		          	sortable: true
		       	},
		    ],	
		}
	},
	computed: {
        ...mapGetters({
            packages: 'packages/packages',
        }),
    },

	methods:{
		...mapActions({
			getPackages: 'packages/getPackages',
		})		
	},
	mounted (){
		this.getPackages()
	},
}
</script>