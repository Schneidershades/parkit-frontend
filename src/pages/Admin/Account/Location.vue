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
	      	<q-btn push @click="postIncome(location)" label="Post Income Transaction"/>
	      	<q-btn push @click="postExpense(location)" label="Post Expense Transaction"/>
	    </q-btn-group>
      	<!-- {{location}} -->


        <!-- <q-table
		      title="Orders"
		      :columns="columns"
		      row-key="name"
		      :data="orders"
		      :grid="$q.screen.xs"
		      rows-per-page-label="50"
		      v-if="location"
		    >
		      <template slot="body" slot-scope="props">
		      	<q-tr :props="props">
		      		<q-td key="id" :props="props">{{props.row.id}}</q-td>
		      		<q-td key="packages" :props="props">{{ props.row.packages }}</q-td>
		      		<q-td key="subtotal" :props="props">{{ props.row.subtotal }}</q-td>
		      		<q-td key="discount" :props="props">{{ props.row.discount }}</q-td>
		      		<q-td key="total" :props="props">{{ props.row.total }}</q-td>
		      		<q-td key="date" :props="props">{{ props.row.created_at }}</q-td>
		      		<q-td key="status" :props="props">{{ props.row.action }}: <b>{{ props.row.status }}</b></q-td>
		      		<q-td key="action" :props="props">
		      			<q-btn color="red"  label="View" @click="viewOrder(props.row.id)"/>
		      			<q-btn color="red"  label="View" @click="viewOrder(props.row.id)"/>
		      		</q-td>
		      	</q-tr>
		      </template>
	    </q-table>  -->
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
		background-color: #f8f8f8;
		border: 1px solid #ddd;
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
			overflow: hidden;
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

export default {
	props :[
		'locationId'
	],
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
            location: 'accountLocation/accountLocationDetails',
        }),
    },

	methods:{

		...mapActions({
	        sendLocationsDetails: 'accountLocation/setAccountLocationSelected',
	    }),	

		postExpense(location){
			this.sendLocationsDetails(location).then((response) => {
	          return this.$router.push({ path: `/admin/account/location/${location.id}/expense` })   
	        }).catch((error) => {
	            console.log('not available')
	        })  
			   
		},
		postIncome(location){
			this.sendLocationsDetails(location).then((response) => {
	          	return this.$router.push({ path: `/admin/account/location/${location.id}/income` })   
	        }).catch((error) => {
	            console.log('not available')
	        })
		},

		searchTransaction(location){
			
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
}
</script>