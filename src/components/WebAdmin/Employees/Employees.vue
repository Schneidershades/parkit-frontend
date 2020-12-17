<template>
	<div class="ni">
	    <div class="q-gutter-y-md">
	    	<BackButton/>
		    <div class="row" v-if="locations">  
		    	<template v-if="locations">

		    		<q-card class="q-ma-sm my-card bg-primary text-white">
		    			<q-card-section>
		    				<div class="text-h6">All Staff</div>
		    				<div class="text-subtitle2">All Locations</div>
		    			</q-card-section>

		    			<!-- <q-card-section>
		    				<p >Users: {{locate.numberOfUsers}}</p>
		    			</q-card-section> -->

		    			<q-separator dark />

		    			<q-card-actions>
		    				<q-btn flat to="/web/admin/all-employees">View Staff in Location</q-btn>
		    			</q-card-actions>
		    		</q-card>

		    		<q-card v-for="locate in locations" :key="locate.id" class="q-ma-sm my-card bg-primary text-white">
		    			<q-card-section>
		    				<div class="text-h6">{{locate.code}}</div>
		    				<div class="text-subtitle2">{{locate.locationName}}</div>
		    			</q-card-section>

		    			<!-- <q-card-section>
		    				<p >Users: {{locate.numberOfUsers}}</p>
		    			</q-card-section> -->

		    			<q-separator dark />

		    			<q-card-actions>
		    				<q-btn flat @click="viewLocation(locate.id)">View Staff in Location</q-btn>
		    			</q-card-actions>
		    		</q-card>
		    	</template>

		    </div>
	    </div>
    </div>
</template>


<script>
    
    import { mapActions, mapGetters } from 'vuex'
    import { Notify } from 'quasar'
	import { date } from 'quasar'
    const isOnline = require('is-online');


    import BackButton from 'components/Share/BackButton.vue'

	export default {
		components: {
			BackButton
		},
        data(){
            return{
                dense: false,
                readonly: false,
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
			          name: 'identifier',
			          align: 'left',
			          label: 'identifier',
			          field: 'identifier',
			          sortable: true
			       },
			       {
			          name: 'name',
			          align: 'left',
			          label: 'Name(s)',
			          field: 'name',
			          sortable: true
			       },
			       {
			          name: 'sex',
			          align: 'left',
			          label: 'Sex',
			          field: 'sex',
			          sortable: true
			       },
			       {
			          name: 'phone',
			          align: 'left',
			          label: 'Phone',
			          field: 'phone',
			          sortable: true
			       },
			       {
			          name: 'location',
			          align: 'left',
			          label: 'Location',
			          field: 'location',
			          sortable: true
			       },
			       {
			          name: 'action',
			          align: 'left',
			          label: 'Action(s)',
			          field: 'action',
			          sortable: true
			       },
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
          		locations: 'locationSettings/locations',
            }),
        },
            
        methods:{
            ...mapActions({
              	getEmployees: 'employees/getAllEmployees',
              	selectEmployee: 'employees/selectEmployee',
              	sendLocation: 'employees/sendLocation',
                connected: 'internetStatus/setConnection',
        		getLocations: 'locationSettings/getLocations',
            }),

            viewLocation(item){
            	this.sendLocation(item).then((res) => {
            		return this.$router.push({ path: `/web/admin/employees/location/${item}` }) 
                }) 
            },

            viewModel(item){
            	this.selectEmployee(item).then((res) => {
         			return this.$router.push({ path: `/web/admin/employees/view` })  
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
        },

        mounted(){
        	// let x = process.env
        	// console(x)
    		console.log(this.getEmployees())
    		this.getLocations()
        }
    }
</script>