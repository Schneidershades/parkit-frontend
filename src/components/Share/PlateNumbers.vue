<template>
	<div class="q-pa-sm"  v-if="plate_numbers">
		<q-btn type="submit" unelevated color="primary" class="q-my-md" size="md" label="Create Package Type" @click="createModel = true" />
		
        <q-table
		    title="Customer Vehicle Plate Numbers"
		    :columns="columns"
		    row-key="name"
		    :data="plate_numbers"
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
		      		<q-td key="name" :props="props">{{ props.row.first_name ? props.row.first_name : 'N/A' }} {{ props.row.last_name }}</q-td>
		      		<q-td key="plate_number" :props="props">{{props.row.plate_number ?  props.row.plate_number : 'N/A'}}</q-td>
		      		<q-td key="type" :props="props">{{ props.row.vehicle_type ?  props.row.vehicle_type : 'N/A'}}</q-td>
		      		<!-- <q-td key="model" :props="props">{{ props.row.vehicle_model  ?  props.row.vehicle_model : 'N/A'}}</q-td> -->
		      		<q-td key="phone" :props="props">{{ props.row.phone  ?  props.row.phone : 'N/A'}}</q-td>
		      		<!-- <q-td key="email" :props="props">{{ props.row.email  ?  props.row.email : 'N/A'}}</q-td> -->
		      		<!-- <q-td key="number_of_washes" :props="props">{{ props.row.vehicleWashes}}</q-td> -->
		      		<!-- <q-td key="next_wash_free" :props="props">{{ props.row.vehicleFreeWash}}</q-td> -->
		      		<q-td key="action" :props="props">
		      			<q-btn color="purple" class="q-mr-sm" unelevated icon="preview" @click="viewModel(props.row.id)"/>
		      			<q-btn color="orange" class="q-mr-sm" unelevated icon="edit" @click="editModel(props.row.id)"/>
	        			<q-btn color="red" unelevated icon="delete" @click="deleteModel(props.row.id)"/>
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
		          name: 'name',
		          align: 'left',
		          label: 'Name',
		          field: 'name',
		          sortable: true
		       },
		       {
		          name: 'plate_number',
		          align: 'left',
		          label: 'Number',
		          field: 'plate_number',
		          sortable: true
		       },

		       {
		          name: 'type',
		          align: 'left',
		          label: 'Type',
		          field: 'type',
		          sortable: true
		       },
		       // {
		       //    name: 'model',
		       //    align: 'left',
		       //    label: 'Model',
		       //    field: 'model',
		       //    sortable: true
		       // },
		       {
		          name: 'phone',
		          align: 'left',
		          label: 'Phone',
		          field: 'phone',
		          sortable: true
		       },
		       // {
		       //    name: 'email',
		       //    align: 'left',
		       //    label: 'Email(s)',
		       //    field: 'email',
		       //    sortable: true
		       // },
		       // {
		       //    name: 'number_of_washes',
		       //    align: 'left',
		       //    label: 'Wash(es)',
		       //    field: 'number_of_washes',
		       //    sortable: true
		       // },
		       // {
		       //    name: 'next_wash_free',
		       //    align: 'left',
		       //    label: 'Next Free Wash',
		       //    field: 'next_wash_free',
		       //    sortable: true
		       // },
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
            plate_numbers: 'plate_number/plate_numbers',
        }),
    },

	methods:{
		...mapActions({
			getPlateNumbers: 'plate_number/getPlateNumbers',
			updatePlateNumbers: 'plate_number/updatePlateNumber',
			deletePlateNumber: 'plate_number/deletePlateNumber',
		}),

		deleteModel(id){
			this.deletePlateNumber(id).then((response) => {
        		this.positiveNotification('Action was deleted')
            }) 
		},		
	},
	mounted (){
		this.getPlateNumbers()
	},
}
</script>