<template>
	<div class="q-pa-sm">
		<table v-if="cart.length">
            <q-card-actions align="around">
                <q-btn flat @click.prevent="removeAllProductFromCart()">Clear Cart</q-btn>
                <q-btn flat to="/cart">Cart Page</q-btn>
            </q-card-actions>
            <thead>
                <tr>
                    <th scope="col">Package</th>
                    <th scope="col">Venue</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in cart" :key="item.id">
                    <td data-label="Package"><b>{{item.vehicle}}</b> - {{item.package}}</td>
                    <td data-label="Venue">{{item.venue}}</td>
                    <td data-label="Quantity">{{item.quantity}}</td>
                    <td data-label="Unit">{{item.amount}}</td>
                    <td data-label="Amount">{{item.amount * item.quantity}}</td>
                    <td data-label="Action"><q-btn flat color="danger" @click.prevent="removeProductFromCart(item.id)">Remove</q-btn></td>
                </tr>
            </tbody>
        </table>
		<table v-else><caption>No item in your cart</caption></table>
	</div>					

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

@media screen and (max-width: 1600px) {
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
	data () {
		return {

		}
	},


	computed: {
        ...mapGetters({
            cart: 'shopping/cart',
            cartItemCount: 'shopping/cartItemCount',
            cartTotal: 'shopping/cartTotal',
            authenticated: 'auth/authenticated',
        }),
        
        carTotalLength(){
            return "Cart (" + this.cartItemCount + ") - ₦" + this.cartTotal
        }
    },

	methods:{
		...mapActions({
			removeProductFromCart: 'shopping/removeProductFromCart',
			removeAllProductFromCart: 'shopping/removeAllProductFromCart',
			updateCartTotals: 'shopping/updateCartTotals',
		}),

	}
}
</script>