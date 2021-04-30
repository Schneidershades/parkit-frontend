<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label="Orders"/>
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md">
        	<BackButton/>
	        <div class="q-gutter-y-md">
	            <div class="q-pa-sm"  v-if="history">
			        <q-table
					    title="Orders"
					    :columns="columns"
					    row-key="name"
					    :data="history"
					    :pagination.sync="pagination"
					    :loading="loading"
				      	:filter="filter"
					    binary-state-sort
					    >

				    	<template v-slot:top-right>
					        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
					          <template v-slot:append>
					            <q-icon name="search" v-model="filter"/>
					          </template> 
					        </q-input>
				      	</template>

					    <template slot="body" slot-scope="props">
					      	<q-tr :props="props">
					      		<q-td key="receipt_number" :props="props">
					      			{{props.row.receipt_number ? props.row.id : 'N/A'}} - {{props.row.receipt_number ? props.row.receipt_number : 'N/A'}}
					      		</q-td>
					      		<q-td key="plate_number" :props="props">{{ props.row.vehicle.plate_number }}</q-td>
					      		<q-td key="phone" :props="props">
					      			<template v-if="$can('edit', 'orders')">
					      				{{ props.row.vehicle ? props.row.vehicle.phone  : 'N/A'}}
					      			</template>

					      			<template v-else>
					      				234*******
					      			</template>
					      		</q-td>
					      		<q-td key="subtotal" :props="props">{{ props.row.sub_total }}</q-td>
					      		<q-td key="total" :props="props">{{ props.row.total }}</q-td>
					      		<q-td key="date" :props="props">{{ props.row.transaction_initiated }}</q-td>
					      		<q-td key="status" :props="props"><b>{{ props.row.status }}</b></q-td>
					      		<q-td key="action" :props="props">
					      			<q-btn color="purple" disabled="$can('edit', 'orders') ? false : true" class="q-mr-sm" unelevated icon="preview" @click="viewOrder(props.row.id)"/>
					      			<q-btn color="orange" disabled="$can('edit', 'orders') ? false : true" class="q-mr-sm" unelevated icon="edit" @click="editOrder(props.row.id)"/>
				        			<!-- <q-btn color="red" unelevated icon="delete" @click="deleteOrderId(props.row.id)"/> -->
					      		</q-td>
					      	</q-tr>
					    </template>
				    </q-table> 
				</div>	
	        </div>
	    </div>
  	</q-page>
</template>


<script>

import { mapActions, mapGetters } from 'vuex'
import BackButton from 'components/Share/BackButton.vue'

export default {
	components: {
		BackButton
	},

	data () {
		return {
      		loading: false,

		    filter: '',

			separator: 'cell',

			pagination: {
		        rowsPerPage: 25,
		        page: 1,
		        sortBy: 'desc',
        		descending: false,
        		// rowsNumber: 100
		    },

		    text: '',
		    columns: [
		       { name: 'receipt_number', align: 'left', label: 'Order ID', field: 'receipt_number', sortable: true },
		       { name: 'plate_number', align: 'left', label: 'Plate No.(s)', field: 'plate_number', sortable: true },
		       { name: 'phone', align: 'left', label: 'Customer No.(s)', field: 'phone', sortable: true },
		       { name: 'subtotal', align: 'left', label: 'Subtotal (₦)', field: 'subtotal', sortable: true },
		       // { name: 'discount', align: 'left', label: 'Discount (₦)', field: 'discount', sortable: true },
		       { name: 'total', align: 'left', label: 'Total (₦)', field: 'total', sortable: true },
		       { name: 'date', align: 'left', label: 'Date', field: 'date', sortable: true },
		       { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
		       { name: 'action', align: 'left', label: 'Action', field: 'action' }
		    ],
		}
	},
	computed: {
        ...mapGetters({
            orders: 'webAdminOrders/orders',
            authenticated: 'auth/user',
            history: 'locationHistory/history',
          	location: 'accountLocation/accountLocationDetails',
        }),
    },

	methods:{
		...mapActions({
			getOrders: 'webAdminOrders/getOrders',
			deleteOrder: 'webAdminOrders/deleteOrder',
			getLocationOrders: 'webAdminOrders/getLocationOrders',
		}),

	    viewOrder(orderId) {
	      	return this.$router.push({ path: `/web/admin/history/orders/${orderId}` })
		},

		editOrder(orderId) {
	      	return this.$router.push({ path: `/web/admin/history/edit/orders/${orderId}` })
		},	

		deleteOrderId(orderId)
		{
			this.deleteOrder(orderId).then((response) => {
	        	// return this.$router.push({ path: `/web/admin/history/orders/${orderId}` })
            })  
		},	
	},
	mounted(){
		if(this.location == null){
			return this.$router.push({ path: `/web/admin/locations` })  
		}
		this.getLocationOrders(this.location.id)
	},
}
</script>