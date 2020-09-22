<template>
	<div class="q-pa-sm"  v-if="vehicles">

		<q-btn type="submit" unelevated color="primary" class="q-my-md" size="md" label="Create New Vehicle Type" @click="createVehicleType = true" />

        <q-table
		    title="Vehicles"
		    :columns="columns"
		    row-key="name"
		    :data="vehicles"
		    :grid="$q.screen.xs"
		    :pagination.sync="pagination"
	      	:filter="filterVehicles"
		    >
		    	<template v-slot:top-right>
			        <q-input borderless dense debounce="300" v-model="filterVehicles" placeholder="Search">
			          <template v-slot:append>
			            <q-icon name="search" v-model="filterVehicles"/>
			          </template> 
			        </q-input>
		      	</template>

			    <template slot="body" slot-scope="props">
			      	<q-tr :props="props">
			      		<q-td key="type" :props="props">{{props.row.type}}</q-td>
			      		<q-td key="packages" :props="props">{{ props.row.packages.length }}</q-td>
			      		<q-td key="actions" :props="props">
			      			<q-btn color="orange" unelevated class="q-mx-sm" icon="edit" @click="editVehicle(props.row)" v-bind:disabled="props.row.status === 'complete' ? true : false"/>
				      		<q-btn color="red" unelevated class="q-mx-sm" icon="delete"  @click="deleteVehicle(props.row)" v-bind:disabled="props.row.status === 'complete' ? true : false"/>
			      		</q-td>
			      	</q-tr>
			    </template>
	    </q-table> 

	    <q-dialog v-model="createVehicleType" >
          	<q-card>
	            <q-card-section>
	              <div class="text-h6">Create a new vehicle type</div>
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
			                    label="Vehicle Name *"
			                    lazy-rules
			                    :rules="[ val => val && val.length > 0 || 'Please type a vehicle type']"
			                    />
			                </div>

			                <div class="col-12 q-pa-sm">
			                    <q-file
	                                v-model="form.svg_path"
	                                label="Upload the svg file of the vehicle"
	                                filled
	                                accept=".svg"
	                            />

			                    <i> you can get an icon at <a href="" _blank></a></i>
			                </div>
		                </div>

		                <q-btn
		                  	type="submit"
		                  	label="Save vehicle type"
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

        <q-dialog v-model="editVehicleType" >
          	<q-card>
	            <q-card-section>
	              <div class="text-h6">Edit a new vehicle type</div>
	            </q-card-section>

	            <q-separator />

	            <q-card-section style="max-height: 500vh">
	              	<q-form
		                @submit.prevent="updateVehicleItem"
		                ref="form"
		                >
		                <div class="row">
		                  	<div class="col-12 q-pa-sm">
			                    <q-input
			                    filled
			                    v-model="updateForm.type"
			                    label="Vehicle Name *"
			                    lazy-rules
			                    :rules="[ val => val && val.length > 0 || 'Please type a vehicle type']"
			                    />
			                </div>

			                <!-- <div class="col-12 q-pa-sm">
			                    <q-file
	                                v-model="updateForm.svg_path"
	                                label="Upload the svg file of the vehicle"
	                                filled
	                                accept=".svg"
	                            />

			                    <i> you can get an icon at <a href="" _blank></a></i>
			                </div> -->
		                </div>

		                <q-btn
		                  	type="submit"
		                  	label="Save vehicle type"
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
                svg_path: null,
		    },

		    updateForm:{
		        id: '',
		        type: '',
                svg_path: null,
		    },

      		createVehicleType: null,
      		editVehicleType: null,

		    filterVehicles: '',

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
		          name: 'packages',
		          align: 'left',
		          label: 'Package(s)',
		          field: 'packages',
		          sortable: true
		       },
		       {
		          name: 'actions',
		          align: 'left',
		          label: 'Action(s)',
		          field: 'actions',
		          sortable: true
		       },
		    ],
		}
	},
	computed: {
        ...mapGetters({
            vehicles: 'vehicles/vehicles',
            selectedVehicle: 'vehicles/selectedVehicle',
        }),
    },

	methods:{
		...mapActions({
			getVehicles: 'vehicles/getVehicles',
			selectVehicle: 'vehicles/selectVehicle',
			updateVehicle: 'vehicles/updateVehicle',
		}),

		editVehicle(vehicle){
			this.selectVehicle(vehicle).then((response) => {
				this.editVehicleType = true
				this.updateForm.id = this.selectedVehicle.id
				this.updateForm.type = this.selectedVehicle.type
            })
		},	

		updateVehicleItem(){
			this.updateVehicle(this.updateForm).then((response) => {

            })
		},

		deleteVehicle(vehicle){

		}	
	},
	mounted (){
		this.getVehicles()
	},
}
</script>