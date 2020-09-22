<template>
	<q-page padding>
	  	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
	        	<q-breadcrumbs-el label="Home" />
	        	<q-breadcrumbs-el label="Requsition Order" />
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
	        <div class="q-gutter-y-md" >
	        	<q-card >
			        <q-card-section>
			            <div class="text-h6 text-center">Create a requsition order</div>
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
		                            	<q-input
		                                    ref="name"
		                                    filled
		                                    v-model="form.item"
		                                    :dense="dense"
		                            		label="Select Item *" 
		                                    lazy-rules
		                                    :rules="[ val => val && val.length > 0 || 'Please select item/items']"
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
		                                    hint="Please insert a summary"
		                                />
		                            </div>

		                            <div class="col-12 q-pt-sm">
		                                <q-input
									      	v-model="form.additional_information"
									      	filled
									      	type="textarea"
	                                    	label="Additional Information *"
		                                    lazy-rules
		                                    :rules="[ val => val && val.length > 0 || 'Please select from the list']"
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
                    item : '',
                    quantity: '',
                    additional_information: '',
                    location_id: '',
                    user_id: ''
                },

                dense: false,
            }
        },

        computed: {
            ...mapGetters({
		        user: 'auth/user',
                message: 'message',
                errorMessage: 'errorMessage',
                newPhoneNumber: 'auth/phone',
                online: 'auth/onlineStatus',
            }),
        },
            
        methods:{
            ...mapActions({
              	sendRequest: 'requisitionOrder/sendRequisitionOrder',
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