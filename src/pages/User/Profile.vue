<template>
	<q-page padding>
	  	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
	        	<q-breadcrumbs-el label="Home" />
	        	<q-breadcrumbs-el label="Profile" />
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
	        <div class="q-gutter-y-md" >
	        	<q-card>
			        <q-card-section>
			            <div class="text-h6 text-center">My Profile</div>
			        </q-card-section>

			        <q-card-section >            
			            <div class="q-pa-md">
			            	<!-- {{user}} -->
			                <!-- <div class="bg-primary">{{message}}</div> -->
							<q-form
	                            @submit="updateProfile"
	                            class="q-gutter-md"
	                            ref="form"
	                        >
	                        	<div class="row">
		                            <div class="col-md-6 q-pa-sm">
		                                <q-input
		                                    ref="name"
		                                    filled
		                                    :dense="dense"
		                                    label="Your First Name *"
		                                    hint="Please insert your first name"
		                                    lazy-rules
		                                    :rules="[ val => val && val.length > 0 || 'Please in your first name']"
		                                    :readonly="readonly"
		                                    :value="user.firstName"
		                                />
		                            </div>

		                            <div class="col-md-6 q-pa-sm">
		                                <q-input
		                                    ref="name"
		                                    filled
		                                    :dense="dense"
		                                    label="Your Last Name *"
		                                    lazy-rules
		                                    :rules="[ val => val && val.length > 0 || 'Please in your last name']"
		                                    :readonly="readonly"
		                                    :value="user.lastName"
		                                />
		                            </div>

		                            <div class="col-md-6 q-pa-sm">
		                                <q-input
		                                    ref="name"
		                                    filled
		                                    :dense="dense"
		                                    label="Your Email *"
		                                    lazy-rules
		                                    :rules="[ val => val && val.length > 0 || 'Please in your email']"
		                                    :readonly="readonly"
		                                    :value="user.email"
		                                />
		                            </div>

		                            <div class="col-md-6 q-pa-sm">
		                                <q-input
		                                    ref="name"
		                                    filled
		                                    :dense="dense"
		                                    label="Your Phone *"
		                                    lazy-rules
		                                    readonly="readonly"
		                                    :value="user.phone"
		                                />
		                            </div>

		                            <div class="col-md-6 q-pa-sm">
		                                <q-input
		                                    ref="name"
		                                    filled
		                                    :dense="dense"
		                                    label="Your username *"
		                                    lazy-rules
		                                    readonly="readonly"
		                                    :value="user.username"
		                                />
		                            </div>

		                            <div class="col-md-6 q-pa-sm">
		                            	Male <q-toggle toggle-indeterminate v-model="userSex" :dense="dense"  :readonly="readonly" :disable="disableRadio && readonly == true" :value="sex" label="Female" />
		                                
		                            </div>

		                            <!-- <div class="col-md-6 q-pa-sm">
		                            	<q-input 
		                            	 	filled 
		                            	 	ref="name" 
		                            	 	v-model="profile.user" 
		                            	 	mask="date" 
		                            	 	:dense="dense"
		                                    label="Date of Birth *"
		                                    hint="We care about you"
		                                    lazy-rules
		                                    :readonly="readonly" 
		                                    :value="user.dob" 
		                                    :rules="['date']"
		                                    >
									      	<template v-slot:append>
										        <q-icon name="event" class="cursor-pointer">
										          	<q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
										            	<q-date v-model="profile.user" @input="() => $refs.qDateProxy.hide()" />
										          	</q-popup-proxy>
										        </q-icon>
									      	</template>
									    </q-input>
		                            </div> -->
		                        </div>

		                        <q-card-actions align="left">
						          	Toggle to Edit Profile <q-toggle color="warning" v-model="readonly" label="Disable" />
							    </q-card-actions>  

							    <q-card-actions align="right">
						            <q-btn type="submit" label="Save Profile" color="white" text-color="primary" :disable="readonly"/>
						        </q-card-actions>
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

                profile: {
                    phone : '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    username: '',
                    dob: '',
                    sex: '',
                },

                errorMessages: [],
                error: '',
                step: 1,
                dense: false,
                isPwd: true, 
                readonly: true,
                disable: true,
                disableRadio: true,
      			userSex: null,   
            }
        },

        computed: {
            ...mapGetters({
                message: 'message',
                errorMessage: 'errorMessage',
                newPhoneNumber: 'auth/phone',
                user: 'auth/user',
            }),

            sex(){
            	if(this.user.sex == 'male'){
            		this.userSex = "male"
            	}

            	if(this.user.sex == 'female'){
            		this.userSex = 'female'
            	}
            }
        },
            
        methods:{
            ...mapActions({
              	profileData: 'auth/updateProfile',
            }),

            updateProfile(){
                this.profileData(this.profile).then((res) => {
                    this.positiveNotification('Your profile has been updated')
                	this.disable=true
                }).catch((error) => {
                    // console.log(error)
                    this.errorMessages = error
                    if(error){
                        this.negativeNotification(error.error)
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