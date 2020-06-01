<template>
	<div class="q-pa-sm"  v-if="orders">
		<!-- {{authenticated}} -->
         <q-table
		      title="Orders"
		      :columns="columns"
		      row-key="name"
		      :data="orders"
		      :grid="$q.screen.xs"
		      rows-per-page-label="50"
		    >
		      <template slot="body" slot-scope="props">
		      	<q-tr :props="props">
		      		<q-td key="id" :props="props">{{props.row.receipt_number? props.row.receipt_number : 'N/A'}}</q-td>
		      		<q-td key="packages" :props="props">{{ props.row.packages }}</q-td>
		      		<q-td key="subtotal" :props="props">{{ props.row.sub_total }}</q-td>
		      		<q-td key="discount" :props="props">{{ props.row.discount }}</q-td>
		      		<q-td key="total" :props="props">{{ props.row.total }}</q-td>
		      		<q-td key="date" :props="props">{{ props.row.created_at }}</q-td>
		      		<q-td key="status" :props="props"><b>{{ props.row.status }}</b></q-td>
		      		<q-td key="action" :props="props">
		      			<q-btn color="red"  label="View" @click="viewOrder(props.row.id)"/>
		      		</q-td>
		      	</q-tr>
		      </template>
	    </q-table> 
	</div>	
</template>


<script>

import { mapActions, mapGetters } from 'vuex'
import Rave from 'vue-ravepayment'

export default {
	components: {
        Rave
    },
	data () {
		return {
			pagination: {
		        rowsPerPage: 0
		    },

		    text: '',
		    columns: [
		       {
		          name: 'id',
		          align: 'left',
		          label: 'Order ID',
		          field: 'id',
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
            orders: 'orders/orders',
            authenticated: 'auth/user',
        }),
    },

	methods:{
		...mapActions({
			getOrders: 'orders/getOrders',
		}),

	    viewOrder(orderId) {
	      	return this.$router.push({ path: `/user/order/${orderId}` })
		},		
	},
	mounted (){
		this.getOrders()
	},
}
</script>