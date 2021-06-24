<template>
	<div class="ni">
	    <div class="q-gutter-y-md">
	    	
        	<BackButton/>

	        <q-table
			    title="Employees"
		      	:data="employees"
		      	:columns="columns"
		      	row-key="name"
	      		:filter="filterModel"
		    	:pagination.sync="pagination"
			    >
			    <template v-slot:top-right>
			        <q-input borderless dense debounce="300" v-model="filterModel" placeholder="Search">
			          <template v-slot:append>
			            <q-icon name="search" v-model="filterModel"/>
			          </template>
			        </q-input>
		      	</template>
			    <template slot="body" slot-scope="props">
			      	<q-tr :props="props">
			      		<q-td key="identifier" :props="props">{{props.row.identifier ? props.row.identifier : 'N/A'}}</q-td>
			      		<q-td key="name" :props="props">{{props.row.first_name}} {{props.row.middle_name}} {{props.row.last_name}}</q-td>
			      		<q-td key="sex" :props="props">{{ props.row.sex }}</q-td>
			      		<q-td key="phone" :props="props">{{ props.row.phone ? props.row.phone : 'N/A'}}</q-td>
			      		<q-td key="location" :props="props">{{ props.row.location ? props.row.location.code : 'N/A'}}</q-td>
			      		<q-td key="action" :props="props">
			      			<q-btn color="orange" unelevated icon="preview" @click="viewModel(props.row)"/>
			      		</q-td>
			      	</q-tr>
			    </template>
		    </q-table>
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
            }),
        },
            
        methods:{
            ...mapActions({
              	getEmployees: 'employees/getAllEmployees',
              	selectEmployee: 'employees/selectEmployee',
                connected: 'internetStatus/setConnection',
            }),

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
    		console.log(this.getEmployees())
        }
    }
</script>