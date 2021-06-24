<template>
	<q-page padding>
	  	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
	        	<q-breadcrumbs-el label="Home" />
	        	<q-breadcrumbs-el label="Report fault" />
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-sm"  v-if="reportFaults">
			<q-btn type="submit" unelevated color="primary" class="q-my-md" size="md" label="Create New" @click="createModelType = true" />

	        <q-table
			    title="Report Fault"
			    :columns="columns"
			    row-key="name"
			    :data="reportFaults"
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
			      		<q-td key="severity" :props="props">{{props.row.severity}}</q-td>
			      		<q-td key="summary" :props="props">{{props.row.summary}}</q-td>
			      		<q-td key="location" :props="props">{{props.row.location}}</q-td>
			      		<q-td key="requestingUser" :props="props">{{props.row.requestingUser  ? props.row.requestingUser : 'None'}}</q-td>
			      		<q-td key="approvingUser" :props="props">{{props.row.approvingUser ? props.row.approvingUser : 'None'}}</q-td>
			      	</q-tr>
			    </template>
		    </q-table> 

		    <q-dialog v-model="createModelType" >
	          	<q-card >
			        <q-card-section>
			            <div class="text-h6 text-center">Report a fault</div>
			        </q-card-section>

			        <q-card-section >            
			            <div class="q-pa-md">
							<q-form
	                            @submit="submitRequest"
	                            class="q-gutter-md"
	                            ref="form"
	                        	>
	                        	<div class="row">
		                            <div class="col-12 col-md-6">
		                            	<q-select 
		                            		filled 
		                            		v-model="form.severity" 
		                            		:options="options" 
		                            		label="Select Severity" 
		                                    lazy-rules
		                                    :rules="[ val => val && val.length > 0 || 'Please select from the list']"
		                            	/>
		                            </div>

		                            <div class="col-12 col-md-6">
		                                <q-input
		                                    ref="name"
		                                    filled
		                                    v-model="form.summary"
		                                    :dense="dense"
		                                    label="Summary *"
		                                    hint="Please insert a summary"
		                                    lazy-rules
		                                    :rules="[ val => val && val.length > 0 || 'Please type in a summary']"
		                                />
		                            </div>

		                            <div class="col-12 col-md-12">
		                                <q-input
		                                    ref="name"
		                                    filled
		                                    v-model="form.description"
		                                    :dense="dense"
		                                    label="Reason *"
		                                    hint="Please state a description"
		                                    lazy-rules
		                                    :rules="[ val => val && val.length > 0 || 'Please type in a description']"
		                                />
		                            </div>

		                            <div class="col-12 col-md-12">
		                                <q-input
									      	v-model="form.additional_information"
									      	filled
									      	type="textarea"
	                                    	label="Additional Information *"
									    />
		                            </div>
		                            <q-card-actions align="right">
							            <q-btn type="submit" unelevated color="primary" class="q-px-md" size="lg" label="Send Request" />
							        </q-card-actions>
		                        </div>  
	                        </q-form> 	
			            </div>
			        </q-card-section>

			        <q-separator />
			        
			    </q-card>
	        </q-dialog>
		</div>
	</q-page>
</template>


<script>
    import { mapActions, mapGetters } from 'vuex'
    import { Notify } from 'quasar'
    const isOnline = require('is-online');

    export default{
        data(){
            return{
                form: {
                    severity : '',
                    summary: '',
                    description: '',
                    additional_information: '',
                    location_id: '',
                    user_id: ''
                },
                dense: false,
                filterModel: '',
                createModelType: false,
                editModelType: false,
                expenseDetails: null,
                
				pagination: {
			        rowsPerPage: 30,
			        page: 1
			    },

                options: [
			        'Low Priority', 
			        'Medium Priority', 
			        'High Priority', 
			    ],

			    columns: [
			       	{
			          	name: 'created_at',
			          	align: 'left',
			          	label: 'Created',
			          	field: 'created_at',
			          	sortable: true
			       	},
			       	{
			          	name: 'severity',
			          	align: 'left',
			          	label: 'Severity',
			          	field: 'severity',
			          	sortable: true
			       	},
			       	{
			          	name: 'summary',
			          	align: 'left',
			          	label: 'Summary',
			          	field: 'summary',
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
			          	name: 'requestingUser',
			          	align: 'left',
			          	label: 'User',
			          	field: 'requestingUser',
			          	sortable: true
			       	},
			       	{
			          	name: 'approvingUser',
			          	align: 'left',
			          	label: 'approvingUser',
			          	field: 'approvingUser',
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
                online: 'auth/onlineStatus',
                reportFaults: 'reportFaults/reportFaults',
          		location: 'accountLocation/accountLocationDetails',
            }),
        },
            
        methods:{
            ...mapActions({
              	sendRequest: 'reportFaults/sendReportFaults',
              	getReportFaults: 'reportFaults/getReportFaults',
                connected: 'internetStatus/setConnection',
            }),

            

            submitRequest(){
                (async () => {
                    var check = await isOnline()
                    console.log(check);
                    this.connected(check).then((res) => {
                        if(check == false){
                            return this.negativeNotification('You are offline. Please connect to an available internet')
                        }else{
                            this.sendRequest(this.form).then((res) => {
                                this.createModelType = false
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
                })()
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

        mounted(){
        	if(this.location == null){
				return window.history.length > 2 
			}
			
        	this.getReportFaults(this.location.id)
    		this.form.user_id = this.user.id
    		this.form.location_id = this.location.id
        }
    }
</script>