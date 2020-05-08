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
		                                    v-model="profile.firstName"
		                                    :dense="dense"
		                                    label="Your First Name *"
		                                    lazy-rules
		                                    :rules="[ val => val && val.length > 0 || 'Please in your first name']"
		                                    :readonly="readonly"
		                                />
		                            </div>

		                            <div class="col-md-6 q-pa-sm">
		                                <q-input
		                                    ref="name"
		                                    filled
		                                    v-model="profile.lastName"
		                                    :dense="dense"
		                                    label="Your Last Name *"
		                                    lazy-rules
		                                    :rules="[ val => val && val.length > 0 || 'Please in your last name']"
		                                    :readonly="readonly"
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
		                                    v-model="profile.email"
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
		                                    v-model="profile.phone"
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
		                                    v-model="profile.username"
		                                />
		                            </div>

		                            <div class="col-md-6 q-pa-sm">
		                            	Male <q-toggle toggle-indeterminate v-model="userSex" :dense="dense"  :readonly="readonly" :disable="disableRadio && readonly == true" :value="sex" label="Female" />
		                                {{profile.sex}}
		                            </div>

		                            <div class="col-md-6 q-pa-sm">
		                            	<q-input 
		                            	 	filled 
		                            	 	ref="name" 
		                            	 	v-model="profile.dob" 
		                            	 	mask="date" 
		                            	 	:dense="dense"
		                                    label="Date of Birth *"
		                                    hint="We care about you"
		                                    lazy-rules
		                                    :readonly="readonly" 
		                                    :rules="['date']"
		                                    >
									      	<template v-slot:append>
										        <q-icon name="event" class="cursor-pointer">
										          	<q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
										            	<q-date v-model="profile.dob" @input="() => $refs.qDateProxy.hide()" />
										          	</q-popup-proxy>
										        </q-icon>
									      	</template>
									    </q-input>
		                            </div>
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
                    firstName:  '',
                    lastName: '',
                    email:  '',
                    phone : '',
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
            	if(this.userSex == false){
            		this.profile.sex  = "male"
            	}

            	if(this.userSex == true){
            		this.profile.sex = "female"
            	}
            }
        },
            
        methods:{
            ...mapActions({
              	profileData: 'auth/updateProfile',
            }),

            updateProfile(){
                this.profileData(this.profile).then((res) => {
                	console.log(this.profile)
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
        },
        mounted(){
        	if(this.user != null){
        		this.profile.firstName = this.user.firstName
        		this.profile.lastName = this.user.lastName
        		this.profile.username = this.user.username
        		this.profile.email = this.user.email
        		this.profile.phone = this.user.phone
        		this.profile.dob = this.user.dob

        		if(this.user.sex == 'male'){
            		this.profile.sex  = "male"
            	}

            	if(this.user.sex == 'female'){
            		this.profile.sex  = 'female'
            	}

            	if(this.user.sex == null){
            		this.profile.sex  = null
            	}
        	}
        }
    }
</script>