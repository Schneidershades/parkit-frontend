<template>
	<q-page padding>
		<div class="q-pa-md q-gutter-sm">
			<q-breadcrumbs>
				<q-breadcrumbs-el label="Home" />
				<q-breadcrumbs-el label="Purchase Orders" />
			</q-breadcrumbs>
		</div>

	    <div class="q-pa-md">
	        <div class="q-gutter-y-md" >
	        	<q-card >
			        <q-card-section>
			            <div class="text-h6 text-center">Create a purchase order</div>
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
		                                    v-model="form.invoice"
		                                    :dense="dense"
		                                    label="Invoice Number/Identity *"
		                                    hint="Please insert a invoice id"
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
		                                />
		                            </div>

		                            <div class="col-6 q-pl-sm">
		                                <q-input
		                                    ref="name"
		                                    filled
		                                    type="number"
		                                    min="1"
		                                    v-model="form.total_amount"
		                                    :dense="dense"
		                                    label="Total Amount *"
		                                    hint="Please insert a total"
		                                />
		                            </div>

		                            <div class="col-12 q-pt-sm">
		                                <q-input
									      	v-model="form.description"
									      	filled
									      	type="textarea"
	                                    	label="Description *"
		                                    lazy-rules
		                                    :rules="[ val => val && val.length > 0 || 'Please select from the list']"
									    />
		                            </div>



							        <q-card-actions align="right">
							            <q-btn flat type="submit" label="Save" color="white" text-color="primary" />
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

    export default{
        data(){
            return{
                form: {
                    item : '',
                    invoice : '',
                    quantity: '',
                    total_amount: '',
                    description: '',
                },
                dense: false,
            }
        },

        computed: {
            ...mapGetters({
                message: 'message',
                errorMessage: 'errorMessage',
                newPhoneNumber: 'auth/phone',
            }),
        },
            
        methods:{
            ...mapActions({
              	sendStaffPurchaseOrders: 'purchaseOrders/sendStaffPurchaseOrders',
            }),

            submitRequest(){
                this.sendStaffPurchaseOrders(this.form).then((res) => {
                    this.positiveNotification('your request has been sent')
                }).catch((error) => {
                    this.errorMessages = error
                    console.log(this.errorMessages)
                    if(this.errorMessages){
                        this.negativeNotification(this.errorMessages)
                    }
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
        }
    }
</script>