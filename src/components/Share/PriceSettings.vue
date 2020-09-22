<template>
	<div class="q-pa-sm"  v-if="rates">

		<q-btn type="submit" unelevated color="primary" class="q-my-md" size="md" label="Create Price" @click="createModel = true" />
		
        <q-table
		    title="Price Lists"
		    :columns="columns"
		    row-key="name"
		    :data="rates"
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
		      		<q-td key="vehicle_type" :props="props">{{props.row.vehicle}}</q-td>
		      		<q-td key="package_type" :props="props">{{props.row.package}}</q-td>
		      		<q-td key="amount" :props="props">{{props.row.amount}}</q-td>
		      		<q-td key="action" :props="props">
		      			action
		      		</q-td>
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
			                    <q-select 
					                filled 
					                v-model="form.vehicle_id" 
					                :options="vehicles" 
					                label="Select Vehicle type*"
					                lazy-rules
							        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
							        :option-label="opt => Object(opt) === opt && 'type' in opt ? opt.type : null"
							        :option-disable="opt => Object(opt) === opt ? opt.inactive === true : true"
							        emit-value
							        map-options
				                    :rules="[ val => val && val.length > 0 || 'Please select a vehicle']"
					            />
			                </div>

			                <div class="col-12 q-pa-sm">
			                    <q-select 
					                filled 
					                label="Select package type *"
					                lazy-rules
					                v-model="form.package_id" 
					                :options="packages" 
							        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
							        :option-label="opt => Object(opt) === opt && 'type' in opt ? opt.type : null"
							        :option-disable="opt => Object(opt) === opt ? opt.inactive === true : true"
							        emit-value
							        map-options
				                    :rules="[ val => val && val.length > 0 || 'Please select a package']"
					            />
			                </div>

			                <div class="col-12 q-pa-sm">
			                    <q-input
				                    filled
				                    v-model="form.amount"
				                    label="How much are we selling *"
				                    lazy-rules
				                    :rules="[ val => val && val.length > 0 || 'Please type in an amount']"
				                />
			                </div>
				               
		                </div>

		                <q-btn
		                  	type="submit"
		                  	label="Create Rate"
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
		        vehicle_id: '',
                package_id: '',
                amount: '',
		    },

      		createModel: null,

      		vehicleList: [],
      		packageList: [],

		    filterModel: '',

			separator: 'cell',

			pagination: {
		        rowsPerPage: 30,
		        page: 1
		    },

		    text: '',
		    columns: [
		       {
		          name: 'vehicle_type',
		          align: 'left',
		          label: 'Vehicle Type',
		          field: 'vehicle_type',
		          sortable: true
		       },
		       {
		          name: 'package_type',
		          align: 'left',
		          label: 'Package Type',
		          field: 'package_type',
		          sortable: true
		       },
		       {
		          name: 'amount',
		          align: 'left',
		          label: 'Price',
		          field: 'amount',
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
            vehicles: 'vehicles/vehicles',
            rates: 'vehiclePackageRates/rates',
        }),

        selectOptions () {
		    return this.packages
		}
    },

	methods:{
		...mapActions({
			getPackages: 'packages/getPackages',
			getVehicles: 'vehicles/getVehicles',
            getRates: 'vehiclePackageRates/getRates',
		})		
	},
	mounted (){
		var forPackageOption = this.getPackages()
		var forVehicleOption = this.getVehicles()
		this.getRates()
	},
}
</script>