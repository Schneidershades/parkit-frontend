<template>
	
	<div class="q-pa-sm"  v-if="orders">
        <q-table
		    title="Orders"
		    :columns="columns"
		    row-key="name"
		    :data="orders"
		    :grid="$q.screen.xs"
		    :pagination.sync="pagination"
		    :loading="loading"
	      	:filter="filter"
		    @request="onRequest"
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
		      		<q-td key="receipt_number" :props="props">{{props.row.receipt_number ? props.row.id : 'N/A'}} - {{props.row.receipt_number ? props.row.receipt_number : 'N/A'}}</q-td>
		      		<q-td key="packages" :props="props">{{ props.row.vehicle.plateNumber }}</q-td>
		      		<q-td key="subtotal" :props="props">{{ props.row.sub_total }}</q-td>
		      		<!-- <q-td key="discount" :props="props">{{ props.row.discount }}</q-td> -->
		      		<q-td key="total" :props="props">{{ props.row.total }}</q-td>
		      		<q-td key="date" :props="props">{{ props.row.transaction_initiated }}</q-td>
		      		<q-td key="status" :props="props"><b>{{ props.row.status }}</b></q-td>
		      		<q-td key="action" :props="props">
		      			<q-btn color="purple" class="q-mr-sm" unelevated icon="preview" @click="viewOrder(props.row.id)"/>
		      			<q-btn color="orange" class="q-mr-sm" unelevated icon="edit" @click="editOrder(props.row.id)"/>
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
		       { name: 'packages', align: 'left', label: 'Package(s)', field: 'packages', sortable: true },
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

		editOrder(orderId) {
	      	return this.$router.push({ path: `/web/admin/history/edit/orders/${orderId}` })
		},	

		deleteOrderId(orderId)
		{
			this.deleteOrder(orderId).then((response) => {
	        	// return this.$router.push({ path: `/web/admin/history/orders/${orderId}` })
            })  
		},	

		onRequest (props) {
			alert('doo');
			const { page, rowsPerPage, sortBy, descending } = props.pagination
			const filter = props.filter

			this.loading = true

			alert('fdd')

		      // emulate server
		      setTimeout(() => {

		        // update rowsCount with appropriate value
		        this.pagination.rowsNumber = this.getRowsNumberCount(filter)

		        // get all rows if "All" (0) is selected
		        const fetchCount = rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage

		        // calculate starting row of data
		        const startRow = (page - 1) * rowsPerPage

		        // fetch data from "server"
		        const returnedData = this.fetchFromServer(startRow, fetchCount, filter, sortBy, descending)

		        // clear out existing data and add new
		        this.data.splice(0, this.data.length, ...returnedData)

		        // don't forget to update local pagination object
		        this.pagination.page = page
		        this.pagination.rowsPerPage = rowsPerPage
		        this.pagination.sortBy = sortBy
		        this.pagination.descending = descending

		        // ...and turn of loading indicator
		        
		        this.loading = false
		    }, 1500)
		},

	    // emulate ajax call
	    // SELECT * FROM ... WHERE...LIMIT...

	    fetchFromServer (startRow, count, filter, sortBy, descending) {

	    	const data = filter
	    	? this.orders.filter(row => row.name.includes(filter))
	    	: this.orders.slice()

	      // handle sortBy
	      if (sortBy) {
	      	const sortFn = sortBy === 'desc'
	      	? (descending
	      		? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
	      		: (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
	      		)
	      	: (descending
	      		? (a, b) => (parseFloat(b[sortBy]) - parseFloat(a[sortBy]))
	      		: (a, b) => (parseFloat(a[sortBy]) - parseFloat(b[sortBy]))
	      		)
	      	data.sort(sortFn)
	      }

	      return data.slice(startRow, startRow + count)
	  	},

	    // emulate 'SELECT count(*) FROM ...WHERE...'
	    getRowsNumberCount (filter) {
	    	if (!filter) {
	    		return this.orders.length
	    	}
	    	let count = 0
	    	this.orders.forEach((treat) => {
	    		if (treat.name.includes(filter)) {
	    			++count
	    		}
	    	})
	    	return count
	    }
	},
	mounted (){
		this.getOrders()
	},
}
</script>