<template>
	<q-page padding>
		<div class="q-pa-md q-gutter-sm">
			<q-breadcrumbs>
				<q-breadcrumbs-el label="Home" />
				<q-breadcrumbs-el label="Income and Expense Account Categories" />
			</q-breadcrumbs>
		</div>

		<div class="q-pa-sm"  v-if="classifications">

			<q-btn type="submit" unelevated color="primary" class="q-my-md" size="md" label="Create New" @click="createModelType = true" />

	        <q-table
			    title="Income and Expense Categories"
			    :columns="columns"
			    row-key="name"
			    :data="classifications"
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
			      		<q-td key="name" :props="props">{{props.row.name ? props.row.name : 'N/A'}}</q-td>
			      		<q-td key="type" :props="props">{{props.row.type ? props.row.type : 'N/A'}}</q-td>
			      		<q-td key="area" :props="props">{{props.row.area ? props.row.area : 'N/A'}}</q-td>
			      		<q-td key="actions" :props="props">

			      			<q-btn color="orange" unelevated class="q-mx-sm" icon="edit" @click="editModel(props.row)"/>
			      			
			      			<q-btn color="red" unelevated icon="delete"/>
			      		</q-td>
			      	</q-tr>
			    </template>
		    </q-table> 

		    <q-dialog v-model="createModelType" >
	          	<q-card >
			        <q-card-section>
			            <div class="text-h6 text-center">Create an Income and Expense Class</div>
			        </q-card-section>

			        <q-card-section>            
			            <div class="q-pa-md">
							<q-form
	                            @submit="submitRequest"
	                            class="q-gutter-md"
	                            ref="form"
	                        >
	                        	<div class="row">
		                            <div class="col-12 q-pa-sm">
		                            	<q-input
		                                    ref="name"
		                                    filled
		                                    v-model="form.name"
		                                    :dense="dense"
		                            		label="Item Title *" 
		                                    lazy-rules
		                                    :rules="[ val => val && val.length > 0 || 'Please type a title']"
		                                />
		                            </div>


	                        		<div class="col-12 q-pa-sm">
						                <q-select 
						                  filled 
						                  v-model="form.type"
						                  :options="categories" 
						                  label="Category *"
						                  lazy-rules
						                  map-options
						                  emit-value
						                  option-value="id"
						                  option-label="name"
		                                  :rules="[ val => val && val.length > 0 || 'Please select an item']"
						                />
						            </div>

	                        		<div class="col-12 q-pa-sm">
						                <q-select 
						                  filled 
						                  v-model="form.location"
						                  :options="coverage" 
						                  label="Category *"
						                  lazy-rules
						                  map-options
						                  emit-value
						                  option-value="id"
						                  option-label="name"
						                  :rules="[ val => val && val.length > 0 || 'Please select an item']"
						                />
						            </div>

							        <q-card-actions align="right">
							            <q-btn type="submit" unelevated color="primary" class="q-px-md" size="lg" label="Send Request" />
							        </q-card-actions>
		                        </div>  
	                        </q-form> 	
			            </div>
			        </q-card-section>
			    </q-card>
	        </q-dialog>

	        <q-dialog v-model="editModelType" >
	          	<q-card >
			        <q-card-section>
			            <div class="text-h6 text-center">Create an Income and Expense Class</div>
			        </q-card-section>

			        <q-card-section>            
			            <div class="q-pa-md">
							<q-form
	                            @submit="submitRequest"
	                            class="q-gutter-md"
	                            ref="form"
	                        >
	                        	<div class="row">
		                            <div class="col-12 q-pa-sm">
		                            	<q-input
		                                    ref="name"
		                                    filled
		                                    v-model="updateForm.name"
		                                    :dense="dense"
		                            		label="Item Title *" 
		                                    lazy-rules
		                                    :rules="[ val => val && val.length > 0 || 'Please type a title']"
		                                />
		                            </div>


	                        		<div class="col-12 q-pa-sm">
						                <q-select 
						                  filled 
						                  v-model="updateForm.type"
						                  :options="categories" 
						                  label="Category *"
						                  lazy-rules
						                  map-options
						                  emit-value
						                  :option-value="updateForm.type"
						                  :option-label="updateForm.type"
		                                  :rules="[ val => val && val.length > 0 || 'Please select an item']"
						                />
						            </div>

	                        		<div class="col-12 q-pa-sm">
						                <q-select 
						                  filled 
						                  v-model="updateForm.area"
						                  :options="coverage" 
						                  label="Category *"
						                  lazy-rules
						                  map-options
						                  emit-value
						                  :option-value="updateForm.area"
						                  :option-label="updateForm.area"
						                  :rules="[ val => val && val.length > 0 || 'Please select an item']"
						                />
						            </div>

							        <q-card-actions align="right">
							            <q-btn type="submit" unelevated color="primary" class="q-px-md" size="lg" label="Send Request" />
							        </q-card-actions>
		                        </div>  
	                        </q-form> 	
			            </div>
			        </q-card-section>
			    </q-card>
	        </q-dialog>
		</div>	
	</q-page>
</template>


<script>
    
    import { mapActions, mapGetters } from 'vuex'
    import { Notify } from 'quasar'
	import { date } from 'quasar'
    const isOnline = require('is-online');

    export default{
        data(){
            return{
                form: {
                    name : '',
                    type : '',
                    area: '',
                },

                updateForm: {
                    id : '',
                    name : '',
                    type : '',
                    area: '',
                },

                dense: false,
                filterModel: '',
                createModelType: false,
                editModelType: false,
				separator: 'cell',

				pagination: {
			        rowsPerPage: 30,
			        page: 1
			    },

                columns: [
			       {
			          name: 'name',
			          align: 'left',
			          label: 'Name',
			          field: 'name',
			          sortable: true
			       },
			       {
			          name: 'type',
			          align: 'left',
			          label: 'Type',
			          field: 'type',
			          sortable: true
			       },
			       {
			          name: 'area',
			          align: 'left',
			          label: 'Area',
			          field: 'area',
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

			    categories: [
			        'income', 'expense'
			    ],

			    coverage: [
			        'location', 'random'
			    ],
            }
        },

        computed: {
            ...mapGetters({
		        user: 'auth/user',
                message: 'message',
                errorMessage: 'errorMessage',
                newPhoneNumber: 'auth/phone',
                online: 'auth/onlineStatus',
          		classifications: 'accountClassification/allAccountClassification',
            	selectedClassification: 'accountClassification/selectedClassification',
            }),

            total_amount(){
            	return this.form.amount * this.form.quantity
            }
        },
            
        methods:{
            ...mapActions({
              	sendExpenseOrders: 'expenseOrders/sendExpenseOrder',
                connected: 'internetStatus/setConnection',
        		getClassifications: 'accountClassification/getAccountClassification',
				selectModel: 'accountClassification/selectClassification',
				updateModel: 'accountClassification/updateClassification',
            }),

            submitRequest(){
            	this.updateModel(this.updateForm).then((response) => {
            		this.positiveNotification('Action was saved')
					this.editModelType = false
	            })      
            },

            editModel(item){
            	console.log(item)
				this.selectModel(item).then((response) => {
					this.editModelType = true
					this.updateForm.id = item.id
					this.updateForm.type = item.type
					this.updateForm.area = item.area
					this.updateForm.name = item.name
	            })
			},	

			deleteClassification(vehicle){
				this.deleteModel(vehicle).then((response) => {
            		this.positiveNotification('Action was deleted')
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

            optionsFn () {
	     		var today = new Date();
	  			var bu = today.getDate();
		      	
	     		console.log(new Date())
	     		var timeStamp = Date.now()
				var formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')
				return formattedString
		    },

		    time(){
		    	var today = new Date();
		    	var time = today.getHours() + ":" + today.getMinutes() + ":" + 
            	today.getSeconds();
            	return time
		    },
        },

        mounted(){
    		this.getClassifications()
        }
    }
</script>