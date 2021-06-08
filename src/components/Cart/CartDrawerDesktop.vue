<template>
	<div class="q-pa-sm">
		<table v-if="cart && cart.length > 0">
            <q-card-actions align="around">
                <q-btn color="red"  icon="remove_adminShopping_cart" @click.prevent="removeAllProductFromCart()">Clear Cart</q-btn>
                <q-btn color="green" disabled v-if="packageLocationCount > 0 && packageHomeOfficeCount > 0 " icon="subdirectory_arrow_right" to="/cart">Proceed</q-btn>
                <q-btn color="green" v-else icon="subdirectory_arrow_right" to="/cart">Proceed</q-btn>
            </q-card-actions>

            <q-banner dense rounded inline-actions v-if="mergeCheckout==true" class="q-my-lg text-white bg-red">
	            <div class="">Sorry for the location in your cart column you can only merge home-service and parkit-location service at a time please remove the mixed category</div>
	        </q-banner>
            <thead>
                <tr>
                    <th scope="col">Package</th>
                    <th scope="col">Location</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in cart" :key="item.id">
                    <td data-label="Package"><b>{{item.vehicle}}</b> - {{item.package}}</td>
                    <td data-label="Location">{{item.venue}}</td>
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
      		mergeCheckout: false,
		}
	},


	computed: {
        ...mapGetters({
            cart: 'adminShopping/cart',
            cartItemCount: 'adminShopping/cartItemCount',
            cartTotal: 'adminShopping/cartTotal',
            authenticated: 'auth/user',
			packageLocationCount: 'adminShopping/packageLocationCount',
			packageHomeOfficeCount: 'adminShopping/packageHomeOfficeCount',
        }),
        carTotalLength(){
            return "Cart (" + this.cartItemCount + ") - ₦" + this.cartTotal
        }
    },

	methods:{
		...mapActions({
			removeProductFromCart: 'adminShopping/removeProductFromCart',
			removeAllProductFromCart: 'adminShopping/removeAllProductFromCart',
			updateCartTotals: 'adminShopping/updateCartTotals',
			getCart: 'adminShopping/getCart',
		}),
	},

	mounted(){
		if(this.authenticated){
            this.getCart()
        }

        if(this.packageLocationCount > 0 && this.packageHomeOfficeCount > 0 ){
        	this.mergeCheckout = true
			return this.negativeNotification('sorry you can only group home-office and parkit-location at a time')
		}
	}
}
</script>