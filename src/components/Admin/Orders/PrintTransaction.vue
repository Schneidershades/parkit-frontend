
<template>
	<div class="ticket">
		<div id="ticket">
			<q-card-actions align="center">
	            <img src="statics/parkit_logo.png" alt="Parkit Home service" width="150">
	        </q-card-actions>
	        <p><b>Location : street city, state 0000 <br>
				Phone   : 555-555-5555 <br> 
				Email   : info@parkit.ng<br>
				Website   : www.parkit.ng<br><br>

				Bill ID   : www.parkit.ng<br>
				Date   : {{transactionDetails.customer.phone}}<br>
				Service Date   : www.parkit.ng<br>
				Cashier   : {{transactionDetails.customer.phone}}<br>
				To   : www.parkit.ng<br>
				Payment Method   : www.parkit.ng<br></b>
			</p>

			<br>
			<br>
			<br>
			<br>
			<br>
			<br>

			<!-- {{transactionDetails}} -->
			
			<div v-for="item in transactionDetails.products">
				<p><b>Package: {{item.package}}</b></p>
				<p><b>Location: {{item.venue}}</b></p>
				<p><b>Price: N {{item.amount}}</b></p>
				<hr>
			</div><br><br><br>
			<div  align="left">
				<p><b>sub-total: N{{transactionDetails.subtotal}}</b></p>
				<p><b>discount: N{{transactionDetails.discount}}</b></p>
				<p><b>total: N{{transactionDetails.total}}</b></p>
				<hr>
			</div>
		</div>
        <!-- <p class="centered">Thanks for your purchase!<br>parzibyte.me/blog</p> -->
		
	    <button type="button" @click="pr">
		    Print Form
		 </button>
    </div>
</template>


<style scoped>
	* {
	    font-size: 10px;
	    margin:0;
	    /*font-family: 'Times New Roman';*/
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

import { mapGetters } from 'vuex'
import print  from 'print-js'
const { remote } = require('electron')
// import {PosPrinter, PosPrintData, PosPrintOptions} from "electron-pos-printer";
// import * as path from "path";


export default {
	data () {
		return {
		}
	},
	computed: {
        ...mapGetters({
			transactionDetails: 'onlineTransaction/transactionDetails',
        }),
    },

    methods: {
    	pr(){
    		// remote.getCurrentWebContents().print()

   //  		var printContents = document.getElementById('ticket').innerHTML;
			// var originalContents = document.body.innerHTML;
			// document.body.innerHTML = printContents;
			// window.print();
			// document.body.innerHTML = originalContents;

    		print({printable: 'ticket', type: 'html'})
    	}
    }
}
</script>
