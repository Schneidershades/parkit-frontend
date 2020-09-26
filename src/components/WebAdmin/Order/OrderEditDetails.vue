<template>
	<div class="q-pa-sm">
        <div class="q-gutter-y-md q-pb-md">
            <q-btn-group push class="q-mr-sm" align="right">
                <q-btn color="green" label="Back to Orders" to="/web/admin/history"/>
            </q-btn-group>
        </div>

        {{orderDetails}}

        <q-card v-if="orderDetails">
        	{{form.transaction_initiated_date}}
            <q-card-section>
                <div class="text-h6 text-center">View Order</div>
            </q-card-section>

            <q-card-section>            
                <div class="q-pa-md">
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
                                    v-model="form.receipt_number"
                                    :dense="dense"
                                    :readonly="readonly" 
                                    label="Receipt Number *" 
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a title']"
                                />
                            </div>

                            <div class="col-6 q-pl-sm">

                                <q-input filled v-model="form.transaction_initiated_date" :dense="dense" :readonly="readonly">
                                    <template v-slot:prepend>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                <q-date v-model="form.transaction_initiated_date" :dense="dense" :readonly="readonly"  v-close-popup mask="YYYY-MM-DD">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                                    </div>
                                                </q-date>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>



                            <div class="col-4 q-pl-sm q-pb-md">
                                <q-select 
                                    filled 
                                    v-model="form.status"
                                    :options="action" 
                                    label="Select Status *"
                                    lazy-rules
                                    :dense="dense"
                                    :readonly="readonly"
                                />
                            </div>

                            <!-- <div class="col-4 q-pl-sm">
                                <q-input
                                    ref="name"
                                    filled
                                    v-model="form.middle_name"
                                    :dense="dense"
                                    label="Middle Name *" 
                                    lazy-rules
                                />
                            </div>
                            <div class="col-4 q-pl-sm">
                                <q-input
                                    ref="name"
                                    filled
                                    v-model="form.last_name"
                                    :dense="dense"
                                    label="Last Name *" 
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a title']"
                                />
                            </div>
                            <div class="col-4 q-pl-sm">
                                <q-input
                                    ref="name"
                                    filled
                                    v-model="form.email"
                                    :dense="dense"
                                    label="Email Address *" 
                                    lazy-rules
                                />
                            </div>
                            <div class="col-4 q-pl-sm">
                                <q-input filled v-model="form.dob" label="Date of Birth *"  mask="date" :rules="['date']">
                                    <template v-slot:append>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
                                                <q-date v-model="form.dob" v-close-popup>
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                                    </div>
                                                </q-date>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-4 q-pl-sm">
                                <q-select 
                                    filled 
                                    v-model="form.sex"
                                    :options="sex" 
                                    label="Sex *"
                                    lazy-rules
                                    :dense="dense"
                                    :readonly="readonly"
                                />
                            </div>
                            <div class="col-12 q-pl-sm q-pb-md">
                                <q-input
                                    ref="name"
                                    filled
                                    v-model="form.address"
                                    :dense="dense"
                                    label="Residential Address *" 
                                    lazy-rules
                                />
                            </div>

                            <div class="col-4 q-pl-sm q-pb-md">
                                <q-select 
                                    filled 
                                    v-model="form.city_id"
                                    :options="sex" 
                                    label="City *"
                                    lazy-rules
                                    :dense="dense"
                                    :readonly="readonly"
                                />
                            </div>

                            <div class="col-4 q-pl-sm q-pb-md">
                                <q-select 
                                    filled 
                                    v-model="form.country_id"
                                    :options="sex" 
                                    label="Country *"
                                    lazy-rules
                                    :dense="dense"
                                    :readonly="readonly"
                                />
                            </div>

                            <div class="col-12">
                                <hr>
                                <b><i>Previous Company</i></b>
                                <hr>
                            </div>

                            <div class="col-4 q-pl-sm">
                                <q-select 
                                    filled 
                                    v-model="form.first_employment"
                                    :options="question" 
                                    label="First Employment *"
                                    lazy-rules
                                    :dense="dense"
                                    :readonly="readonly"
                                />
                            </div>

                            <div class="col-4 q-pl-sm" v-if="form.first_employment == 'yes'">
                                <q-input
                                    v-model="form.previous_employer_name"
                                    filled
                                    label="Previous Employer Company *"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
                                />
                            </div>

                            <div class="col-4 q-pl-sm" v-if="form.first_employment == 'yes'">
                                <q-input
                                    v-model="form.previous_employment_position"
                                    filled
                                    label="Previous Employment Position *"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
                                />
                            </div>

                            <div class="col-12">
                                <hr>
                                <b><i>Account Details</i></b>
                                <hr>
                            </div>

                            <div class="col-3 q-pl-sm">
                                <q-select 
                                    filled 
                                    v-model="form.account_details"
                                    :options="question" 
                                    label="Have a bank detail *"
                                    lazy-rules
                                    :dense="dense"
                                    :readonly="readonly"
                                />
                            </div>

                            <div class="col-3 q-pl-sm" v-if="form.account_details == 'yes'">
                                <q-input
                                    v-model="form.account_bank"
                                    filled
                                    label="Bank Name *"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
                                />
                            </div>

                            <div class="col-3 q-pl-sm" v-if="form.account_details == 'yes'">
                                <q-input
                                    v-model="form.account_name"
                                    filled
                                    label="Account Name *"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
                                />
                            </div>

                            <div class="col-3 q-pl-sm" v-if="form.account_details == 'yes'">
                                <q-input
                                    v-model="form.account_number"
                                    filled
                                    label="Account Number *"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
                                />
                            </div>

                            <div class="col-12">
                                <hr>
                                <b><i>Off Work Day</i></b>
                                <hr>
                            </div>

                            <div class="col-3 q-pl-sm">
                                <q-select 
                                    filled 
                                    v-model="form.off_day"
                                    :options="days" 
                                    label="Off Day *"
                                    lazy-rules
                                    :dense="dense"
                                    :readonly="readonly"
                                />
                            </div>

                            <div class="col-12">
                                <hr>
                                <b><i>Qualification 1</i></b>
                                <hr>
                            </div>

                            <div class="col-3 q-pl-sm">
                                <q-select 
                                    filled 
                                    v-model="form.qualification1_available"
                                    :options="question" 
                                    label="Have a Qualification *"
                                    lazy-rules
                                    :dense="dense"
                                    :readonly="readonly"
                                />
                            </div>

                            <template v-if="form.qualification1_available == 'yes'">
                                <div class="col-9 q-pl-sm">
                                    <q-input
                                        ref="name"
                                        filled
                                        v-model="form.qualification1"
                                        :dense="dense"
                                        label="Name of Institutions*" 
                                        lazy-rules
                                        :rules="[ val => val && val.length > 0 || 'Please type an input']"
                                    />
                                </div>

                                <div class="col-4 q-pt-sm q-pl-sm">
                                    <q-select 
                                        filled 
                                        v-model="form.qualification1_certificate"
                                        :options="certificate" 
                                        label="Have a Qualification *"
                                        lazy-rules
                                        :dense="dense"
                                        :readonly="readonly"
                                    />
                                </div>

                                <div class="col-4 q-pt-sm q-pl-sm">
                                    <q-input filled v-model="form.qualification1_start_date" label="Date From *"  mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
                                                    <q-date v-model="form.qualification1_start_date" v-close-popup>
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-date>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                </div>

                                <div class="col-4 q-pt-sm q-pl-sm">
                                    <q-input filled v-model="form.qualification1_end_date" label="Date To *"  mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
                                                    <q-date v-model="form.qualification1_end_date" v-close-popup>
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-date>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                </div>
                            </template>

                            <div class="col-12">
                                <hr>
                                <b><i>Qualification 2</i></b>
                                <hr>
                            </div>

                            <div class="col-3 q-pl-sm">
                                <q-select 
                                    filled 
                                    v-model="form.qualification2_available"
                                    :options="question" 
                                    label="Have a Qualification *"
                                    lazy-rules
                                    :dense="dense"
                                    :readonly="readonly"
                                />
                            </div>

                            <template v-if="form.qualification2_available == 'yes'">
                                <div class="col-9 q-pl-sm">
                                    <q-input
                                        ref="name"
                                        filled
                                        v-model="form.qualification2"
                                        :dense="dense"
                                        label="Name of Institutions*" 
                                        lazy-rules
                                        :rules="[ val => val && val.length > 0 || 'Please type an input']"
                                    />
                                </div>

                                <div class="col-4 q-pt-sm q-pl-sm">
                                    <q-select 
                                        filled 
                                        v-model="form.qualification2_certificate"
                                        :options="certificate" 
                                        label="Have a Qualification *"
                                        lazy-rules
                                        :dense="dense"
                                        :readonly="readonly"
                                    />
                                </div>

                                <div class="col-4 q-pt-sm q-pl-sm">
                                    <q-input filled v-model="form.qualification2_start_date" label="Date From *"  mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
                                                    <q-date v-model="form.qualification2_start_date" v-close-popup>
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-date>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                </div>

                                <div class="col-4 q-pt-sm q-pl-sm">
                                    <q-input filled v-model="form.qualification2_end_date" label="Date To *"  mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
                                                    <q-date v-model="form.qualification2_end_date" v-close-popup>
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-date>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                </div>
                            </template>

                            <div class="col-12">
                                <hr>
                                <b><i>Qualification 3</i></b>
                                <hr>
                            </div>

                            <div class="col-3 q-pl-sm">
                                <q-select 
                                    filled 
                                    v-model="form.qualification3_available"
                                    :options="question" 
                                    label="Have a Qualification *"
                                    lazy-rules
                                    :dense="dense"
                                    :readonly="readonly"
                                />
                            </div>

                            <template v-if="form.qualification3_available == 'yes'">
                                <div class="col-9 q-pl-sm">
                                    <q-input
                                        ref="name"
                                        filled
                                        v-model="form.qualification3"
                                        :dense="dense"
                                        label="Name of Institutions*" 
                                        lazy-rules
                                        :rules="[ val => val && val.length > 0 || 'Please type an input']"
                                    />
                                </div>

                                <div class="col-4 q-pt-sm q-pl-sm">
                                    <q-select 
                                        filled 
                                        v-model="form.qualification3_certificate"
                                        :options="certificate" 
                                        label="Have a Qualification *"
                                        lazy-rules
                                        :dense="dense"
                                        :readonly="readonly"
                                    />
                                </div>

                                <div class="col-4 q-pt-sm q-pl-sm">
                                    <q-input filled v-model="form.qualification3_start_date" label="Date From *"  mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
                                                    <q-date v-model="form.qualification3_start_date" v-close-popup>
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-date>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                </div>

                                <div class="col-4 q-pt-sm q-pl-sm">
                                    <q-input filled v-model="form.qualification3_end_date" label="Date To *"  mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
                                                    <q-date v-model="form.qualification3_end_date" v-close-popup>
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-date>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                </div>
                            </template>

                            <div class="col-12">
                                <hr>
                                <b><i>Qualification 4</i></b>
                                <hr>
                            </div>

                            <div class="col-3 q-pl-sm">
                                <q-select 
                                    filled 
                                    v-model="form.qualification4_available"
                                    :options="question" 
                                    label="Have a Qualification *"
                                    lazy-rules
                                    :dense="dense"
                                    :readonly="readonly"
                                />
                            </div>

                            <template v-if="form.qualification4_available == 'yes'">
                                <div class="col-9 q-pl-sm">
                                    <q-input
                                        ref="name"
                                        filled
                                        v-model="form.qualification4"
                                        :dense="dense"
                                        label="Name of Institutions*" 
                                        lazy-rules
                                        :rules="[ val => val && val.length > 0 || 'Please type an input']"
                                    />
                                </div>

                                <div class="col-4 q-pt-sm q-pl-sm">
                                    <q-select 
                                        filled 
                                        v-model="form.qualification4_certificate"
                                        :options="certificate" 
                                        label="Have a Qualification *"
                                        lazy-rules
                                        :dense="dense"
                                        :readonly="readonly"
                                    />
                                </div>

                                <div class="col-4 q-pt-sm q-pl-sm">
                                    <q-input filled v-model="form.qualification4_start_date" label="Date From *"  mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
                                                    <q-date v-model="form.qualification4_start_date" v-close-popup>
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-date>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                </div>

                                <div class="col-4 q-pt-sm q-pl-sm">
                                    <q-input filled v-model="form.qualification4_end_date" label="Date To *"  mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
                                                    <q-date v-model="form.qualification4_end_date" v-close-popup>
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-date>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                </div>
                            </template>

                            <div class="col-12">
                                <hr>
                                <b><i>Qualification 5</i></b>
                                <hr>
                            </div>

                            <div class="col-3 q-pl-sm">
                                <q-select 
                                    filled 
                                    v-model="form.qualification5_available"
                                    :options="question" 
                                    label="Have a Qualification *"
                                    lazy-rules
                                    :dense="dense"
                                    :readonly="readonly"
                                />
                            </div>

                            <template v-if="form.qualification5_available == 'yes'">
                                <div class="col-9 q-pl-sm">
                                    <q-input
                                        ref="name"
                                        filled
                                        v-model="form.qualification5"
                                        :dense="dense"
                                        label="Name of Institutions*" 
                                        lazy-rules
                                        :rules="[ val => val && val.length > 0 || 'Please type an input']"
                                    />
                                </div>

                                <div class="col-4 q-pt-sm q-pl-sm">
                                    <q-select 
                                        filled 
                                        v-model="form.qualification5_certificate"
                                        :options="certificate" 
                                        label="Have a Qualification *"
                                        lazy-rules
                                        :dense="dense"
                                        :readonly="readonly"
                                    />
                                </div>

                                <div class="col-4 q-pt-sm q-pl-sm">
                                    <q-input filled v-model="form.qualification5_start_date" label="Date From *"  mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
                                                    <q-date v-model="form.qualification5_start_date" v-close-popup>
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-date>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                </div>

                                <div class="col-4 q-pt-sm q-pl-sm">
                                    <q-input filled v-model="form.qualification5_end_date" label="Date To *"  mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
                                                    <q-date v-model="form.qualification5_end_date" v-close-popup>
                                                        <div class="row items-center justify-end">
                                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-date>
                                                </q-popup-proxy>
                                            </q-icon>
                                        </template>
                                    </q-input>
                                </div>
                            </template>

                            <div class="col-12">
                                <hr>
                                <b><i>Parents Details</i></b>
                                <hr>
                            </div>

                            <div class="col-6 q-pl-sm">
                                <q-input
                                    v-model="form.parent_name"
                                    filled
                                    label="Parent's Name *"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
                                />
                            </div>

                            <div class="col-6 q-pl-sm">
                                <q-input
                                    v-model="form.parent_phone"
                                    filled
                                    label="Parent's Phone *"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
                                />
                            </div>

                            <div class="col-12 q-pl-sm">
                                <q-input
                                    v-model="form.parent_address"
                                    filled
                                    label="Parent's Address *"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
                                />
                            </div>

                            <div class="col-12">
                                <hr>
                                <b><i>Referee Details</i></b>
                                <hr>
                            </div>

                            <div class="col-6 q-pl-sm">
                                <q-input
                                    v-model="form.referee_name"
                                    filled
                                    label="Referee's Name *"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
                                />
                            </div>

                            <div class="col-6 q-pl-sm">
                                <q-input
                                    v-model="form.referee_phone"
                                    filled
                                    label="Referee's Phone *"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
                                />
                            </div>

                            <div class="col-12 q-pl-sm">
                                <q-input
                                    v-model="form.referee_address"
                                    filled
                                    label="Referee's Address *"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
                                />
                            </div>

                            <div class="col-12">
                                <hr>
                                <b><i>Resumptions</i></b>
                                <hr>
                            </div> -->


                            <div class="col-12 q-pl-sm">
                                <q-card-actions align="right">
                                    Toggle to Edit Profile <q-toggle color="warning" v-model="readonly" label="Disable" />
                                </q-card-actions>  
                            </div>

                            <q-card-actions align="right" class="col-12">
                                <q-btn type="submit" unelevated color="primary" class="q-px-md" size="lg" label="Send Request" />
                            </q-card-actions>
                        </div>
                    </q-form>   
                </div>
            </q-card-section>
        </q-card>
        <div v-else unelevated>
            No Item was selected
        </div>
	</div>	
</template>



<script>

import { mapActions, mapGetters } from 'vuex'
import { date } from 'quasar'
import { Notify } from 'quasar'

export default {
	props :[
		'orderId'
	],
	components: {
    },
	data () {
		return {
            date: '',
			form:{
            	id : this.orderDetails ? this.orderDetails.id : null,
            	receipt_number : this.orderDetails ? this.orderDetails.receipt_number : null,
    //         	customer_id : null,
				// customer_plate_number_id : null,
    //         	user_operator_id : null,
    //         	cashier_id : '',
    //         	location_id : '',
    //         	address_id : null,
    //         	coupon_id : null,
    //         	vat_id : null,
    //         	address : null,
    //         	discount_id : null,
    //         	user_subscription_id : null,
    //         	is_free_wash : false,
    //         	subtotal : 0,
    //         	total : 0,
    //         	discounted_amount : 0,
    //         	free_discount : false,
    //         	action : null,
    //         	amount_paid : 0,
    //         	currency_id : null,
    //         	payment_method : 'not_paid',
    //         	payment_gateway : null,
    //         	payment_gateway_charged_percentage : null,
    //         	payment_gateway_expected_charged_percentage : null,
    //         	payment_reference : null,
    //         	payment_gateway_charge : null,
    //         	payment_gateway_remittance : null,
    //         	platform_initiated : null,
    //         	payment_code : null,
    //         	payment_message : null,
    //         	payment_status : 'pending',
            	transaction_initiated_date : this.orderDetails ? this.orderDetails.transaction_initiated : null,
    //         	transaction_initiated_time : null,
    //         	date_cancelled : null,
    //         	date_time_paid : null,
    //         	reason : null,
    //         	home_service_booking_date : null,
    //         	home_service_booking_time : null,
    //         	served_location_id : null,
    //         	service_status : null,
            	status : 'pending'
            },

            action :[
            	'pending',
            	'complete',
            	'delete',
            	'edit',
            ],

            method :[
            	'cash',
            	'pos',
            ],

            dense: false,
            readonly: true,
            filterModel: '',
            createModelType: false,
            editModelType: false,
            expenseDetails: null,
		}
	},
	computed: {
        ...mapGetters({
            orderDetails: 'webAdminOrders/orderDetails',
        }),
    },

	methods:{
		...mapActions({
			gatewayResponse: 'orders/paymentProcess',
			payNowAtLocation: 'orders/payAtLocation',
			deleteOrder: 'webAdminOrders/deleteOrder',
            getOrderId: 'webAdminOrders/getOrderId',
			updateOrder: 'webAdminOrders/updateOrder',
		}),

        optionsFn (mon) {
            var today = new Date();
            var bu = today.getDate();
            
            console.log(new Date())
            var timeStamp = Date.now()
            var formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')
            return mon >= formattedString
        },

	    time(){
	    	var today = new Date();
	    	var time = today.getHours() + ":" + today.getMinutes() + ":" + 
        	today.getSeconds();
        	return time
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

        submitRequest(){ 

            this.form.transaction_initiated_date = (date.formatDate(this.form.transaction_initiated_date, 'YYYY-MM-DD'))
            this.updateOrder(this.form).then((res) => {
                this.positiveNotification('Resource has been created')
            }).catch((error) => {
                this.errorMessages = error
                console.log(this.errorMessages)
                if(this.errorMessages){
                    this.negativeNotification(this.errorMessages)
                }
            })      
        },
	},

    mounted(){
    	if(this.orderDetails){
            // alert(this.orderDetails.vehicle.plateNumber)
            // 
            // 
    		this.form.id = this.orderDetails.id
    		this.form.receipt_number = this.orderDetails.receipt_number
    		// this.form.customer_id = this.orderDetails.customer_id
    		// this.form.customer_plate_number_id = this.orderDetails.customer_plate_number_id
    		// this.form.user_operator_id = this.orderDetails.user_operator_id
    		// this.form.cashier_id = this.orderDetails.cashier_id
    		// this.form.location_id = this.orderDetails.location_id
    		// this.form.address_id = this.orderDetails.address_id
    		// this.form.coupon_id = this.orderDetails.coupon_id
    		// this.form.vat_id = this.orderDetails.vat_id
    		// this.form.address = this.orderDetails.address
    		// this.form.discount_id = this.orderDetails.discount_id
    		// this.form.user_subscription_id = this.orderDetails.user_subscription_id
    		// this.form.is_free_wash = this.orderDetails.is_free_wash
    		// this.form.subtotal = this.orderDetails.subtotal
    		// this.form.total = this.orderDetails.total
    		// this.form.discounted_amount = this.orderDetails.discounted_amount
    		// this.form.free_discount = this.orderDetails.free_discount
    		// this.form.action = this.orderDetails.action
    		// this.form.amount_paid = this.orderDetails.amount_paid
    		// this.form.currency_id = this.orderDetails.currency_id
    		// this.form.payment_method = this.orderDetails.payment_method
    		// this.form.payment_gateway = this.orderDetails.payment_gateway
    		// this.form.payment_gateway_charged_percentage = this.orderDetails.payment_gateway_charged_percentage
    		// this.form.payment_gateway_expected_charged_percentage = this.orderDetails.payment_gateway_expected_charged_percentage
    		// this.form.payment_reference = this.orderDetails.payment_reference
    		// this.form.payment_gateway_charge = this.orderDetails.payment_gateway_charge
    		// this.form.payment_gateway_remittance = this.orderDetails.payment_gateway_remittance
    		// this.form.platform_initiated = this.orderDetails.platform_initiated
    		// this.form.payment_code = this.orderDetails.payment_code
    		// this.form.payment_message = this.orderDetails.payment_message
    		// this.form.payment_status = this.orderDetails.payment_status
    		this.form.transaction_initiated_date = this.orderDetails.transaction_initiated
    		// this.form.transaction_initiated_time = this.orderDetails.transaction_initiated_time
    		// this.form.date_cancelled = this.orderDetails.date_cancelled
    		// this.form.date_time_paid = this.orderDetails.date_time_paid
    		// this.form.reason = this.orderDetails.reason
    		// this.form.home_service_booking_date = this.orderDetails.home_service_booking_date
    		// this.form.home_service_booking_time = this.orderDetails.home_service_booking_time
    		// this.form.served_location_id = this.orderDetails.served_location_id
    		// this.form.service_status = this.orderDetails.service_status
    		this.form.status = this.orderDetails.status
    	}
    },
}
</script>

<!-- { "id": 3253, "status": "complete", "receipt_number": "LAMM0300v00101601", "vehicle": { "id": 8148, "plateNumber": "LSD449DQ", "vehicleType": "SALOON CAR", "vehicleModel": "Toyota", "firstName": "NULL", "lastName": "NULL", "userId": 74188, "phone": null, "email": null, "freeWash": null, "vehicleWashes": 1, "vehicleFreeWash": false, "washes": 1 }, "packages": 1, "home_service_booking_time": null, "home_service_booking_date": null, "address": null, "sub_total": 1000, "total": 1000, "action": null, "customer": { "id": 74188, "firstName": "NULL", "lastName": "NULL", "email": null, "username": null, "phone": null, "sex": null, "dob": null, "role": "user", "freeWash": false, "washes": 959 }, "location": { "id": 3, "origin_head_office": 0, "name": "LAMM03", "code": "LAMM03", "short_name": "Maryland Mall, Anthony, Lagos", "email": null, "phone": null, "web": null, "address": "Maryland Mall Anthony Lagos, 350-360 Ikorodu Rd, Anthony, Lagos", "camera_config": "1", "franchise": 0, "head": 0, "parent_id": 1, "city_id": null, "state_id": null, "country_id": null, "manager_id": null, "overseer": null, "created_at": "2020-05-19 13:31:26", "updated_at": "2020-05-19 13:31:26", "type": "location-wash", "currency_id": null, "deleted_at": null }, "locationId": 3, "cashier": "benny", "cashierId": 74189, "payment_status": "pending", "free": false, "customerNextWashIsFree": 0, "customerWashes": 0, "vehicleWashes": 1, "payment_method": "cash", "discount": "0.00", "discountDetails": null, "discountCoupon": null, "products": [ { "id": 1, "vehicle": "SALOON CAR", "package": "BASIC PACKAGE (Basic wash)", "venue": "parkit-location", "amount": "1000.00", "quantity": 1, "total": 1000 } ], "transaction_initiated": "2020-09-24", "date": "2020-09-24", "time": "11:49:14", "created_at": "2020-09-24" } -->