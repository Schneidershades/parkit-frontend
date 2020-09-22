<template>
	<div class="q-pa-sm"  v-if="orders">
        <q-table
		    title="Orders"
		    :columns="columns"
		    row-key="name"
		    :data="orders"
		    :grid="$q.screen.xs"
		    :pagination.sync="pagination"
	      	:filter="filterOrders"
		    >
		    	<template v-slot:top-right>
			        <q-input borderless dense debounce="300" v-model="filterOrders" placeholder="Search">
			          <template v-slot:append>
			            <q-icon name="search" v-model="filterOrders"/>
			          </template> 
			        </q-input>
		      	</template>

			    <template slot="body" slot-scope="props">
			      	<q-tr :props="props">
			      		<q-td key="receipt_number" :props="props">{{props.row.receipt_number ? props.row.receipt_number : 'N/A'}}</q-td>
			      		<q-td key="packages" :props="props">{{ props.row.packages }}</q-td>
			      		<q-td key="subtotal" :props="props">{{ props.row.sub_total }}</q-td>
			      		<q-td key="discount" :props="props">{{ props.row.discount }}</q-td>
			      		<q-td key="total" :props="props">{{ props.row.total }}</q-td>
			      		<q-td key="date" :props="props">{{ props.row.transaction_initiated }}</q-td>
			      		<q-td key="status" :props="props"><b>{{ props.row.status }}</b></q-td>
			      		<q-td key="action" :props="props">
			      			<q-btn color="purple" class="q-mr-sm" unelevated icon="preview" @click="viewOrder(props.row.receipt_number)"/>
			      			<q-btn color="orange" class="q-mr-sm" unelevated icon="edit" @click="viewOrder(props.row.id)"/>
		        			<q-btn color="red" unelevated icon="delete" @click="deleteOrderId(props.row.id)"/>
			      		</q-td>
			      	</q-tr>
			    </template>
	    </q-table> 
	</div>	
</template>


<script>

import { mapActions, mapGetters } from 'vuex'

export default {
	data () {
		return {

		    filterOrders: '',

			separator: 'cell',

			pagination: {
		        rowsPerPage: 30,
		        page: 1
		    },

		    text: '',
		    columns: [
		       {
		          name: 'receipt_number',
		          align: 'left',
		          label: 'Order ID',
		          field: 'receipt_number',
		          sortable: true
		       },
		       {
		          name: 'packages',
		          align: 'left',
		          label: 'Package(s)',
		          field: 'packages',
		          sortable: true
		       },
		       {
		          name: 'subtotal',
		          align: 'left',
		          label: 'Subtotal (₦)',
		          field: 'subtotal',
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
		          name: 'date',
		          align: 'left',
		          label: 'Date',
		          field: 'date',
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
            orders: 'webAdminOrders/orders',
            authenticated: 'auth/user',
        }),
    },

	methods:{
		...mapActions({
			getOrders: 'webAdminOrders/getOrders',
			deleteOrder: 'webAdminOrders/deleteOrder',
		}),

	    viewOrder(orderId) {
	      	return this.$router.push({ path: `/web/admin/history/orders/${orderId}` })
		},	

		deleteOrderId(orderId)
		{
			this.deleteOrder(orderId).then((response) => {
	        	// return this.$router.push({ path: `/web/admin/history/orders/${orderId}` })
            })  
		},	
	},
	mounted (){
		this.getOrders()
	},
}
</script>