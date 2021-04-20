<template>
	<q-page padding>
		<div class="q-pa-md q-gutter-sm">
			<q-breadcrumbs>
				<q-breadcrumbs-el label="Home" />
				<q-breadcrumbs-el label="Expense Order" />
			</q-breadcrumbs>
		</div>

		<div class="q-pa-sm"  v-if="orders">
        	<BackButton/>

			<q-btn type="submit"
				v-if="$can('create', 'expenseOrders')"
				unelevated
				color="primary" 
				class="q-my-md" 
				size="md" 
				label="Create New" 
				@click="createModelType = true" 
				/>

	        <q-table
			    title="Expense Orders Requests"
			    :columns="columns"
			    row-key="name"
			    :data="orders"
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
			      		<q-td key="created_at" :props="props">{{props.row.created_at}}</q-td>
			      		<q-td key="account_classification" :props="props">{{props.row.account_classification}}</q-td>
			      		<!-- <q-td key="quantity" :props="props">{{props.row.quantity}}</q-td> -->
			      		<!-- <q-td key="amount" :props="props">{{props.row.amount}}</q-td> -->
			      		<q-td key="total" :props="props">{{props.row.total}}</q-td>
			      		<q-td key="user" :props="props">{{props.row.user}}</q-td>
			      		<q-td key="location" :props="props">{{props.row.location}}</q-td>
			      		<q-td key="reminder_count" :props="props">{{props.row.reminder_count}}</q-td>
			      		<q-td key="status" :props="props">{{props.row.status}}</q-td>
			      		<q-td key="actions" :props="props">

			      			<q-btn color="orange" unelevated class="q-mx-sm" icon="remove_red_eye" @click="viewDetails(props.row)"/>

			      			<template unelevated v-if="props.row.status == 'pending' && $can('send', 'lmNotification')">
				      			<q-btn color="purple" unelevated icon="notification_important" v-bind:disabled="props.row.sendReminder == 'no' ? true : false"/>
			      			</template>

			      			<template unelevated v-if="props.row.status == 'failed'">
				      			<q-btn color="red" unelevated icon="delete" v-bind:disabled="props.row.status === 'failed' ? true : false"/>
			      			</template>

			      			<template unelevated v-if="props.row.status == 'success'">
				      			<q-btn color="green" unelevated icon="check" v-bind:disabled="props.row.status === 'success' ? true : false"/>
			      			</template>

			      		</q-td>
			      	</q-tr>
			    </template>
		    </q-table> 

		    <q-dialog v-model="createModelType" >
	          	<q-card >
			        <q-card-section>
			            <div class="text-h6 text-center">Create an Expense Order Request</div>
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
						                <q-select 
						                  filled 
						                  v-model="form.account_classification_id"
						                  :options="classifications" 
						                  label="Category *"
						                  lazy-rules
						                  map-options
						                  emit-value
						                  option-value="id"
						                  option-label="name"
						                />
						            </div>
		                            <div class="col-6 q-pl-sm">
		                            	<q-input
		                                    ref="name"
		                                    filled
		                                    v-model="form.item"
		                                    :dense="dense"
		                            		label="Item Title *" 
		                                    lazy-rules
		                                    :rules="[ val => val && val.length > 0 || 'Please type a title']"
		                                />
		                            </div>

		                            <div class="col-6 q-pl-sm">
		                                <q-input
		                                    ref="name"
		                                    filled
		                                    v-model="form.invoice_number"
		                                    :dense="dense"
		                                    label="Invoice Number/Identity *"
		                                    hint="Please insert an invoice number id"
		                                />
		                            </div>

		                            <div class="col-6 q-pl-sm">
		                                <q-input
		                                    ref="name"
		                                    filled
		                                    type="number"
		                                    min="1"
		                                    v-model="form.quantity"
		                                    :dense="dense"
		                                    label="Quantity *"
		                                    hint="Please insert a quantity"
		                                    :rules="[ val => val && val.length > 0 || 'Please type a quantity']"
		                                />
		                            </div>

		                            <div class="col-6 q-pl-sm">
		                                <q-input
		                                    ref="name"
		                                    filled
		                                    type="number"
		                                    min="1"
		                                    v-model="form.amount"
		                                    :dense="dense"
		                                    label="Amount *"
		                                    hint="Please insert a total"
		                                    :rules="[ val => val && val.length > 0 || 'Please type a total']"
		                                />
		                            </div>

		                            <div class="col-12 q-pl-sm">
		                                <q-input
		                                    ref="name"
		                                    filled
		                                    type="number"
		                                    min="1"
		                                    v-model="total_amount"
		                                    readonly
		                                    :dense="dense"
		                                    label="Total Amount *"
		                                />
		                            </div>

		                            <div class="col-12 q-pt-sm">
		                                <q-input
									      	v-model="form.description"
									      	filled
									      	type="textarea"
	                                    	label="Description *"
		                                    lazy-rules
		                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
									    />
		                            </div>

		                            <div class="col-12 q-pt-sm" 
		                            	v-if="$can('set', 'formLocations')">
		                                <q-select
						                	filled 
							                label="Select Location *"
							                lazy-rules
							                v-model="form.location_id" 
							                :options="locations" 
						                	:option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
						                	:option-label="opt => Object(opt) === opt && 'id' in opt ? opt.locationName : null"
						                	:option-disable="opt => Object(opt) === opt ? opt.inactive === true : true"
									        emit-value
									        map-options
						                    :rules="[ val => val && val.length == null || 'Please select a location']" />
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

	        <q-dialog v-model="editModelType">
	          	<q-card v-if="expenseDetails" class="text-center">
			        <q-card-section>
			            <div class="text-h6 text-center">View Expense Details</div>
			        </q-card-section>

			        <q-card-section>         
		            	<div class="row">
                    		<div class="col-6 q-pt-md">
								Item : {{expenseDetails.item}}
				            </div>
                            <div class="col-6 q-pt-md">
								Class : {{expenseDetails.account_classification}}
                            </div>

                            <div class="col-6 q-pt-md">
								Quantity : {{expenseDetails.quantity}}
                            </div>

                            <div class="col-6 q-pt-md">
								Amount : {{expenseDetails.amount}}
                            </div>

                            <div class="col-6 q-pt-md">
								Total : {{expenseDetails.total}}
                            </div>

                            <div class="col-6 q-pt-md">
								Invoice Number : {{expenseDetails.invoice_number}}
                            </div>

                            <div class="col-6 q-pt-md">
								Location : {{expenseDetails.location}}
                            </div>

                            <div class="col-6 q-pt-md">
								User Requesting : {{expenseDetails.user}}
                            </div>

                            <div class="col-6 q-pt-md">
								Reminder : {{expenseDetails.reminder_count}}
                            </div>

                            <div class="col-12 q-pt-md">
								Item : {{expenseDetails.description}}
                            </div>

                            <div class="col-6 q-pt-md">
								User Response : {{expenseDetails.user_approval}}
                            </div>

                            <div class="col-6 q-pt-md">
								Status : {{expenseDetails.status}}
                            </div>

                            <div class="col-12 q-pt-md">
								Comment : {{expenseDetails.comment}}
                            </div>

                            <div class="col-6 q-pt-md">
								Created : {{expenseDetails.created_at}}
                            </div>

                            <div class="col-6 q-pt-md">
								Updated : {{expenseDetails.updated_at}}
                            </div>


                            <q-card-actions class="col-12" align="center" v-if="expenseDetails.status == 'pending'" 
                            	>
					            <q-btn label="Approve" v-if="$can('approve', 'expenseOrders')" @click="updateOrder(expenseDetails.id, 'approve')" color="primary" />
					            <q-btn label="Decline"  v-if="$can('decline', 'expenseOrders')" @click="updateOrder(expenseDetails.id, 'decline')" color="orange" />
					            <q-btn label="Delete"  v-if="$can('delete', 'expenseOrders')" @click="deleteOrder(expenseDetails.id, 'decline')" color="red" />
					        </q-card-actions>

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


	import BackButton from 'components/Share/BackButton.vue'

	import { AbilityBuilder } from '@casl/ability';
	const { can, rules } = new AbilityBuilder();
    const isOnline = require('is-online');

    export default{
    	components: {
			BackButton
		},

        data(){
            return{
                form: {
                    item : '',
                    account_classification_id : '',
                    quantity: 1,
                    amount: '',
                    total: '',
                    invoice_number : '',
                    description: '',
                    location_id: '',
                    user_id: '',
                    reminder_count: 1,
                    transaction_initiated_date: '',
                    transaction_initiated_time: '',
                },

                dense: false,
                filterModel: '',
                createModelType: false,
                editModelType: false,
                expenseDetails: null,
				separator: 'cell',

				pagination: {
			        rowsPerPage: 30,
			        page: 1
			    },

                columns: [
			       {
			          name: 'created_at',
			          align: 'left',
			          label: 'Created',
			          field: 'created_at',
			          sortable: true
			       },
			       {
			          name: 'account_classification',
			          align: 'left',
			          label: 'Class(s)',
			          field: 'account_classification',
			          sortable: true
			       },
			       {
			          name: 'total',
			          align: 'left',
			          label: 'Total',
			          field: 'total',
			          sortable: true
			       },
			       {
			          name: 'user',
			          align: 'left',
			          label: 'User(s)',
			          field: 'user',
			          sortable: true
			       },
			       {
			          name: 'location',
			          align: 'left',
			          label: 'Location',
			          field: 'location',
			          sortable: true
			       },
			       {
			          name: 'reminder_count',
			          align: 'left',
			          label: 'Notice(s)',
			          field: 'reminder_count',
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
		        user: 'auth/user',
                message: 'message',
                errorMessage: 'errorMessage',
                newPhoneNumber: 'auth/phone',
                online: 'auth/onlineStatus',
              	orders: 'expenseOrders/getExpenseOrders',
          		classifications: 'accountClassification/allAccountClassification',
          		locations: 'locationSettings/locations',
          		location: 'accountLocation/accountLocationDetails',
            }),

            total_amount(){
            	return this.form.amount * this.form.quantity
            }
        },
            
        methods:{
            ...mapActions({
              	sendExpenseOrders: 'expenseOrders/sendExpenseOrder',
              	getLocationExpenseOrders: 'expenseOrders/getLocationExpenseOrders',
              	getExpenseOrders: 'expenseOrders/getExpenseOrders',
              	updateExpenseOrders: 'expenseOrders/updateExpenseOrders',
              	getExpenseOrders: 'expenseOrders/getExpenseOrders',
              	deleteExpenseOrders: 'expenseOrders/deleteExpenseOrders',
                connected: 'internetStatus/setConnection',
        		getClassifications: 'accountClassification/getAccountClassification',
        		getLocations: 'locationSettings/getLocations',
            }),

            hasHistory () { 
            	return window.history.length > 2 
            },

            submitRequest(){
            	(async () => {
                    var check = await isOnline()
                    console.log(check);
                    if(check == false){
                        return this.negativeNotification('You are offline. Please connect to an available internet')
                    }
                    this.connected(check).then((res) => {
                        if(check == false){
                            return this.negativeNotification('You are offline. Please connect to an available internet')
                        }else{

                        	this.form.total = this.total_amount
	        				this.form.transaction_initiated_date = this.optionsFn()
	        				this.form.transaction_initiated_time = this.time()

                            this.sendExpenseOrders(this.form).then((res) => {
                            	this.createModelType=false
			                    this.positiveNotification('your request has been sent')
			                }).catch((error) => {
			                    this.errorMessages = error
			                    console.log(this.errorMessages)
			                    if(this.errorMessages){
			                        this.negativeNotification(this.errorMessages)
			                    }
			                }) 
                        }
                    })
                })();      
            },

            viewDetails(item){
            	this.editModelType = true

            	this.expenseDetails = item
            },

            updateOrder(id, status){
            	var form = {id: id, status:status}
            	this.updateExpenseOrders(form).then((res) => {
                	this.editModelType=false
                    this.positiveNotification('your request has been sent')
                })
            },

            deleteOrder(id){
            	this.deleteExpenseOrders(id).then((res) => {
                    this.editModelType=false
                    this.positiveNotification('your request has been deleted')
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

    		if(this.location == null){
				return window.history.length > 2
			}
			
    		this.getClassifications()
    		this.getLocations()
    		this.expenseDetails = null
    		this.getLocationExpenseOrders(this.location.id)
        	this.form.location_id = this.location.id
        }
    }
</script>