<template>
	<div class="q-pt-md" v-if="allTransactions">
		<h6>Transaction Found</h6>
		<table>
            <thead>
                <tr>
                    <th scope="col">Initiate</th>
                    <th scope="col">Order</th>
                    <th scope="col">Type</th>
                    <th scope="col">Package</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
            	<!-- {{allTransactions}} -->
                <tr v-for="item in allTransactions" :key="item.id">
                    <td data-label="Initiate">
                    	<q-radio v-model="transactionId" :val="item" :key="item.id" @input="pickTransaction(item)"/>
                    </td>
                    <td data-label="Order">{{item.id}}</td>
                    <td data-label="Type">{{item.action}}</td>
                    <td data-label="Quantity">{{item.packages}}</td>
                    <td data-label="Subtotal">₦ {{item.subtotal}}</td>
                    <td data-label="Discount">₦ {{item.discount}}</td>
                    <td data-label="Total">₦ {{item.total}}</td>
                </tr>
            </tbody>
        </table>

        <!-- <h6>Selected {{transactionId}}</h6> -->
	</div>		
	<div class="q-pa-sm text-center" v-else ><h6>No Transaction Found</h6></div>			
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
	components:{
       
    },
	data () {
		return {
      		transactionId: this.transactionDetails ? this.transactionDetails.id : '',
		}
	},

	computed: {
        ...mapGetters({
            allTransactions: 'onlineTransaction/allTransactions',
			transactionDetails: 'onlineTransaction/transactionDetails',
        })
    },

	methods:{
		...mapActions({
			pickedTransaction: 'onlineTransaction/transactionOrderSelected',
		}),

		pickTransaction(item) {
            // console.log(item);
            this.pickedTransaction(item).then((response) => {
	      		// this.submitting = true
            })  
        }
	}
}
</script>