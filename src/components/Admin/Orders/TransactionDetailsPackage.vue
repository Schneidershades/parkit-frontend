<template>
	<div class="q-pa-sm">
		<!-- {{transactionDetails}} -->
		<table>
            <thead>
                <tr>
                    <th scope="col">Package</th>
                    <th scope="col"></th>
                    <th scope="col">Location</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in transactionDetails.products" :key="item.id">
                    <td data-label="Package"><b>{{item.vehicle}}</b> - {{item.package}}</td>
                    <td data-label="Quantity">
						<!-- <q-input
					      	ref="platenumber"
					        label="Plate Number *"
					        filled
					        dense
					        readonly
					        lazy-rules
					        :rules="[
					          val => val !== null && val !== '' || 'Please type a plate number'
					        ]"
					    /> -->
					</td>
					<td data-label="Venue">{{item.venue}}</td>
					<td data-label="Quantity">{{item.quantity}}</td>
                    <td data-label="Unit">₦ {{item.amount}}</td>
                </tr>
                <tr>


                	<td colspan="4">
					    <b>Discount 
					    <template v-if="transactionDetails.action == 'online-free-wash'"> - {{transactionDetails.action}}</template> </b>
                	</td>
                	<td><b v-if="transactionDetails.discount">₦ {{transactionDetails.discount}} </b></td>
                </tr>
                <tr>
                	<td colspan="4">
					    <b>Subtotal</b>
                	</td>
                	<td><b v-if="transactionDetails.sub_total">₦ {{transactionDetails.sub_total}} </b></td>
                </tr>

                <tr>
                	<td colspan="4"><b>Total</b></td>
                	<td><h6>₦ {{transactionDetails.total}}</h6></td>
                </tr>
            </tbody>
        </table>
	</div>	
	<!-- <div class="q-pa-sm text-center" v-else ><h6>No item in your cart</h6></div>			 -->

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

import { mapGetters } from 'vuex'

export default {
	data () {
		return {
		}
	},
	computed: {
        ...mapGetters({
			transactionDetails: 'onlineTransaction/transactionDetails',
        }),
    }
}
</script>