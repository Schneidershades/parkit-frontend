<template>
    <div class="q-pa-md">
        <div class="q-gutter-y-md q-pb-md">
            <q-btn-group push class="q-mr-sm" align="right">
                <q-btn color="green" label="Back to Employees" to="/web/admin/employees"/>
            </q-btn-group>
            <q-btn-group push class="q-mr-sm" align="right">
                <q-btn color="blue" label="Loans & Outstanding" to="/web/admin/employees/loans-and-outstanding"/>
            </q-btn-group>

            <q-btn-group push class="q-mr-sm" align="right">
                <q-btn color="red" label="Penalties & Deducations" to="/web/admin/employees/penalties-and-deductions"/>
            </q-btn-group>
            <br>
        </div>

        <q-card v-if="selectedEmployee">

            <q-card-section>
                <div class="text-h6 text-center">View Employee</div>
            </q-card-section>

            <q-card-section>            
                <div class="q-pa-md">
                    <q-form
                        @submit="submitRequest"
                        class="q-gutter-md"
                        ref="form"
                    >
                        <div class="row">
                            <div class="col-4 q-pl-sm">
                                <q-input
                                    ref="name"
                                    filled
                                    v-model="form.first_name"
                                    :dense="dense"
                                    label="First Name *" 
                                    lazy-rules
                                    :readonly="readonly"
                                    :rules="[ val => val && val.length > 0 || 'Please type a title']"
                                />
                            </div>
                            <div class="col-4 q-pl-sm">
                                <q-input
                                    ref="name"
                                    filled
                                    v-model="form.middle_name"
                                    :dense="dense"
                                    :readonly="readonly"
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
                                    :readonly="readonly"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a title']"
                                />
                            </div>
                            <div class="col-3 q-pl-sm">
                                <q-input
                                    ref="name"
                                    filled
                                    v-model="form.email"
                                    :dense="dense"
                                    label="Email Address *" 
                                    :readonly="readonly"
                                    lazy-rules
                                />
                            </div>
                            <div class="col-3 q-pl-sm">
                                <q-input
                                    ref="name"
                                    filled
                                    v-model="form.phone"
                                    :readonly="readonly"
                                    :dense="dense"
                                    label="Phone *" 
                                    lazy-rules
                                />
                            </div>
                            <div class="col-3 q-pl-sm">
                                <q-input filled v-model="form.dob" :readonly="readonly" label="Date of Birth *"  mask="date" :rules="['date']">
                                    <template v-slot:append>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
                                                <q-date v-model="form.dob" :readonly="readonly" v-close-popup>
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                                    </div>
                                                </q-date>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-3 q-pl-sm">
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
                                    :readonly="readonly"
                                    :dense="dense"
                                    label="Residential Address *" 
                                    lazy-rules
                                />
                            </div>

                            <!-- <div class="col-4 q-pl-sm q-pb-md">
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
                                    v-model="form.state_id"
                                    :options="sex" 
                                    label="State *"
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
                            </div> -->

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
                                    :readonly="readonly"
                                    filled
                                    label="Previous Employer Company *"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
                                />
                            </div>

                            <div class="col-4 q-pl-sm" v-if="form.first_employment == 'yes'">
                                <q-input
                                    v-model="form.previous_employment_position"
                                    :readonly="readonly"
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
                                    :readonly="readonly"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
                                />
                            </div>

                            <div class="col-3 q-pl-sm" v-if="form.account_details == 'yes'">
                                <q-input
                                    v-model="form.account_name"
                                    filled
                                    label="Account Name *"
                                    :readonly="readonly"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
                                />
                            </div>

                            <div class="col-3 q-pl-sm" v-if="form.account_details == 'yes'">
                                <q-input
                                    v-model="form.account_number"
                                    :readonly="readonly"
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

                            <div class="col-12 q-pl-sm">
                                <q-toggle v-model="form.monday" checked-icon="check" unchecked-icon="clear" color="green"  label="Monday"/>
                                <q-toggle v-model="form.tuesday" checked-icon="check" unchecked-icon="clear" color="green"  label="Tuesday"/>
                                <q-toggle v-model="form.wednesday" checked-icon="check" unchecked-icon="clear" color="green"  label="Wednesday"/>
                                <q-toggle v-model="form.thursday" checked-icon="check" unchecked-icon="clear" color="green"  label="Thursday"/>
                                <q-toggle v-model="form.friday" checked-icon="check" unchecked-icon="clear" color="green"  label="Friday"/>
                                <q-toggle v-model="form.saturday" checked-icon="check" unchecked-icon="clear" color="green"  label="Saturday"/>
                                <q-toggle v-model="form.sunday" checked-icon="check" unchecked-icon="clear" color="green"  label="Sunday"/>
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
                                        :readonly="readonly" 
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
                                    <q-input filled :readonly="readonly" v-model="form.qualification1_start_date" label="Date From *"  mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
                                                    <q-date :readonly="readonly" v-model="form.qualification1_start_date" v-close-popup>
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
                                    <q-input filled :readonly="readonly" v-model="form.qualification1_end_date" label="Date To *"  mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
                                                    <q-date :readonly="readonly" v-model="form.qualification1_end_date" v-close-popup>
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
                                        :readonly="readonly"
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
                                    <q-input filled :readonly="readonly" v-model="form.qualification2_start_date" label="Date From *"  mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
                                                    <q-date :readonly="readonly"  v-model="form.qualification2_start_date" v-close-popup>
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
                                    <q-input filled :readonly="readonly" v-model="form.qualification2_end_date" label="Date To *"  mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
                                                    <q-date :readonly="readonly" v-model="form.qualification2_end_date" v-close-popup>
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
                                    <q-input filled :readonly="readonly" v-model="form.qualification3_start_date" label="Date From *"  mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
                                                    <q-date :readonly="readonly" v-model="form.qualification3_start_date" v-close-popup>
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
                                    <q-input filled :readonly="readonly" v-model="form.qualification3_end_date" label="Date To *"  mask="date" :rules="['date']">
                                        <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
                                                    <q-date :readonly="readonly" v-model="form.qualification3_end_date" v-close-popup>
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
                                    <q-input filled :readonly="readonly" v-model="form.qualification4_start_date" label="Date From *"  mask="date" :rules="['date']">
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
                                    <q-input filled :readonly="readonly" v-model="form.qualification4_end_date" label="Date To *"  mask="date" :rules="['date']">
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
                                    <q-input filled :readonly="readonly" v-model="form.qualification5_start_date" label="Date From *"  mask="date" :rules="['date']">
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
                                    <q-input filled :readonly="readonly" v-model="form.qualification5_end_date" label="Date To *"  mask="date" :rules="['date']">
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
                                    :readonly="readonly"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
                                />
                            </div>

                            <div class="col-6 q-pl-sm">
                                <q-input
                                    v-model="form.parent_phone"
                                    filled
                                    label="Parent's Phone *"
                                    :readonly="readonly"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
                                />
                            </div>

                            <div class="col-12 q-pl-sm">
                                <q-input
                                    v-model="form.parent_address"
                                    filled
                                    label="Parent's Address *"
                                    :readonly="readonly"
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
                                    :readonly="readonly"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
                                />
                            </div>

                            <div class="col-6 q-pl-sm">
                                <q-input
                                    v-model="form.referee_phone"
                                    filled
                                    label="Referee's Phone *"
                                    :readonly="readonly"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
                                />
                            </div>

                            <div class="col-12 q-pl-sm">
                                <q-input
                                    v-model="form.referee_address"
                                    filled
                                    label="Referee's Address *"
                                    :readonly="readonly"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Please type a description']"
                                />
                            </div>

                            <div class="col-12">
                                <hr>
                                <b><i>Resumptions</i></b>
                                <hr>
                            </div>

                            <div class="col-3 q-pl-sm">
                                <q-input filled v-model="form.resumption_start_date" label="Date of Resumption *"  mask="date" :rules="['date']">
                                    <template v-slot:append>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
                                                <q-date v-model="form.resumption_start_date" :readonly="readonly" :dense="dense">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                                    </div>
                                                </q-date>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                            </div>

                            <div class="col-3 q-pl-sm">
                                <q-select 
                                    filled 
                                    v-model="form.position"
                                    :options="position" 
                                    label="Position *"
                                    :dense="dense"
                                    lazy-rules
                                    :readonly="readonly"
                                />
                            </div>

                            <div class="col-3 q-pl-sm" v-if="$can('create', 'salaries')">
                                <q-input
                                    v-model="form.salary"
                                    filled
                                    :dense="dense"
                                    :readonly="readonly"
                                    type="number"
                                    min="10000"
                                    label="Salary Payment *"
                                    lazy-rules
                                />
                            </div>
                            <div class="col-3" v-if="user.location.code == 'PARKIT PARENT' && selectedEmployee.location_id==null">

                                <q-select
                                filled 
                                label="Select Location *"
                                lazy-rules
                                v-model="form.location_id"
                                :readonly="readonly"
                                :dense="dense" 
                                :options="locations" 
                                :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
                                :option-label="opt => Object(opt) === opt && 'id' in opt ? opt.locationName : null"
                                :option-disable="opt => Object(opt) === opt ? opt.inactive === true : true"
                                emit-value
                                map-options
                                :rules="[ val => val && val.length == null || 'Please select a location']" />
                            </div>

                            <div class="col-12 q-pl-sm" v-if="$can('edit', 'employees')">
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
    import { Notify } from 'quasar'
	import { date } from 'quasar'
    const isOnline = require('is-online');

    export default{
        data(){
            return{
            	date: '',
                form: {
                    staffable_id : '',
                    staffable_type : '',
                    first_name: '',
                    last_name: '',
                    middle_name: '',
                    email : '',
                    sex: '',
                    dob: '',
                    address: '',
                    city_id: '',
                    state_id: '',
                    country_id: '',
                    position: '',
                    first_employment: '',
                    previous_employer_name: '',
                    previous_employment_position: '',
                    account_details: '',
                    account_bank: '',
                    account_name: '',
                    account_number: '',
                    off_day: '',


                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false,
                    sunday: false,

                    extra_qualification1: '',
                    extra_qualification2: '',
                    extra_qualification3: '',
                    extra_qualification4: '',
                    extra_qualification5: '',

                    qualification1_available: '',
                    qualification1: '',
                    qualification1_certificate: '',
                    qualification1_start_date: '',
                    qualification1_end_date: '',

                    qualification2_available: '',
                    qualification2: '',
                    qualification2_certificate: '',
                    qualification2_start_date: '',
                    qualification2_end_date: '',

                    qualification3_available: '',
                    qualification3: '',
                    qualification3_certificate: '',
                    qualification3_start_date: '',
                    qualification3_end_date: '',

                    qualification4_available: '',
                    qualification4: '',
                    qualification4_certificate: '',
                    qualification4_start_date: '',
                    qualification4_end_date: '',

                    qualification5_available: '',
                    qualification5: '',
                    qualification5_certificate: '',
                    qualification5_start_date: '',
                    qualification5_end_date: '',

                    parent_name: '',
                    parent_address: '',
                    parent_phone: '',

                    referee_name: '',
                    referee_address: '',
                    referee_phone: '',

                    location_id: '',
                    confirmed: '',
                    status: '',
                    resumption_start_date: '',
                    salary: '',
                },

                dense: false,
                readonly: true,
                filterModel: '',
                createModelType: false,
                editModelType: false,
                expenseDetails: null,
				separator: 'cell',

				pagination: {
			        rowsPerPage: 30,
			        page: 1
			    },

                columns: [
			       {
			          name: 'created_at',
			          align: 'left',
			          label: 'Created',
			          field: 'created_at',
			          sortable: true
			       },
			       {
			          name: 'account_classification',
			          align: 'left',
			          label: 'Class(s)',
			          field: 'account_classification',
			          sortable: true
			       },
			       {
			          name: 'quantity',
			          align: 'left',
			          label: 'Quantity',
			          field: 'quantity',
			          sortable: true
			       },
			       {
			          name: 'amount',
			          align: 'left',
			          label: 'Amount',
			          field: 'amount',
			          sortable: true
			       },
			       {
			          name: 'total',
			          align: 'left',
			          label: 'Total',
			          field: 'total',
			          sortable: true
			       },
			       {
			          name: 'user',
			          align: 'left',
			          label: 'User(s)',
			          field: 'user',
			          sortable: true
			       },
			       {
			          name: 'reminder_count',
			          align: 'left',
			          label: 'Notice(s)',
			          field: 'reminder_count',
			          sortable: true
			       },
			       {
			          name: 'status',
			          align: 'left',
			          label: 'Status',
			          field: 'status',
			          sortable: true
			       },
			       {
			          name: 'actions',
			          align: 'left',
			          label: 'Action(s)',
			          field: 'actions',
			          sortable: true
			       },
			    ],

			    sex: [
                    'Male', 
                    'Female', 
                ],

                certificate: [
                    'SSCE', 
                    'B.Sc', 
                    'OND', 
                    'HND', 
                    'MSC', 
                    'Others', 
                ],

                position: [
                    'Parkit Pro (PP)', 
                    'Head Parkit Pro (HPP)', 
                    'Front Desk Pro (FD)', 
                    'Manager (MG)', 
                    'Head of Operation (HOP)', 
                    'Assistant Head of Operation (AHOP)', 
                    'Facility Manager (FM)', 
                    'Technical Assistant (FM)', 
                ],

                question: [
                    'yes', 
                    'no', 
                ],
                days: [
                    'Sunday', 
                    'Monday', 
                    'Tuesday', 
                    'Wednesday', 
                    'Thursday', 
                    'Friday', 
                    'Saturday', 
                    'Sunday',
                ],
            }
        },

        computed: {
            ...mapGetters({
		        user: 'auth/user',
                message: 'message',
                errorMessage: 'errorMessage',
                newPhoneNumber: 'auth/phone',
                online: 'auth/onlineStatus',
              	employees: 'employees/employees',
                selectedEmployee: 'employees/selectedEmployee',
                locations: 'locationSettings/locations',
            }),

            total_amount(){
            	return this.form.amount * this.form.quantity
            }
        },
            
        methods:{
            ...mapActions({
              	updateEmployee: 'employees/updateEmployee',
                connected: 'internetStatus/setConnection',
                getLocations: 'locationSettings/getLocations',
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
                        	
                            this.updateEmployee(this.form).then((res) => {
			                    this.positiveNotification('Resource has been created')
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

            viewDetails(item){
            	this.editModelType = true

            	this.expenseDetails = item
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

            optionsFn () {
	     		var today = new Date();
	  			var bu = today.getDate();
		      	
	     		console.log(new Date())
	     		var timeStamp = Date.now()
				var formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')
				return formattedString
		    },

		    time(){
		    	var today = new Date();
		    	var time = today.getHours() + ":" + today.getMinutes() + ":" + 
            	today.getSeconds();
            	return time
		    },
        },

        mounted(){
            if(this.user.location.code == "PARKIT PARENT"){
                this.getLocations()
            }

            if(this.selectedEmployee){
                
                this.form.id  = this.selectedEmployee.id
                this.form.staffable_id  = this.selectedEmployee.staffable_id
                this.form.staffable_type  = this.selectedEmployee.staffable_type
                this.form.first_name = this.selectedEmployee.first_name
                this.form.last_name = this.selectedEmployee.last_name
                this.form.middle_name = this.selectedEmployee.middle_name
                this.form.email  = this.selectedEmployee.email
                this.form.sex = this.selectedEmployee.sex
                this.form.dob = this.selectedEmployee.dob
                this.form.address = this.selectedEmployee.address
                this.form.city_id = this.selectedEmployee.city_id
                this.form.state_id = this.selectedEmployee.state_id
                this.form.country_id = this.selectedEmployee.country_id
                this.form.position = this.selectedEmployee.position
                this.form.first_employment = this.selectedEmployee.first_employment
                this.form.previous_employer_name = this.selectedEmployee.previous_employer_name
                this.form.previous_employment_position = this.selectedEmployee.previous_employment_position
                this.form.account_details = this.selectedEmployee.account_details
                this.form.account_bank = this.selectedEmployee.account_bank
                this.form.account_name = this.selectedEmployee.account_name
                this.form.account_number = this.selectedEmployee.account_number
                this.form.off_day = this.selectedEmployee.off_day

                this.form.qualification1_available = this.selectedEmployee.qualification1_available
                this.form.qualification1 = this.selectedEmployee.qualification1
                this.form.qualification1_certificate = this.selectedEmployee.qualification1_certificate
                this.form.qualification1_start_date = this.selectedEmployee.qualification1_start_date
                this.form.qualification1_end_date = this.selectedEmployee.qualification1_end_date

                this.form.qualification2_available = this.selectedEmployee.qualification2_available
                this.form.qualification2 = this.selectedEmployee.qualification2
                this.form.qualification2_certificate = this.selectedEmployee.qualification2_certificate
                this.form.qualification2_start_date = this.selectedEmployee.qualification2_start_date
                this.form.qualification2_end_date = this.selectedEmployee.qualification2_end_date

                this.form.qualification3_available = this.selectedEmployee.qualification3_available
                this.form.qualification3 = this.selectedEmployee.qualification3
                this.form.qualification3_certificate = this.selectedEmployee.qualification3_certificate
                this.form.qualification3_start_date = this.selectedEmployee.qualification3_start_date
                this.form.qualification3_end_date = this.selectedEmployee.qualification3_end_date

                this.form.qualification4_available = this.selectedEmployee.qualification4_available
                this.form.qualification4 = this.selectedEmployee.qualification4
                this.form.qualification4_certificate = this.selectedEmployee.qualification4_certificate
                this.form.qualification4_start_date = this.selectedEmployee.qualification4_start_date
                this.form.qualification4_end_date = this.selectedEmployee.qualification4_end_date

                this.form.qualification5_available = this.selectedEmployee.qualification5_available
                this.form.qualification5 = this.selectedEmployee.qualification5
                this.form.qualification5_certificate = this.selectedEmployee.qualification5_certificate
                this.form.qualification5_start_date = this.selectedEmployee.qualification5_start_date
                this.form.qualification5_end_date = this.selectedEmployee.qualification5_end_date

                this.form.parent_name = this.selectedEmployee.parent_name
                this.form.parent_address = this.selectedEmployee.parent_address
                this.form.parent_phone = this.selectedEmployee.parent_phone

                this.form.referee_name = this.selectedEmployee.referee_name
                this.form.referee_address = this.selectedEmployee.referee_address
                this.form.referee_phone = this.selectedEmployee.referee_phone

                this.form.location_id = this.selectedEmployee.location_id
                this.form.confirmed = this.selectedEmployee.confirmed
                this.form.status = this.selectedEmployee.status
                this.form.resumption_start_date = this.selectedEmployee.resumption_start_date
                this.form.salary = this.selectedEmployee.salary
                this.form.position = this.selectedEmployee.position
                this.form.user_id = this.user.id
                this.form.location_id = this.user.location.id


                this.form.monday = this.selectedEmployee.monday
                this.form.tuesday = this.selectedEmployee.tuesday
                this.form.wednesday = this.selectedEmployee.wednesday
                this.form.thursday = this.selectedEmployee.thursday
                this.form.friday = this.selectedEmployee.friday
                this.form.saturday = this.selectedEmployee.saturday
                this.form.sunday = this.selectedEmployee.sunday


                this.form.extra_qualification1 = this.selectedEmployee.extra_qualification1
                this.form.extra_qualification2 = this.selectedEmployee.extra_qualification2
                this.form.extra_qualification3 = this.selectedEmployee.extra_qualification3
                this.form.extra_qualification4 = this.selectedEmployee.extra_qualification4
                this.form.extra_qualification5 = this.selectedEmployee.extra_qualification5
            }

            // if(this.user.location.code != ""){
            //     this.form.user_id = this.user.id
            //     this.form.location_id = this.user.location.id
            // }
        }
    }
</script>