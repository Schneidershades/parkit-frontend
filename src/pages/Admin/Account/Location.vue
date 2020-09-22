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
			      	<q-btn v-if="user.location.code == 'PARKIT PARENT'" push @click="postIncome(location)" label="Post Income Transaction"/>
			      	<q-btn push @click="postExpense(location)" label="Post Expense Transaction"/>
			    </q-btn-group>
		      	<!-- {{location}} -->
		      	<!-- {{locationId}} -->
		      	<!-- {{user.location.code}} -->
		      	<!-- {{transactions}} -->
		        <q-table
				    title="All Expense Transactions"
			      	:data="transactions"
			      	:columns="columns"
			      	row-key="name"
		      		:filter="filterExpense"
				    >
				    <template v-slot:top-right>
				        <q-input borderless dense debounce="300" v-model="filterExpense" placeholder="Search">
				          <template v-slot:append>
				            <q-icon name="search" v-model="filterExpense"/>
				          </template>
				        </q-input>
			      	</template>
				    <template slot="body" slot-scope="props">
				      	<q-tr :props="props">
				      		<q-td key="id" :props="props">{{props.row.id}}</q-td>
				      		<q-td key="type" :props="props">{{ props.row.type }}</q-td>
				      		<q-td key="title" :props="props">{{ props.row.title }}</q-td>
				      		<q-td key="class" :props="props">{{ props.row.class ? props.row.class : 'N/A'}}</q-td>
				      		<q-td key="amount" :props="props">{{ props.row.amount }}</q-td>
				      		<q-td key="date" :props="props">{{ props.row.date }}</q-td>
				      		<q-td key="datePosted" :props="props">{{ props.row.postedDate }}</q-td>
				      		<q-td key="action" :props="props">
				      			<q-btn color="warning"  label="View Transaction"  @click="viewTransaction(props.row)"/>
				      		</q-td>
				      	</q-tr>
				    </template>
			    </q-table>

			    <q-table
				    title="All Income Transactions"
			      	:data="transactions"
			      	:columns="columns"
			      	row-key="name"
		      		:filter="filterIncome"
				    >
				    <template v-slot:top-right>
				        <q-input borderless dense debounce="300" v-model="filterIncome" placeholder="Search">
				          <template v-slot:append>
				            <q-icon name="search" />
				          </template>
				        </q-input>
				    </template>

				    <template slot="body" slot-scope="props"  >
				      	<q-tr :props="props" >
				      		<q-td key="id" :props="props">{{props.row.id}}</q-td>
				      		<q-td key="type" :props="props">{{ props.row.type }}</q-td>
				      		<q-td key="title"  :props="props">{{ props.row.title }}</q-td>
				      		<q-td key="class" :props="props">{{ props.row.class ? props.row.class : 'N/A'}}</q-td>
				      		<q-td key="amount" :props="props">{{ props.row.amount }}</q-td>
				      		<q-td key="date" :props="props">{{ props.row.date }}</q-td>
				      		<q-td key="datePosted" :props="props">{{ props.row.postedDate }}</q-td>
				      		<q-td key="action" :props="props">
				      			<q-btn color="warning" label="View Transaction" @click="viewTransaction(props.row)"/>
				      		</q-td>
				      	</q-tr>
				    </template>
			    </q-table> 

			    <q-dialog v-model="seeTransaction" >
			    	<q-card>
			    		<q-card-section>
			    			<div class="text-h6">Transaction Details</div>
			    		</q-card-section>

			    		<q-separator />

			    		<q-card-section style="max-height: 50vh" class="scroll" v-if="transactionId">
			    			<p>ID : 1019239{{transactionId.id}}</p>
			    			<p>Transaction Type : {{transactionId.type}}</p>
			    			<p>Transaction Title : {{transactionId.title}}</p>
			    			<p>Transaction Class : {{transactionId.class}}</p>
			    			<p>Transaction Amount : ₦ {{transactionId.amount}}</p>
			    			<p>Transaction Date : {{transactionId.date}}</p>
			    			<p>Transaction Posted Date : {{transactionId.postedDate}}</p>
			    			<q-btn label="Delete Transaction" color="red" @click="deleteTransaction(transactionId)" />
			    		</q-card-section>

			    		<q-separator />

			    		<q-card-actions align="right">
			    			<q-btn flat label="Close" color="primary" v-close-popup />
			    		</q-card-actions>
			    	</q-card>
			    </q-dialog>
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
      		fixedIncomeDialog: false,
      		fixedExpenseDialog: false,
      		seeTransaction: false,
			pagination: {
		        rowsPerPage: 1
		    },

		    filterExpense: 'expense',
		    filterIncome: 'income',

		    text: '',
		    columns: [
		       {
		          name: 'id',
		          align: 'left',
		          label: 'ID',
		          field: 'id',
		          sortable: true
		       },
		       {
		          name: 'type',
		          align: 'left',
		          label: 'Type',
		          field: 'type',
		          sortable: true
		       },
		       {
		          name: 'title',
		          align: 'left',
		          label: 'Title',
		          field: 'title',
		          sortable: true
		       },
		       {
		          name: 'class',
		          align: 'left',
		          label: 'Classification',
		          field: 'class',
		          sortable: true
		       },
		       {
		          name: 'amount',
		          align: 'left',
		          label: 'Amount (₦)',
		          field: 'amount',
		          sortable: true
		       },
		       {
		          name: 'date',
		          align: 'left',
		          label: 'Date',
		          field: 'date',
		          sortable: true
		       },
		       {
		          name: 'datePosted',
		          align: 'left',
		          label: 'Posted',
		          field: 'datePosted',
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
	    }),	

		postExpense(location){
			this.sendLocationsDetails(location).then((response) => {
	          return this.$router.push({ path: `/web/admin/account/location/expense/${this.$route.params.locationId}` })   
	        }).catch((error) => {
	            console.log('not available')
	        })  
			   
		},
		postIncome(location){
			this.sendLocationsDetails(location).then((response) => {
	          	return this.$router.push({ path: `/web/admin/account/location/income/${this.$route.params.locationId}` })   
	        }).catch((error) => {
	            console.log('not available')
	        })
		},

		viewTransaction(location){
			this.sendAccountLocationTransactionSelected(location).then((response) => {
				this.seeTransaction = true
	        }).catch((error) => {
	            console.log('not available')
	        })
		},


		deleteTransaction(location){
			this.deleteAccountLocationTransactionSelected(location).then((response) => {
				this.seeTransaction = false
				this.positiveNotification('Transaction successfully deleted')
				// return this.$router.push({ path: `/admin/account/location/${this.$route.params.locationId}` })
	        }).catch((error) => {
				// this.negativeNotification('unable to delete transaction')
	            console.log('not available')
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
	mounted()
	{
		if(this.$route.params.locationId != null){
			this.getAccountLocationTransactions(this.$route.params.locationId)
		}else{
			return this.$router.push({ path: `/web/admin/account` })  
		}

    	this.getClassifications()
		
	}
}
</script>