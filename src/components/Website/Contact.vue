<template>
	<div class="q-pa-xl" >
        <div class="container">
            <h4 style="margin-top: 0;">Contact Parkit</h4>
            <q-form
                @submit="submitRequest"
                class="q-gutter-md"
                ref="form"
            >
            	<div class="row text-white">
                    <div class="col-md-4 q-pl-sm">
                        <q-input
                            ref="name"
                            color="black"
                            filled
                            v-model="contact.name"
                            :dense="dense"
                            label="Name *"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type in your name']"
                        />
                    </div>

                    <div class="col-md-4 q-pl-sm">
                        <q-input
                            ref="name"
                            color="black"
                            filled
                            v-model="contact.email"
                            :dense="dense"
                            label="Email *"
                            min="1"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type in your email']"
                        />
                    </div>

                    <div class="col-md-4 q-pl-sm">
                        <q-input
                            ref="name"
                            color="black"
                            filled
                            v-model="contact.phone"
                            :dense="dense"
                            label="Phone Number *"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type your phone number']"
                        />
                    </div>

                    <div class="col-md-12 q-pt-sm">
                        <q-input
					      	type="textarea"
					      	filled
					      	v-model="contact.message"
                            color="black"
                        	label="Message *"
                        	:rules="[ val => val && val.length > 0 || 'Please type a message']"
					    />
                    </div>
			        

                </div>
                <q-card-actions align="right">
		            <q-btn size="lg" type="submit" label="SEND MESSAGE" color="primary" text-color="white" />
		        </q-card-actions> 
            </q-form> 
        </div>
    </div>
</template>

<script>
    
    import { mapActions, mapGetters } from 'vuex'
    import { Notify } from 'quasar'

    export default{
        data(){
            return{
                contact: {
                    name : '',
                    phone: '',
                    email: '',
                    message: '',
                },
                errorMessages: [],
                error: '',  
            }
        },

        computed: {
            ...mapGetters({
                message: 'message',
                errorMessage: 'errorMessage',
            }),
        },
            
        methods:{
            ...mapActions({
              sendMail: 'contact/sendTrainingAndConsultancyEmail',
            }),

            submitRequest(){
                this.sendMail(this.contact).then((res) => {
                    this.positiveNotification('your request has been sent')
                }).catch((error) => {
                    console.log(error)
                    this.errorMessages = error
                    if(error){
                        this.negativeNotification('Sorry!!! An error occured')
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
