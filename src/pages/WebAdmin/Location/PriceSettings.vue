<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label="PriceSettings"/>
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
			
        	<BackButton/>
			<!-- <q-btn type="submit" unelevated color="primary" class="q-my-md" size="md" label="Create Price" @click="createModel = true" /> -->

	        <div class="q-gutter-y-md">
	            <div class="q-pa-sm"  v-if="rates">
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
					      		<q-td key="location" :props="props">{{props.row.location}}</q-td>
					      		<q-td key="vehicle_type" :props="props">{{props.row.vehicle}}</q-td>
					      		<q-td key="package_type" :props="props">{{props.row.package}}</q-td>
					      		<q-td key="amount" :props="props">{{props.row.amount}}</q-td>
					      		<q-td key="action" :props="props">
						      		<q-btn color="orange" unelevated class="q-mx-sm" icon="edit" @click="editModel(props.row)" v-bind:disabled="props.row.status === 'complete' ? true : false"/>
						      		<!-- <q-btn color="red" unelevated class="q-mx-sm" icon="delete" @click="deleteModel(props.row)" v-bind:disabled="props.row.status === 'complete' ? true : false"/> -->
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
										        :option-label="opt => Object(opt) === opt && 'type' in opt ? opt.location +' - '+ opt.type   : null"
										        :option-disable="opt => Object(opt) === opt ? opt.inactive === true : true"
										        emit-value
										        map-options
							                    :rules="[ val => val.length == null || 'Please use maximum 3 characters' ]"
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
							                    :rules="[ val => val && val.length == null || 'Please select a package']"
								            />
						                </div>

						                <div class="col-12 q-pa-sm">
						                    <q-input
							                    filled
							                    v-model="form.amount"
							                    type="number"
							                    label="How much are we selling *"
							                    lazy-rules
							                    :rules="[ val => val && val.length == 0 || 'Please type in an amount']"
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

				    <q-dialog v-model="editModal">
			          	<q-card>
				            <q-card-section>
				              <div class="text-h6">Edit a Package type</div>
				            </q-card-section>

				            <q-separator />

				            <q-card-section style="max-height: 500vh">
				              	<q-form
					                @submit.prevent="updateModel"
					                ref="form"
					                >
					                <div class="row">
						                <div class="col-12 q-pa-sm">
						                    <q-select 
								                filled 
								                v-model="update.vehicle_id" 
								                :options="vehicles" 
								                label="Select Vehicle type*"
								                lazy-rules
										        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
										        :option-label="opt => Object(opt) === opt && 'type' in opt ? opt.location +' - '+ opt.type   : null"
										        :option-disable="opt => Object(opt) === opt ? opt.inactive === true : true"
										        emit-value
										        map-options
							                    :rules="[ val => val.length == null || 'Please use maximum 3 characters' ]"
								            />
						                </div>

						                

						                <div class="col-12 q-pa-sm">
						                    <q-select 
								                filled 
								                label="Select package type *"
								                lazy-rules
								                v-model="update.package_id" 
								                :options="packages" 
										        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
										        :option-label="opt => Object(opt) === opt && 'type' in opt ? opt.type : null"
										        :option-disable="opt => Object(opt) === opt ? opt.inactive === true : true"
										        emit-value
										        map-options
							                    :rules="[ val => val && val.length == null || 'Please select a package']"
								            />
						                </div>

						                <div class="col-12 q-pa-sm">
						                    <q-input
							                    filled
							                    v-model="update.amount"
							                    type="number"
							                    label="How much are we selling *"
							                    lazy-rules
							                />
						                </div>
							               
					                </div>

					                <q-btn
					                  	type="submit"
					                  	label="save"
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
	        </div>
	    </div>
  	</q-page>
</template>


<script>

import { mapActions, mapGetters } from 'vuex'
import BackButton from 'components/Share/BackButton.vue'

export default {
	components: {
		BackButton
	},
	data () {
		return {
			form:{
		        vehicle_id: '',
                package_id: '',
                amount: '',
		    },


			update:{
		        vehicle_id: '',
                package_id: '',
                amount: '',
		    },

      		createModel: null,

      		editModal: null,

		    filterModel: '',

			separator: 'cell',

			pagination: {
		        rowsPerPage: 30,
		        page: 1
		    },

		    text: '',
		    columns: [
		       {
		          name: 'location',
		          align: 'left',
		          label: 'Location',
		          field: 'location',
		          sortable: true
		       },
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
          	location: 'accountLocation/accountLocationDetails',
        }),

        selectOptions () {
		    return this.packages
		}
    },

	methods:{
		...mapActions({
			getPackages: 'packages/getPackages',
			getLocationVehicles: 'vehicles/getLocationVehicles',
			updateVehicle: 'vehiclePackageRates/updateRate',
            getLocationRates: 'vehiclePackageRates/getLocationRates',
            deleteRate: 'vehiclePackageRates/deleteRate',
		}),

		editModel(item){
			this.editModal = true
			console.log(item)
			this.update.id = item.id
			this.update.package_id = item.package_id
			this.update.vehicle_id = item.vehicle_id
			this.update.amount = item.amount
		},

		updateModel(){
			this.updateVehicle(this.update).then((response) => {
				this.getLocationRates(this.location.id)
				return this.positiveNotification('Updated')
            })
		},	

		// deleteModel(id){
		// 	this.deleteRate(id).then((response) => {
		// 		return this.positiveNotification('deleted')
  //           })
		// },	

		positiveNotification(message){
            Notify.create({
                type: 'positive',
                color: 'positive',
                timeout: 3000,
                position: 'center',
                message: message
            })
        },

        negativeNotification(error){
            Notify.create({
                type: 'negative',
                color: 'negative',
                timeout: 3000,
                position: 'center',
                message: error
            })
        },
	},
	mounted (){
		if(this.location == null){
			return this.$router.push({ path: `/web/admin/locations` })  
		}
		this.getPackages()
		this.getLocationVehicles(this.location.id)
		this.getLocationRates(this.location.id)
	},
}
</script>