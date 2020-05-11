<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label="Orders"/>
	      	</q-breadcrumbs>
	    </div>

	    <!-- {{action}} -->
	    <!-- {{editPrivilege}} -->

	    <div class="q-pa-md">
		    <div class="q-gutter-y-md">
		        <q-table
				    title="Recent Transactions"
			      	:data="orders"
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
				      		<q-td key="date" :props="props">{{ props.row.date }} - {{ props.row.time }}</q-td>
				      		<q-td key="receipt_number" :props="props">{{props.row.receipt_number}}</q-td>
				      		<q-td key="vehicle" :props="props">{{ props.row.vehicle.plate_number }}</q-td>
				      		<q-td key="packages" :props="props">{{ props.row.packages.length }}</q-td>

				      		<q-td key="sub_total" :props="props">{{ props.row.sub_total }}</q-td>
			
				      		<q-td key="discount" :props="props">
					      		<template v-if="props.row.discount">
					      			<template v-if="props.row.discount.amountDiscount > 0">
					      				{{ props.row.discount ? props.row.discount.amountDiscount : 0.00}}
					      			</template>

					      			<template v-if="props.row.discount.percentageDiscount > 0">
					      				{{ props.row.discount.percentageDiscount/100 * props.row.sub_total}}
					      			</template>
				      			</template>
				      			<template v-if="props.row.coupon">
					      			<template v-if="props.row.coupon.amountDiscount > 0">
					      				{{ props.row.coupon.amountDiscount ? props.row.coupon.amountDiscount : 0.00}}
					      			</template>

					      			<template v-if="props.row.coupon.percentageDiscount > 0">
					      				{{ props.row.coupon.percentageDiscount/100 * props.row.sub_total }}
					      			</template>
				      			</template>
				      			<template v-if="props.row.coupon ==null && props.row.discount==null">
					      			0.00
				      			</template>
					      	</q-td>



				      		<q-td key="total" :props="props">{{ props.row.total }}</q-td>

				      		<q-td key="action" :props="props">
				      			<template v-if="props.row.status == 'pending' ">
				      				<q-btn color="orange"  icon="edit" @click="editRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'completed' ? true : false"/>
					      			<q-btn color="red"  icon="delete"  @click="deleteRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'completed' ? true : false"/>
					      			<q-btn color="green"  icon="check" @click="completeRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'completed' ? true : false"/>
				      			</template>

				      			<template v-if="props.row.status == 'edit' ">
					      			<q-btn color="orange" icon="edit" @click="completeRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'edit' ? true : false"/>
				      			</template>

				      			<template v-if="props.row.status == 'delete' ">
					      			<q-btn color="red"  icon="delete" @click="completeRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'delete' ? true : false"/>
				      			</template>

				      			<template v-if="props.row.status == 'completed' ">
					      			<q-btn color="green"  icon="check" @click="completeRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'completed' ? true : false"/>
				      			</template>

				      		</q-td>
				      	</q-tr>
				    </template>
			    </q-table>
 				
 				<q-table
				    title="All Transactions"
			      	:data="history"
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
				      		<q-td key="date" :props="props">{{ props.row.created_at }}</q-td>
				      		<q-td key="receipt_number" :props="props">{{props.row.receipt_number}}</q-td>
				      		<q-td key="vehicle" :props="props">{{ props.row.vehicle.plate_number }}</q-td>
				      		<q-td key="packages" :props="props">{{ props.row.packages }}</q-td>
				      		<q-td key="sub_total" :props="props">{{ props.row.subtotal }}</q-td>
				      		<q-td key="discount" :props="props">{{ props.row.discount }}</q-td>
				      		<q-td key="total" :props="props">{{ props.row.total }}</q-td>

				      		<q-td key="action" :props="props">
				      			<template v-if="props.row.status == 'pending' ">
				      				<q-btn color="orange"  icon="edit" @click="editRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'completed' ? true : false"/>
					      			<q-btn color="red"  icon="delete"  @click="deleteRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'completed' ? true : false"/>
					      			<q-btn color="green"  icon="check" @click="completeRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'completed' ? true : false"/>
				      			</template>

				      			<template v-if="props.row.status == 'edit' ">
					      			<q-btn color="orange" icon="edit" @click="completeRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'edit' ? true : false"/>
				      			</template>

				      			<template v-if="props.row.status == 'delete' ">
					      			<q-btn color="red"  icon="delete" @click="completeRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'delete' ? true : false"/>
				      			</template>

				      			<template v-if="props.row.status == 'completed' ">
					      			<q-btn color="green"  icon="check" @click="completeRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'completed' ? true : false"/>
				      			</template>

				      		</q-td>
				      	</q-tr>
				    </template>
			    </q-table>

			    <q-dialog v-model="completeTransaction" width="500">
			    	<q-card>
			    		<q-card-section>
			    			<div class="text-h6">Complete Transaction Details</div>
			    		</q-card-section>

			    		<q-separator />
			    		<q-card-section style="width: 500px; max-height: 50vh; max-width: 80vw;" class="scroll" v-if="orderDetails">
			    			Are you sure you want to complete transaction
			    			<q-form
				                @submit.prevent="sendRequestBtn('complete')"
				                ref="form"
				                >

				                <input type="hidden" v-model="action.action" value="completed">
				                <q-btn
				                  type="submit"
				                  label="Complete Transaction"
				                  class="q-mt-md"
				                  color="primary"
				                  >
				                </q-btn>
				            </q-form>
			    		</q-card-section>

			    		<q-separator />

			    		<q-card-actions align="right">
			    			<q-btn flat label="Close" color="primary" v-close-popup />
			    		</q-card-actions>
			    	</q-card>
			    </q-dialog>

			    <q-dialog v-model="editTransaction" width="500">
			    	<q-card v-if="editPrivilege==true">
			    		<q-card-section>
			    			<div class="text-h6">Edit Transaction</div>
			    		</q-card-section>

			    		<q-separator />

			    		<q-card-section style="width: 500px; max-height: 50vh; max-width: 80vw;" class="scroll" v-if="orderDetails">
			    			<q-form
				                @submit.prevent="sendRequestBtn('edit')"
				                ref="form"
				                
				                >
				                <div class="row">
				                  <div class="col-12 q-pa-sm">
				                    <q-input
				                    v-model="action.reason"
				                    filled
				                    type="textarea"
				                    label="State Reason *"
				                    lazy-rules
				                    :rules="[ val => val && val.length > 0 || 'Please type a contact address']"
				                    />
				                  </div>
				                </div>

				                <q-btn
				                  type="submit"
				                  label="Edit Request"
				                  class="q-mt-md"
				                  color="primary"
				                  >
				                </q-btn>
				            </q-form>
			    		</q-card-section>

			    		<q-separator />

			    		<q-card-actions align="right">
			    			<q-btn flat label="Close" color="primary" v-close-popup />
			    		</q-card-actions>
			    	</q-card>
					<EditRequest v-else></EditRequest>		
			    </q-dialog>

			    <q-dialog v-model="deleteTransaction" width="500">
			    	<q-card v-if="deletePrivilege==true">
			    		<q-card-section>
			    			<div class="text-h6">Delete Transaction</div>
			    		</q-card-section>

			    		<q-separator />

			    		<q-card-section style="width: 500px; max-height: 50vh; max-width: 80vw;" class="scroll" v-if="orderDetails">
			    			<q-form
				                @submit.prevent="sendRequestBtn('delete')"
				                ref="form"
				                >
				                <div class="row">
				                  
					                <div class="col-12 q-pa-sm">
					                    <q-input
					                    v-model="action.reason"
					                    filled
					                    type="textarea"
					                    label="State Reason *"
					                    lazy-rules
					                    :rules="[ val => val && val.length > 0 || 'Please type a contact address']"
					                    />
					                  </div>
					            </div>

				                <q-btn
				                  type="submit"
				                  label="Edit Request"
				                  class="q-mt-md"
				                  color="primary"
				                  >
				                </q-btn>
				            </q-form>
			    		</q-card-section>

			    		<q-separator />

			    		<q-card-actions align="right">
			    			<q-btn flat label="Close" color="primary" v-close-popup />
			    		</q-card-actions>
			    	</q-card>
					<DeleteRequest v-else></DeleteRequest>
			    </q-dialog>
		    </div>
	    </div>
  	</q-page>
</template>


<script>

import { mapActions, mapGetters } from 'vuex'
import Orders from 'components/Admin/Orders/Orders.vue'
import EditRequest from 'components/Admin/Modal/EditRequest.vue'
import DeleteRequest from 'components/Admin/Modal/DeleteRequest.vue'

export default {

	components: {
		Orders,
		EditRequest,
		DeleteRequest
	},

	data () {
		return {
      		fixedIncomeDialog: false,
      		fixedExpenseDialog: false,
      		seeTransaction: false,
			pagination: {
		        rowsPerPage: 1
		    },

		    filterExpense: '',
		    action: {
		    	orderDetails: null,
		    	reason: null,
		    	action: null,
		    },

		    
		    editTransaction: false,
		    deleteTransaction: false,
		    completeTransaction: false,
		    filterIncome: '',

		    text: '',
		    columns: [
		       {
		          name: 'date',
		          align: 'left',
		          label: 'Date',
		          field: 'date',
		          sortable: true
		       },
		       {
		          name: 'receipt_number',
		          align: 'left',
		          label: 'No',
		          field: 'receipt_number',
		          sortable: true
		       },
		       {
		          name: 'vehicle',
		          align: 'left',
		          label: 'Plate No',
		          field: 'vehicle',
		          sortable: true
		       },
		       {
		          name: 'packages',
		          align: 'left',
		          label: 'Packages',
		          field: 'packages',
		          sortable: true
		       },
		       {
		          name: 'sub_total',
		          align: 'left',
		          label: 'SubTotal (₦)',
		          field: 'sub_total',
		          sortable: true
		       },
		       {
		          name: 'discount',
		          align: 'left',
		          label: 'Discount (₦)',
		          field: 'discount',
		          sortable: true
		       },
		       {
		          name: 'total',
		          align: 'left',
		          label: 'Total (₦)',
		          field: 'total',
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
            orders: 'adminOrders/orders',
          	history: 'locationHistory/history',
          	user: 'auth/user',
          	orderDetails: 'adminOrders/orderDetails',
          	editPrivilege: 'adminOrders/editPrivilege',
          	deletePrivilege: 'adminOrders/deletePrivilege',
        }),
    },

    methods: {
    	...mapActions({
          	sendOrder: 'adminOrders/sendOrder',
          	processRequest: 'adminOrders/processRequest',
          	setCurrentEditRight: 'adminOrders/setCurrentUserEditRight',
          	setCurrentDeleteRight: 'adminOrders/setCurrentUserDeleteRight',
        }),

    	editRequestOrderTransaction(data){
			this.sendOrder(data).then((response) => {
				this.editTransaction = true	
				this.action.orderDetails = this.orderDetails
            }).catch((error) => {
                console.log(error)
                if(this.errorMessage){
                    this.negativeNotification('cannot process order at the moment')
                }
            }) 
    	},

    	deleteRequestOrderTransaction(data){
			this.sendOrder(data).then((response) => {
				this.deleteTransaction = true
				this.action.orderDetails = this.orderDetails	
            }).catch((error) => {
                console.log(error)
                if(this.errorMessage){
                    this.negativeNotification('cannot process order at the moment')
                }
            }) 
    	},

    	completeRequestOrderTransaction(data){
			this.sendOrder(data).then((response) => {
				this.completeTransaction = true	
				this.action.orderDetails = this.orderDetails
            }).catch((error) => {
                console.log(error)
                if(this.errorMessage){
                    this.negativeNotification('cannot process order at the moment')
                }
            }) 
    	},

    	sendRequestBtn(type){
    		this.action.action = type
    		this.processRequest(this.action).then((response) => {
    			this.editTransaction = false
		    	this.deleteTransaction = false
		    	this.completeTransaction = false	
            }).catch((error) => {
                console.log(error)
                if(this.errorMessage){
                    this.negativeNotification('cannot process order at the moment')
                }
            }) 
    	},
    },
    mounted(){
    	if(this.$can('edit', 'orders')){
			this.setCurrentEditRight(true)
		}else{
			this.setCurrentEditRight(false)
		}

		if(this.$can('delete', 'orders')){
			this.setCurrentDeleteRight(true)
		}else{
			this.setCurrentDeleteRight(false)
		}
    }
}
</script>