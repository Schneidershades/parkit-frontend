<template>   
    <q-card style="width: 800px;" class="q-pa-sm">
        <!-- <q-card-actions align="center">
            <img src="statics/parkit_icon_logo.png" align="center" alt="Parkit Home service" width="100">
        </q-card-actions>  -->
        <q-card-section >            
            <div class="q-pa-sm">
                <div class="text-h4 text-center">Training / Consultancy</div>

                <p>Kindly fill the form below and send us a message to let us know of your training or consultancy requirements.</p>

                <q-form
                    @submit="submitPartnerEmail"
                    class="q-gutter-md"
                >
                    <div class="row">
                        <div class="col-md-12 q-pt-md">
                            <q-input
                                ref="name"
                                v-model="partner.name"
                                label="Company Name *"
                                hint="Please insert your company name"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                        </div>

                        <div class="col-md-6">
                            <q-input
                                ref="name"
                                v-model="partner.contact"
                                label="Company Contact *"
                                hint="Please insert company contact"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                        </div>

                        <div class="col-md-6 q-pl-sm">
                            <q-input
                                ref="name"
                                v-model="partner.email"
                                label="Company Email *"
                                hint="Please insert your email"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                        </div>

                        <div class="col-md-12 q-pt-sm">
                            <q-input
                                v-model="partner.message"
                                type="textarea"
                                label="Additional Information *"
                            />
                        </div>
                    </div>
                    <q-card-actions class="q-gutter-sm" align="center">
                        <q-btn color="primary" type="submit" label="Send Message" />
                        <q-btn label="Reset" color="primary" @click="step = 1" />
                        <q-btn label="Close" color="primary" v-close-popup />
                    </q-card-actions>
                </q-form>
            </div>
        </q-card-section>        
    </q-card>
</template>

<script>
    
    import { mapActions, mapGetters } from 'vuex'
    import { Notify } from 'quasar'

    export default{
        data(){
            return{
                 partner: {
                    name : '',
                    contact: '',
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

            submitPartnerEmail(){
                this.sendMail(this.partner).then((res) => {
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
