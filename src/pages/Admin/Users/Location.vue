<template>
	<q-page padding>
	    <div class="q-pa-md q-gutter-sm">
	      <q-breadcrumbs>
	        <q-breadcrumbs-el label="Home" />
	        <q-breadcrumbs-el label="Location" />
	      </q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
		    <div class="q-gutter-y-md">
		      	<q-btn-group push class="q-p-md" align="right">
			      	<q-btn push to="/web/admin/users" label="Back"/>
			      	<q-btn push  @click="createModel = true" label="New User"/>
			    </q-btn-group>
		        <q-table
				    title="All Location Users"
			      	:data="locationUsers"
			      	:columns="columns"
			      	row-key="username"
		      		:filter="filterUsers"
			    	:pagination.sync="pagination"
				    >
				    <template v-slot:top-right>
				        <q-input borderless dense debounce="300" v-model="filterUsers" placeholder="Search">
				          <template v-slot:append>
				            <q-icon name="search" v-model="filterUsers"/>
				          </template>
				        </q-input>
			      	</template>
				    <template slot="body" slot-scope="props">
				      	<q-tr :props="props">
				      		<q-td key="username" :props="props">{{props.row.username}}</q-td>
				      		<q-td key="email" :props="props">{{ props.row.email }}</q-td>
				      		<q-td key="status" :props="props">{{ props.row.activate ?  'Active' : 'Not Active' }}</q-td>
				      		<q-td key="role" :props="props">{{ props.row.role ?  props.row.role : 'No Role' }}</q-td>
				      		<q-td key="action" :props="props">
		      					<!-- <q-btn color="purple" class="q-mr-sm" unelevated icon="preview" @click="viewModel(props.row.id)"/> -->
		      					<q-btn color="orange" class="q-mr-sm" unelevated icon="edit" @click="editModel(props.row)"/>
	        					<q-btn color="red" unelevated icon="delete" @click="deleteModel(props.row)"/>
				      		</q-td>
				      	</q-tr>
				    </template>
			    </q-table>

			    <q-dialog v-model="createModel" >
			    	<q-card>
			    		<q-card-section>
			    			<div class="text-h6">Create New</div>
			    		</q-card-section>

			    		<q-separator />

			    		<q-card-section style="max-height: 500vh">
			    			<q-form
				    			@submit.prevent="saveUser"
				    			ref="form"
				    			>
				    			<div class="row">
				    				<div class="col-6 q-pa-sm">
				    					<q-input
				    					filled
				    					v-model="form.first_name"
				    					label="First Name *"
				    					lazy-rules
				    					:rules="[ val => val && val.length > 0 || 'Please type something']"
				    					/>
				    				</div>
				    				<div class="col-6 q-pa-sm">
				    					<q-input
				    					filled
				    					v-model="form.last_name"
				    					label="Last Name *"
				    					hint="Please insert a name"
				    					lazy-rules
				    					:rules="[ val => val && val.length > 0 || 'Please type something']"
				    					/>
				    				</div>

				    				<div class="col-6 q-pa-sm">
				    					<q-input
				    					filled
				    					v-model="form.username"
				    					label="Username *"
				    					type="text"
				    					hint="Please insert a username"
				    					lazy-rules
				    					:rules="[ val => val && val.length > 0 || 'Please type something']"
				    					/>
				    				</div>

				    				<div class="col-6 q-pa-sm">
				    					<q-input
				    					filled
				    					type="password"
				    					v-model="form.password"
				    					label="Create password *"
				    					hint="Please insert a password"
				    					lazy-rules
				    					:rules="[ val => val && val.length > 7 || 'Please you need more than 8 digit']"
				    					/>
				    				</div>


				    				<div class="col-6 q-pa-sm">
				    					<q-input
				    					filled
				    					v-model="form.email"
				    					label="Email *"
				    					hint="Please insert an email"
				    					lazy-rules
				    					:rules="[ val => val && val.length > 0 || 'Please type something']"
				    					/>
				    				</div>
				    				<div class="col-6 q-pa-sm">
				    					<q-input
				    					filled
				    					type="number"
				    					v-model="form.phone"
				    					label="Contact Phone *"
				    					lazy-rules
				    					:rules="[ val => val && val.length > 0 || 'Please type something']"
				    					/>
				    				</div>

					                <div class="col-6 q-pa-sm">
					                	<q-select 
					                	filled 
					                	:options="roles" 
					                	v-model="form.role" 
					                	:option-value="opt => Object(opt) === opt && 'id' in opt ? opt.name : null"
					                	:option-label="opt => Object(opt) === opt && 'id' in opt ? opt.name : null"
					                	:option-disable="opt => Object(opt) === opt ? opt.inactive === true : true"
					                	emit-value
					                	map-options
					                	label="Select Role *" />
					                </div>

					                <div class="col-6 q-pa-sm">
		                                <q-toggle v-model="form.activate" checked-icon="check" unchecked-icon="clear" color="green"  label="Make User Active"/>
		                            </div>

					                <div class="col-12 q-pa-sm">
					                	<div class="q-gutter-sm">
					                		<p><b>Select Location to process</b></p>
					                		<template v-for="location in locations">
									      		<q-checkbox dense v-model="form.locations" :val="location.id" :label="location.locationName" color="blue" :key="location.id" />
					                		</template>
									    </div>
					                </div>


					            </div>

					            <q-btn
						            type="submit"
						            label="Save"
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

				<q-dialog v-model="editModal" >
			    	<q-card>
			    		<q-card-section>
			    			<div class="text-h6">Edit User</div>
			    		</q-card-section>

			    		<q-separator />

			    		<q-card-section style="max-height: 500vh">
			    			<q-form
				    			@submit.prevent="saveUpdate"
				    			ref="form"
				    			>
				    			<div class="row">
				    				<div class="col-6 q-pa-sm">
				    					<q-input
				    					filled
				    					v-model="update.first_name"
				    					label="First Name *"
				    					lazy-rules
				    					:rules="[ val => val && val.length > 0 || 'Please type something']"
				    					/>
				    				</div>
				    				<div class="col-6 q-pa-sm">
				    					<q-input
				    					filled
				    					v-model="update.last_name"
				    					label="Last Name *"
				    					hint="Please insert a name"
				    					lazy-rules
				    					:rules="[ val => val && val.length > 0 || 'Please type something']"
				    					/>
				    				</div>

				    				<div class="col-6 q-pa-sm">
				    					<q-input
					    					filled
					    					v-model="update.username"
					    					label="Username *"
					    					hint="Please insert a username"
					    				/>
				    				</div>

				    				<!-- <div class="col-6 q-pa-sm">
				    					<q-input
				    					filled
				    					type="password"
				    					v-model="form.password"
				    					label="Create password *"
				    					hint="Please insert a password"
				    					lazy-rules
				    					:rules="[ val => val && val.length > 7 || 'Please you need more than 8 digit']"
				    					/>
				    				</div> -->


				    				<div class="col-6 q-pa-sm">
				    					<q-input
				    					filled
				    					v-model="update.email"
				    					label="Email *"
				    					hint="Please insert an email"
				    					lazy-rules
				    					:rules="[ val => val && val.length > 0 || 'Please type something']"
				    					/>
				    				</div>
				    				<div class="col-6 q-pa-sm">
				    					<q-input
				    					filled
				    					type="number"
				    					v-model="update.phone"
				    					label="Contact Phone *"
				    					lazy-rules
				    					:rules="[ val => val && val.length > 0 || 'Please type something']"
				    					/>
				    				</div>
					                <div class="col-6 q-pa-sm">

					                	<q-select
					                	filled 
						                label="Select Location *"
						                lazy-rules
						                v-model="update.location_id" 
						                :options="locations" 
					                	:option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
					                	:option-label="opt => Object(opt) === opt && 'id' in opt ? opt.locationName : null"
					                	:option-disable="opt => Object(opt) === opt ? opt.inactive === true : true"
								        emit-value
								        map-options
					                    :rules="[ val => val && val.length == null || 'Please select a location']" />
					                </div>

					                <div class="col-6 q-pa-sm">
					                	<q-select 
					                	filled 
					                	:options="roles" 
					                	v-model="update.role" 
					                	:option-value="opt => Object(opt) === opt && 'id' in opt ? opt.name : null"
					                	:option-label="opt => Object(opt) === opt && 'id' in opt ? opt.name : null"
					                	:option-disable="opt => Object(opt) === opt ? opt.inactive === true : true"
					                	emit-value
					                	map-options
					                	label="Select Role *" />
					                </div>

					                <div class="col-6 q-pa-sm">
		                                <q-toggle v-model="update.activate" checked-icon="check" unchecked-icon="clear" color="green"  label="Make User Active"/>
		                            </div>
					            </div>

					            <q-btn
						            type="submit"
						            label="Save"
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
	</q-page>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { Notify } from 'quasar'

export default {
	props :[
		'locationId'
	],
	data () {
		return {
			form:{
				first_name: '',
				last_name: '',
				username: '',
				sex: '',
				email: '',
				phone: '',
				password: '',
				location_id: '',
				role: '',
				activate: null,
				locations: [],
			},

			update:{
				id: '',
				first_name: '',
				last_name: '',
				username: '',
				sex: '',
				email: '',
				phone: '',
				location_id: '',
				role: '',
				activate: null,
				locations: [],
			},


      		filterUsers: '',
      		fixedIncomeDialog: false,
      		fixedExpenseDialog: false,
      		seeTransaction: false,
      		createModel: false,
      		editModal: false,
			pagination: {
		        rowsPerPage: 10
		    },

		    text: '',
		    columns: [
		       {
		          name: 'username',
		          align: 'left',
		          label: 'Username',
		          field: 'username',
		          sortable: true
		       },
		       {
		          name: 'email',
		          align: 'left',
		          label: 'Email',
		          field: 'email',
		          sortable: true
		       },
		       {
		          name: 'status',
		          align: 'left',
		          label: 'Status',
		          field: 'status',
		          sortable: true
		       },
		       {
		          name: 'role',
		          align: 'left',
		          label: 'Role',
		          field: 'role',
		          sortable: true
		       },
		       {
		          name: 'action',
		          align: 'left',
		          label: 'Action',
		          field: 'action',
		       }
		    ],
		}
	},
	computed: {
        ...mapGetters({
            location: 'accountLocation/accountLocationDetails',
            transactions: 'accountLocation/accountLocationTransactions',
          	user: 'auth/user',
          	transactionId: 'accountLocation/accountLocationTransactionSelected',
          	locationUsers: 'users/locationUsers',
          	locations: 'locationSettings/locations',
          	roles: 'roles/roles',
          	selectedStaff: 'staff/selectedStaff',
        }),
    },

	methods:{

		...mapActions({
        	getAccountLocationDetails: 'accountLocation/getAccountLocationDetails',
	        sendLocationsDetails: 'accountLocation/setAccountLocationSelected',
            getAccountLocationTransactions: 'accountLocation/getAccountLocationTransactions',
            sendAccountLocationTransactionSelected: 'accountLocation/sendAccountLocationTransactionSelected',
            deleteAccountLocationTransactionSelected: 'accountLocation/deleteAccountLocationTransactionSelected',
        	getClassifications: 'accountClassification/getAccountClassification',
        	getLocationUsers: 'users/getLocationUsers',
        	getLocations: 'locationSettings/getLocations',
          	getRoles: 'roles/getRoles',
          	postStaff: 'staff/postStaff',
          	selectStaff: 'staff/selectStaff',
          	deleteStaff: 'staff/deleteStaff',
          	updateStaff: 'staff/updateStaff',
	    }),	

		saveUser(){
			this.postStaff(this.form).then((response) => {
				this.createModel = false
            })	   
		},


		editModel(item){
			this.selectStaff(item).then((response) => {
				this.editModal = true
				this.update.id = item.id
				this.update.first_name = item.first_name
				this.update.last_name = item.last_name
				this.update.username = item.username
				this.update.sex = item.sex
				this.update.email = item.email
				this.update.phone = item.phone
				this.update.location_id = item.location.id
				this.update.role = item.role
				this.update.activate = item.activate
            })
		},

		// updateUser(item){
		// 	this.postStaff(this.form).then((response) => {
		// 		this.createModel = false
  //           })
		// },

		saveUpdate(){
			this.updateStaff(this.update).then((response) => {
				return this.positiveNotification('resource deleted')
            })
		},

		deleteModel(item){
			this.deleteStaff(item).then((response) => {
				this.getLocationUsers(this.$route.params.locationId)
				return this.positiveNotification('resource deleted')
            })
		},

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
	mounted()
	{
    	this.getRoles()

		if(this.location.id != null){

			if(this.getLocations()){
				this.form.location_id = this.location.id
			}
			this.getLocationUsers(this.location.id)
		}else{
			return this.$router.push({ path: `web/admin/users` })  
		}		
	}
}
</script>