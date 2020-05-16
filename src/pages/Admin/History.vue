<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm print-hide">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label="Orders"/>
	      	</q-breadcrumbs>
	    </div>

	    <div id="ticketPrinter" v-if="orderDetails!=null">
			<div class="ticket print-only">

				<q-card-actions align="center">
		            <img src="statics/parkit_logo.png" alt="Parkit Home service" width="150">
		            <i>Welcome to parkit</i>
		        </q-card-actions>

		        <div class="q-py-sm">
		        	<b>Location : {{orderDetails.location ? orderDetails.location.code : ''}} -  {{orderDetails.location ? orderDetails.location.address : ''}}<br>
					Phone   : +234-903-152-6466 <br> 
					Email   : info@parkit.ng<br>
					Website   : www.parkit.ng<br></b>
				</div>
				<div class="q-py-sm">
					<b>Bill ID   : {{orderDetails.receipt_number}}<br>
					Date   : {{orderDetails.date}}<br>
					Time   : {{orderDetails.time}}<br>
					Cashier   : {{orderDetails.cashier}}<br>
					To   : {{orderDetails.vehicle.first_name ? orderDetails.vehicle.first_name : 'N/A'}} {{orderDetails.vehicle.last_name}}<br>
					Transaction ID   : {{orderDetails.vehicle.plate_number}}<br>
					Payment Method   : {{orderDetails.payment_method == 'not_paid' ? 'Not Paid' : ''}}
					{{orderDetails.payment_method == 'pos' ? 'POS' : ''}}
					{{orderDetails.payment_method == 'cash' ? 'Cash' : ''}}
					{{orderDetails.payment_method == 'transfer' ? 'Transfer' : ''}}

					<br></b>
		        </div>
		       		
				<div class="text-h6">Items</div>
				
				<div class="q-py-sm" v-for="item in orderDetails.packages">
					<p>
						<b>{{item.package}} - {{item.vehicle}}  || {{item.quantity}} @ ₦ {{item.amount}} || Total: ₦ {{item.total}}</b>
					</p>
				</div>
				<div class="q-py-sm"  align="right">
					<b>Sub-total: ₦{{orderDetails.sub_total}}<br>
					<template v-if="orderDetails.discount!=null">
						<template v-if="orderDetails.discount.amountDiscount != null">
							Net-Total: ₦ {{ orderDetails.discount.amountDiscount }}
						</template>
						<template v-if="orderDetails.discount.percentageDiscount != null">
							Net-Total: ₦ {{ orderDetails.percentageDiscount/100 * orderDetails.sub_total }}
						</template>
					</template>
					<template v-if="orderDetails.coupon!=null">
						<template v-if="orderDetails.coupon.amountDiscount != null">
							Net-Total: ₦ {{ orderDetails.coupon.amountDiscount }}
						</template>
						<template v-if="orderDetails.coupon.percentageDiscount != null">
							Net-Total: ₦ {{ orderDetails.coupon.percentageDiscount/100 * orderDetails.sub_total }}
						</template>
					</template>

					<template v-if="orderDetails.discount==null && orderDetails.coupon==null">
						Net-Total: ₦ 0.00
					</template>
					
					<br>
					Total: ₦ {{orderDetails.total}}</b>
					<br><br><br>
		            	<i>Thank you for your patronage</i>
					<br>
					<br><br>
					<br>
					<hr>
				</div>
			</div>
	    </div>

	    <div class="q-pa-md print-hide">
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

				      			<q-btn color="purple" class="q-mx-sm" icon="print" @click="printOrderTransaction(props.row)"/>

				      		</q-td>
				      	</q-tr>
				    </template>
			    </q-table>

			    {{history}}
 				
 				<!-- <q-table
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
				      		<q-td key="date" :props="props"></q-td>
				      		<q-td key="receipt_number" :props="props"></q-td>
				      		<q-td key="vehicle" :props="props"></q-td>
				      		<q-td key="packages" :props="props"></q-td>
				      		<q-td key="sub_total" :props="props"></q-td>
				      		<q-td key="discount" :props="props"></q-td>
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

				      			<q-btn color="purple" class="q-mx-sm" icon="print" />

				      		</q-td>
				      	</q-tr>
				    </template>
			    </q-table> -->

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


<style scoped>
	@page { margin: 0; }
	.ticket {
	    font-size: 9px;
	    margin:0;
	}

	td,
	th,
	tr,
	table {
	    border-top: 1px solid black;
	    border-collapse: collapse;
	}

	td.description,
	th.description {
	    width: 75px;
	    max-width: 75px;
	}

	td.quantity,
	th.quantity {
	    width: 40px;
	    max-width: 40px;
	    word-break: break-all;
	}

	td.price,
	th.price {
	    width: 40px;
	    max-width: 40px;
	    word-break: break-all;
	}

	.centered {
	    text-align: center;
	    align-content: center;
	}

	.ticket {
	    width: 200px;
	    max-width: 155px;
	}

	@page{
		margin:0cm;
	}

</style>

<script>

import { mapActions, mapGetters } from 'vuex'
import Orders from 'components/Admin/Orders/Orders.vue'
import EditRequest from 'components/Admin/Modal/EditRequest.vue'
import DeleteRequest from 'components/Admin/Modal/DeleteRequest.vue'
const { remote } = require('electron')
const {PosPrinter} = require('electron').remote.require("electron-pos-printer")
const path = require("path")

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

    	printOrderTransaction(data){
			this.sendOrder(data).then((response) => {
				this.action.orderDetails = this.orderDetails
				remote.getCurrentWebContents().print({silent:true, copies : 1})
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