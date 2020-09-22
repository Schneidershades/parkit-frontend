
<template>
	<div class="ticket">
		<div id="ticket" class="print-only">
			<q-card-actions align="center">
	            <img src="~assets/parkit_logo.png" alt="Parkit Home service" width="150">
	        </q-card-actions>
	        <p>Location : street city, state 0000 <br>
				Phone   : 555-555-5555 <br> 
				Email   : info@parkit.ng<br>
				Website   : www.parkit.ng<br><br>

				Bill ID   : www.parkit.ng<br>
				Date   : {{transactionDetails.customer.phone}}<br>
				Service Date   : www.parkit.ng<br>
				Cashier   : {{transactionDetails.customer.phone}}<br>
				To   : www.parkit.ng<br>
				Payment Method   : www.parkit.ng<br>
			</p>

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
	    font-size: 13px;
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

</style>


<script>

import { mapGetters } from 'vuex'
import printJS  from 'print-js'
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

    		printJS({printable: 'ticket', type: 'html'})
    	}
    }
}
</script>




<template>
	<div class="ticket">
		<div id="invoice-POS" >
			<q-card-actions align="center">
	            <img src="~assets/parkit_logo.png" alt="Parkit Home service" width="120">
	        </q-card-actions> 
	        <q-card-actions align="center">
	            <p align="center">Book Online to get 10% off <br><b>PARKIT.NG</b></p>
	        </q-card-actions> 


			<div id="mid">
				<div class="info">
					<p>Location : street city, state 0000 <br>
						Phone   : 555-555-5555 <br> 
						Email   : JohnDoe@gmail.com<br>
						Website   : www.parkit.ng<br><br>

						Bill ID   : www.parkit.ng<br>
						Date   : www.parkit.ng<br>
						Service Date   : www.parkit.ng<br>
						Cashier   : www.parkit.ng<br>
						To   : www.parkit.ng<br>
						Payment Method   : www.parkit.ng<br>
					</p>
				</div>
			</div><!--End Invoice Mid-->

			<div id="bot">

				<div id="table">
					<table>
						<tr class="tabletitle">
							<td class="item"><p>Item</p></td>
							<td class="Hours"><p>Qty</p></td>
							<td class="Rate"><p>Amount</p></td>
						</tr>

						<tr class="service">
							<td class="tableitem"><p class="itemtext">Communication</p></td>
							<td class="tableitem"><p class="itemtext">5</p></td>
							<td class="tableitem"><p class="itemtext">$375.00</p></td>
						</tr>

						<tr class="service">
							<td class="tableitem"><p class="itemtext">Asset Gathering</p></td>
							<td class="tableitem"><p class="itemtext">3</p></td>
							<td class="tableitem"><p class="itemtext">$225.00</p></td>
						</tr>

						<tr class="service">
							<td class="tableitem"><p class="itemtext">Design Development</p></td>
							<td class="tableitem"><p class="itemtext">5</p></td>
							<td class="tableitem"><p class="itemtext">$375.00</p></td>
						</tr>

						<tr class="service">
							<td class="tableitem"><p class="itemtext">Animation</p></td>
							<td class="tableitem"><p class="itemtext">20</p></td>
							<td class="tableitem"><p class="itemtext">$1500.00</p></td>
						</tr>

						<tr class="service">
							<td class="tableitem"><p class="itemtext">Animation Revisions</p></td>
							<td class="tableitem"><p class="itemtext">10</p></td>
							<td class="tableitem"><p class="itemtext">$750.00</p></td>
						</tr>


						<tr class="tabletitle">
							<td></td>
							<td ><p >Discount</p></td>
							<td ><p >$419.25</p></td>
						</tr>

						<tr class="tabletitle">
							<td></td>
							<td class="Rate"><p>Total</p></td>
							<td class="payment"><p>$3,644.25</p></td>
						</tr>

					</table>
				</div><!--End Table-->

				<div id="legalcopy">
					<p class="legal"><strong>Thank you for your business!</strong>  Payment is expected within 31 days; please process this invoice within that time. There will be a 5% interest charge per month on late invoices. 
					</p>
				</div>
			</div><!--End InvoiceBot-->
		</div><!--End Invoice-->

		<button type="button" @click="pr">
		    Print Form
		 </button>
	</div>
		
</template>

<style scoped>
	#invoice-POS {
		 box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
		 padding: 0mm;
		 margin: 0;
		 width: 58mm;
		 background: #fff;
	}
	@page 
	{
	    size: auto;   /* auto is the initial value */
	    margin: 0 !important;  /* this affects the margin in the printer settings */
	}
	 #invoice-POS ::selection {
		 background: #f31544;
		 color: #fff;
	}
	 #invoice-POS ::moz-selection {
		 background: #f31544;
		 color: #fff;
	}
	 #invoice-POS h1 {
		 font-size: 1.5em;
		 color: #222;
	}
	 #invoice-POS h2 {
		 font-size: 1.2em;
	}
	 #invoice-POS h3 {
		 font-size: 1.2em;
		 font-weight: 300;
		 line-height: 2em;
	}
	 #invoice-POS p {
		 font-size: 0.7em;
		 color: #666;
		 /*line-height: 1.2em;*/
	}
	 #invoice-POS #top, #invoice-POS #mid, #invoice-POS #bot {
		/* Targets all id with 'col-' */
		 border-bottom: 1px solid #eee;
	}
	 #invoice-POS #top {
		 min-height: 100px;
	}
	 #invoice-POS #mid {
		 min-height: 80px;
	}
	 #invoice-POS #bot {
		 min-height: 50px;
	}
	 #invoice-POS #top .logo {
		 height: 60px;
		 width: 60px;
		 background: url(http://michaeltruong.ca/images/logo1.png) no-repeat;
		 background-size: 60px 60px;
	}
	 #invoice-POS .clientlogo {
		 float: left;
		 height: 60px;
		 width: 60px;
		 background: url(http://michaeltruong.ca/images/client.jpg) no-repeat;
		 background-size: 60px 60px;
		 border-radius: 50px;
	}
	 #invoice-POS .info {
		 display: block;
		 margin-left: 0;
	}
	 #invoice-POS .title {
		 float: right;
	}
	 #invoice-POS .title p {
		 text-align: right;
	}
	 #invoice-POS table {
		 width: 100%;
		 border-collapse: collapse;
	}
	 #invoice-POS .tabletitle {
		 font-size: 0.9em;
		 background: #eee;
	}
	 #invoice-POS .service {
		 border-bottom: 1px solid #eee;
	}
	 #invoice-POS .item {
		 width: 24mm;
	}
	 #invoice-POS .itemtext {
		 font-size: 0.5em;
	}
	 /*#invoice-POS #legalcopy {
		 margin-top: 5mm;
	}*/
</style>


<script>

import { mapGetters } from 'vuex'
import printJS  from 'print-js'
const { remote } = require('electron')
// const { remote } = require('electron')

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
    		printJS({printable: 'invoice-POS', type: 'html'})
    		// console.log(remote)
    	}
    }

}
</script>
