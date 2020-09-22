<template>
	<q-page padding>
	    <div class="q-pa-md q-gutter-sm">
	      <q-breadcrumbs>
	        <q-breadcrumbs-el label="Home" />
	        <q-breadcrumbs-el label="Location" />
	      </q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
		    <div class="q-gutter-y-md">
		      	<q-btn-group push class="q-p-md" align="right">
			      	<!-- <q-btn push @click="postIncome(location)" label="New User"/> -->
			    </q-btn-group>
		      	<!-- {{locationUsers}} -->
		        <q-table
				    title="All Location Users"
			      	:data="locationUsers"
			      	:columns="columns"
			      	row-key="username"
		      		:filter="filterUsers"
				    >
				    <template v-slot:top-right>
				        <q-input borderless dense debounce="300" v-model="filterUsers" placeholder="Search">
				          <template v-slot:append>
				            <q-icon name="search" v-model="filterUsers"/>
				          </template>
				        </q-input>
			      	</template>
				    <template slot="body" slot-scope="props">
				      	<q-tr :props="props">
				      		<q-td key="username" :props="props">{{props.row.username}}</q-td>
				      		<q-td key="email" :props="props">{{ props.row.email }}</q-td>
				      		<q-td key="role" :props="props">{{ props.row.role ?  props.row.role : 'No Role' }}</q-td>
				      		<q-td key="action" :props="props">
				      			<q-btn color="warning"  label="View"  @click="viewTransaction(props.row)"/>
				      			<q-btn color="warning"  label="Edit"  @click="viewTransaction(props.row)"/>
				      			<q-btn color="warning"  label="Permission"  @click="viewTransaction(props.row)"/>
				      		</q-td>
				      	</q-tr>
				    </template>
			    </q-table>

		    </div>
	    </div>
	</q-page>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { Notify } from 'quasar'

export default {
	props :[
		'locationId'
	],
	data () {
		return {
      		filterUsers: '',
      		fixedIncomeDialog: false,
      		fixedExpenseDialog: false,
      		seeTransaction: false,
			pagination: {
		        rowsPerPage: 1
		    },

		    text: '',
		    columns: [
		       {
		          name: 'username',
		          align: 'left',
		          label: 'Username',
		          field: 'username',
		          sortable: true
		       },
		       {
		          name: 'email',
		          align: 'left',
		          label: 'Email',
		          field: 'email',
		          sortable: true
		       },
		       {
		          name: 'role',
		          align: 'left',
		          label: 'Role',
		          field: 'role',
		          sortable: true
		       },
		       {
		          name: 'action',
		          align: 'left',
		          label: 'Action',
		          field: 'action',
		       }
		    ],
		}
	},
	computed: {
        ...mapGetters({
            location: 'accountLocation/accountLocationDetails',
            transactions: 'accountLocation/accountLocationTransactions',
          	user: 'auth/user',
          	transactionId: 'accountLocation/accountLocationTransactionSelected',
          	locationUsers: 'users/locationUsers',
        }),
    },

	methods:{

		...mapActions({
        	getAccountLocationDetails: 'accountLocation/getAccountLocationDetails',
	        sendLocationsDetails: 'accountLocation/setAccountLocationSelected',
            getAccountLocationTransactions: 'accountLocation/getAccountLocationTransactions',
            sendAccountLocationTransactionSelected: 'accountLocation/sendAccountLocationTransactionSelected',
            deleteAccountLocationTransactionSelected: 'accountLocation/deleteAccountLocationTransactionSelected',
        	getClassifications: 'accountClassification/getAccountClassification',
        	getLocationUsers: 'users/getLocationUsers',
	    }),	

		postExpense(location){
						   
		},
		postIncome(location){

		},

		viewTransaction(location){
			
		},


		deleteTransaction(locationId){
			
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
	mounted()
	{
		if(this.$route.params.locationId != null){
			// this.getAccountLocationTransactions(this.$route.params.locationId)
			// this.getAccountLocationDetails(this.$route.params.locationId)
			this.getLocationUsers(this.$route.params.locationId)
		}else{
			return this.$router.push({ path: `web/admin/users` })  
		}		
	}
}
</script>