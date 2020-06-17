<template>
	<q-page padding>
	  	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
	        	<q-breadcrumbs-el label="Home" />
	        	<q-breadcrumbs-el label="Report fault" />
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
	        <div class="q-gutter-y-md" >
	        	<q-card >
			        <q-card-section>
			            <div class="text-h6 text-center">Report a fault</div>
			        </q-card-section>

			        <q-card-section >            
			            <div class="q-pa-md">
			                <!-- <div class="bg-primary">{{message}}</div> -->
							<q-form
	                            @submit="submitRequest"
	                            class="q-gutter-md"
	                            ref="form"
	                        >
	                        	<div class="row">
		                            <div class="col-6 q-pl-sm">
		                            	<q-select 
		                            		filled 
		                            		v-model="form.severity" 
		                            		:options="options" 
		                            		label="Select Severity" 
		                                    lazy-rules
		                                    :rules="[ val => val && val.length > 0 || 'Please select from the list']"
		                            	/>
		                            </div>

		                            <div class="col-6 q-pl-sm">
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

		                            <div class="col-12 q-pl-sm">
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

		                            <div class="col-12 q-pt-sm">
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
		    </div>
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
                options: [
			        'Low Priority', 
			        'Medium Priority', 
			        'High Priority', 
			    ]
            }
        },

        computed: {
            ...mapGetters({
		        user: 'auth/user',
                message: 'message',
                errorMessage: 'errorMessage',
                online: 'auth/onlineStatus',
            }),
        },
            
        methods:{
            ...mapActions({
              	sendRequest: 'reportFaults/sendReportFaults',
                connected: 'internetStatus/setConnection',
            }),

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
                            this.sendRequest(this.form).then((res) => {
			                    this.positiveNotification('your request has been sent')
			                }).catch((error) => {
			                    this.errorMessages = error
			                    console.log(this.errorMessages)
			                    if(this.errorMessages){
			                        // this.negativeNotification(this.errorMessages)
			                        return this.negativeNotification('you must be connected to the internet to proceed')
			                    }
			                }) 
                        }
                    })
                    
                })();        
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
        	if(this.user){
        		console.log(this.user.location)
        		this.form.user_id = this.user.id
        		this.form.location_id = this.user.location.id
        	}
        }
    }
</script>