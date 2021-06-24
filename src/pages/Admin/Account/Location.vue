<template>
	<q-page padding>
	    <div class="q-pa-md q-gutter-sm">
	      <q-breadcrumbs>
	        <q-breadcrumbs-el label="Home" />
	        <q-breadcrumbs-el label="Location" />
	      </q-breadcrumbs>
	    </div>

	    <BackButton/>

	    <div class="container">
		  	<div class="row">
		      	<div class="col-12 col-md-12">
			      	<table class="text-white " style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%); border: 1px solid #ddd;">
			            <thead>
			                <tr>
			                    <th scope="col"></th>
			                    <th scope="col">TODAY</th>
			                    <th scope="col">YESTERDAY</th>
			                    <th scope="col">WEEK</th>
			                    <th scope="col">MONTH</th>
			                    <th scope="col">LAST MONTH</th>
			                </tr>
			            </thead>
			            <tbody >
					      	<tr>
			                	<td><b>CARS</b></td>
			                	<td><b>{{dashboard.orders.today.cars}}</b></td>
			                	<td><b>{{dashboard.orders.yesterday.cars}}</b></td>
			                	<td><b>{{dashboard.orders.week.cars}}</b></td>
			                	<td><b>{{dashboard.orders.month.cars}}</b></td>
			                	<td><b>{{dashboard.orders.last_month.cars}}</b></td>
			                </tr>
			                <tr>
			                	<td><b>AMOUNT</b></td>
			                	<td><b>₦ {{dashboard.orders.today.transaction}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.yesterday.transaction}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.week.transaction}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.month.transaction}}.00</b></td>
			                	<td><b>₦{{dashboard.orders.last_month.transaction}}</b></td>
			                </tr>
			                <tr>
			                	<td><b>POS</b></td>
			                	<td><b>₦ {{dashboard.orders.today.pos}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.yesterday.pos}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.week.pos}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.month.pos}}.00</b></td>
			                	<td><b>₦{{dashboard.orders.last_month.pos}}</b></td>
			                	<td><b></b></td>
			                </tr>
			                <tr>
			                	<td><b>CASH</b></td>
			                	<td><b>₦ {{dashboard.orders.today.cash}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.yesterday.cash}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.week.cash}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.month.cash}}.00</b></td>
			                	<td><b>₦{{dashboard.orders.last_month.cash}}</b></td>
			                </tr>
			                <tr>
			                	<td><b>NOT PAID</b></td>
			                	<td><b>₦ {{dashboard.orders.today.not_paid}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.yesterday.not_paid}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.week.not_paid}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.month.not_paid}}.00</b></td>
			                	<td><b>₦{{dashboard.orders.last_month.not_paid}}</b></td>
			                </tr>
			                <tr>
			                	<td><b>PENDING</b></td>
			                	<td><b>₦ {{dashboard.orders.today.pending}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.yesterday.pending}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.week.pending}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.month.pending}}.00</b></td>
			                	<td><b>₦{{dashboard.orders.last_month.pending}}</b></td>
			                </tr>
			                <tr>
			                	<td><b>EDIT</b></td>
			                	<td><b>₦ {{dashboard.orders.today.edit}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.yesterday.edit}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.week.edit}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.month.edit}}.00</b></td>
			                	<td><b>₦{{dashboard.orders.last_month.edit}}</b></td>
			                </tr>
			                <tr>
			                	<td><b>DELETE</b></td>
			                	<td><b>₦ {{dashboard.orders.today.delete}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.yesterday.delete}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.week.delete}}.00</b></td>
			                	<td><b>₦ {{dashboard.orders.month.delete}}.00</b></td>
			                	<td><b></b></td>
			                </tr>

			                <tr>
			                	<td><b>SEARCH</b></td>
			                	<td>
			                		<q-input filled v-model="searchByDate.dateFrom" label="Date From *"  mask="date" :rules="['date']">
	                                    <template v-slot:append>
	                                        <q-icon name="event" class="cursor-pointer">
	                                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
	                                                <q-date v-model="searchByDate.dateFrom" :readonly="readonly">
	                                                    <div class="row items-center justify-end">
	                                                        <q-btn v-close-popup label="Close" color="primary" flat />
	                                                    </div>
	                                                </q-date>
	                                            </q-popup-proxy>
	                                        </q-icon>
	                                    </template>
	                                </q-input>
			                	</td>
			                	<td>
			                		<q-input filled v-model="searchByDate.dateTo" label="Date To *"  mask="date" :rules="['date']">
	                                    <template v-slot:append>
	                                        <q-icon name="event" class="cursor-pointer">
	                                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
	                                                <q-date v-model="searchByDate.dateTo" :readonly="readonly">
	                                                    <div class="row items-center justify-end">
	                                                        <q-btn v-close-popup label="Close" color="primary" flat />
	                                                    </div>
	                                                </q-date>
	                                            </q-popup-proxy>
	                                        </q-icon>
	                                    </template>
	                                </q-input>
			                	</td>

			                	<td>
			                		<q-card-actions>
										<q-btn @click="submitDateSearch" unelevated color="primary" size="sm" class="full-width" label="Search" />
									</q-card-actions>
			                	</td>
			                	<td></td>
			                	<td><b></b></td>
			                </tr>
			            </tbody>
			        </table>
		      	</div>
		    </div>
		</div>


	    <div class="q-pa-md">
		    <div class="q-gutter-y-md">
		      	<q-btn-group push class="q-p-md" align="right">
			      	<q-btn v-if="user.location.code == 'PARKIT PARENT'" push @click="postIncome(location)" label="Post Income Transaction"/>
			      	<q-btn push @click="postExpense(location)" label="Post Expense Transaction"/>
			    </q-btn-group>

				<q-tabs
					v-model="tab"
					inline-label
					:breakpoint="0"
					align="justify"
					class="bg-purple text-white shadow-2"
					>
					<q-tab name="income" label="Income Transaction" />
					<q-tab name="expense" label="Expense Transaction" />
				</q-tabs>

				<q-tab-panels
					v-model="tab"
					animated
					swipeable
					vertical
					transition-prev="jump-up"
					transition-next="jump-up"
					>
					<q-tab-panel name="income">

						<!-- {{locationStats}} -->

						<div class="col-12 col-md-12">
						    <q-card
						      	class="q-my-md my-card text-white"
						      	style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
						    	>

						      	<q-card-section class="row">

						      		<div class="col-12">
							        	<div class="text-h5 q-mb-md">INCOME STATISTICS</div>
							      	</div>

							      	<div class="col-6 q-pt-lg">
							      		<template v-for="item in locationStats">
							      			<!-- {{item}} -->
							      			<div v-if="item.count.length > 0" :key="item.vp" class="text-subtitle2">
								        		<p>{{item.vp}}</p>
								        	</div>
							      		</template>
							      	</div>

							      	<div class="col-2">
							        	<div class="text-subtitle2">PACKAGE COUNT</div>
							        	<template v-for="item in locationStats">
							      			<div v-if="item.count.length > 0" :key="item.vp" class="text-subtitle2">
								        		<p>{{item.count.length}}</p>
								        	</div>
							      		</template>
							      	</div>

							      	<div class="col-2">
							        	<div class="text-subtitle2">AMOUNT</div>
							        	<template v-for="item in locationStats">
							      			<div v-if="item.count.length > 0" :key="item.vp" class="text-subtitle2">
								        		<p>₦{{item.amount}}</p>
								        	</div>
							      		</template>

							        	<div class="text-subtitle2">
							        		<p>DISCOUNT AMOUNT</p>
							        	</div>

							        	<div class="text-subtitle2">
							        		<p>GRAND TOTAL</p>
							        	</div>
							      	</div>

							      	<div class="col-2">
							        	<div class="text-subtitle2">TOTAL</div>
							        	<template v-for="item in locationStats">
							      			<div v-if="item.count.length > 0" :key="item.vp" class="text-subtitle2">
								        		<p>₦{{item.amount * item.count.length}}</p>
								        	</div>
							      		</template>

							        	<div class="text-subtitle2">
					        				<div class="text-subtitle2">₦ {{dashboard.orders.yesterday.discounted_amount ? dashboard.orders.yesterday.discounted_amount : '0'}}.00
					        				</div>
							        	</div>

							        	<div class="text-subtitle2">
							        		<div class="text-subtitle2 q-py-md">₦ {{dashboard.orders.yesterday.transaction ? dashboard.orders.yesterday.transaction : '0'}}.00
							        		</div>
							        	</div>
							      	</div>
						      	</q-card-section>
						    </q-card>
				      	</div>

						<q-table
						    title="All Income Transactions"
					      	:data="transactions"
					      	:columns="columns"
					      	row-key="name"
				      		:filter="filterIncome"
			    			:pagination.sync="pagination"
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
						      		<q-td key="action" :props="props">
						      			<q-btn color="warning" label="View Transaction" @click="viewTransaction(props.row)"/>
						      		</q-td>
						      	</q-tr>
						    </template>
					    </q-table> 
					</q-tab-panel>

					<q-tab-panel name="expense">
						<q-table
						    title="All Expense Transactions"
					      	:data="transactions"
					      	:columns="columns"
					      	row-key="name"
				      		:filter="filterExpense"
					    	:pagination.sync="pagination"
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
						      		<q-td key="action" :props="props">
						      			<q-btn color="warning"  label="View Transaction"  @click="viewTransaction(props.row)"/>
						      		</q-td>
						      	</q-tr>
						    </template>
					    </q-table>
					</q-tab-panel>
				</q-tab-panels>

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

			    			<template v-if="user">
					            <template v-if="user.role=='Super Admin'">
					               <!-- <q-btn label="Delete Transaction" color="red" @click="deleteTransaction(transactionId)" /> -->
					            </template>
					        </template>
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

<style scoped>
	table {
		border: 1px solid #ccc;
		border-collapse: collapse;
		margin: 0;
		padding: 0;
		width: 100%;
		table-layout: fixed;
	}

	table caption {
		font-size: 1.5em;
		/*margin: .5em 0 .75em;*/
	}

	table tr {
		/*background-color: #f8f8f8;*/
		
		/*border: 1px solid #ddd;*/
		/*padding: .35em;*/
	}

	table th,
	table td {
		padding: .625em;
		text-align: center;
	}

	table th {
		font-size: .85em;
		letter-spacing: .1em;
		text-transform: uppercase;
	}

	@media screen and (max-width: 600px) {
		table {
			border: 0;
		}

		table caption {
			font-size: 1.3em;
		}

		table thead {
			border: none;
			clip: rect(0 0 0 0);
			height: 1px;
			margin: -1px;
			/*overflow: hidden;*/
			padding: 0;
			position: absolute;
			width: 1px;
		}

		table tr {
			border-bottom: 3px solid #ddd;
			display: block;
			margin-bottom: .325em;
		}

		table td {
			border-bottom: 1px solid #ddd;
			display: block;
			font-size: .8em;
			text-align: right;
		}

		table td::before {
		    /*
		    * aria-label has no advantage, it won't be read inside a table
		    content: attr(aria-label);
		    */
		    content: attr(data-label);
		    float: left;
		    font-weight: bold;
		    text-transform: uppercase;
		}

		table td:last-child {
			border-bottom: 0;
		}
	}
</style>

<script>

import { mapActions, mapGetters } from 'vuex'
import { Notify } from 'quasar'
import BackButton from 'components/Share/BackButton.vue'

export default {
	components: {
        BackButton
    },
	props :[
		'locationId'
	],
	data () {
		return {
      		fixedIncomeDialog: false,
      		fixedExpenseDialog: false,
      		seeTransaction: false,
			pagination: {
		        rowsPerPage: 30,
		        page: 1
		    },

		    searchByDate:{
		    	dateFrom: null,
		    	dateTo: null,
		    	location_id: null,
		    },

		    tab: 'income',

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
		       // {
		       //    name: 'datePosted',
		       //    align: 'left',
		       //    label: 'Posted',
		       //    field: 'datePosted',
		       //    sortable: true
		       // },

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
		    dashboard: 'dashboard/dashboard',
		    locationStats: 'dashboard/locationStats',
          	transactionId: 'accountLocation/accountLocationTransactionSelected',
          	dateTransactions: 'dashboard/dateTransactions',
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
            getLocationDashboard: 'dashboard/getLocationDashboard',
            getLocationStats: 'dashboard/getLocationStats',
            postDateTransations: 'dashboard/postDateTransations',
	    }),

		postExpense(location){
			this.sendLocationsDetails(location).then((response) => {
	          return this.$router.push({ path: `/web/admin/account/location/expense/${this.$route.params.locationId}` })   
	        }).catch(() => {
	            console.log('not available')
	        })
		},
		postIncome(location){
			this.sendLocationsDetails(location).then((response) => {
	          	return this.$router.push({ path: `/web/admin/account/location/income/${this.$route.params.locationId}` })   
	        }).catch(() => {
	            console.log('not available')
	        })
		},

		viewTransaction(location){
			this.sendAccountLocationTransactionSelected(location).then((response) => {
				this.seeTransaction = true
	        }).catch(() => {
	            console.log('not available')
	        })
		},


		deleteTransaction(location){
			this.deleteAccountLocationTransactionSelected(location).then((response) => {
				this.seeTransaction = false
				this.positiveNotification('Transaction successfully deleted')
				// return this.$router.push({ path: `/admin/account/location/${this.$route.params.locationId}` })
	        }).catch(() => {
	            console.log('not available')
	        })
		},

		submitDateSearch(){
			if(this.searchByDate.dateTo == null || this.searchByDate.dateFrom == null){
				this.negativeNotification('please fill in both dates to search transactions')
			}
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
		if(this.location.id != null){
			this.getAccountLocationTransactions(this.location.id)
		}else{
			return this.$router.push({ path: `/web/admin/account` })
		}

    	this.getClassifications()
	  	this.getLocationDashboard(this.location.id)
	  	this.getLocationStats(this.location.id)
	}
}
</script>