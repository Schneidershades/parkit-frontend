<template>   
    <q-card style="width: 800px;" class="q-pa-sm">
        <!-- <q-card-actions align="center">
            <img src="~assets/parkit_icon_logo.png" align="center" alt="Parkit Home service" width="100">
        </q-card-actions>  -->

        <q-card-section >            
            <div class="q-pa-sm">
                <div class="text-h4 text-center">Career</div>

                <p>We are developing a world class work force to provide premium car wash services in the entire African region. Feel you have a hero's place in our mission? Then join us to redefine car wash.</p>

                <q-form
                    @submit="submitCareerEmail"
                    class="q-gutter-md"
                >
                    <div class="row">
                        <div class="col-md-6 q-pa-sm">
                            <q-input
                                ref="name"
                                v-model="career.first_name"
                                label="Your First Name *"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please insert your first name']"
                            />
                        </div>

                        <div class="col-md-6  q-pa-sm">
                            <q-input
                                ref="name"
                                v-model="career.last_name"
                                label="Your Last Name *"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please insert your last name']"
                            />
                        </div>

                        <div class="col-6 q-pa-sm">
                            <q-select 
                                v-model="career.role" 
                                :options="options" 
                                label="Select Job Role" 
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please select from the list']"
                            />
                        </div>

                        <div class="col-md-6 q-pa-sm">
                            <q-input
                                ref="name"
                                v-model="career.phone"
                                label="Your Phone Number *"
                                hint="Please insert your phone number"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                        </div>

                        <div class="col-md-12 q-pa-sm">
                            <q-input
                                v-model="career.about"
                                type="textarea"
                                label="Tell us about yourself *"
                            />
                        </div>

                        <div class="col-md-12 q-py-lg">
                            <q-file
                                class="q-px-lg"
                                v-model="career.file"
                                label="Upload your CV"
                                filled
                                accept=".pdf, .docx, .doc"
                                style="width:300px"
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
                career: {
                    first_name : '',
                    last_name : '',
                    role: '',
                    phone: '',
                    about: '',
                    file: null,
                },

                errorMessages: [],
                error: '',
                options: [
                    'Manager', 
                    'Cashier', 
                    'Parkit Pro Head', 
                    'Parkit Pro', 
                    'Valet', 
                    'Security', 
                ],  
            }
        },

        methods:{
            ...mapActions({
              sendMail: 'contact/sendCareerEmail',
            }),

            submitCareerEmail(){
                let formData = new FormData()

                formData.append('first_name', this.career.first_name)
                formData.append('last_name', this.career.last_name)
                formData.append('role', this.career.role)
                formData.append('phone', this.career.phone)
                formData.append('about', this.career.about)
                formData.append('file', this.career.file)

                this.sendMail(formData).then((res) => {
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
