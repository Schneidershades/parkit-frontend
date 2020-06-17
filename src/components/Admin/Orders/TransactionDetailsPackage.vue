<template>
	<div class="q-pa-sm">
		<!-- {{transactionDetails}} -->
		<table>
            <thead>
                <tr>
                    <th scope="col">Package</th>
                    <th scope="col">Plate Number</th>
                    <th scope="col">Location</th>
                    <th scope="col">Vehicle</th>
                    <th scope="col">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in transactionDetails.products" :key="item.id">
                    <td data-label="Package"><b>{{item.vehicle}}</b> - {{item.package}}</td>
                    <td data-label="Quantity">
						<q-input
					      	ref="plate_number"
                    		v-model="form.plate_number"
					        label="Plate Number *"
					        filled
                            :dense="dense"
                            :readonly="readonly"
					        lazy-rules
					        :rules="[
					          val => val !== null && val !== '' || 'Please type a plate number'
					        ]"
					    />
					</td>
					<td data-label="Venue">
						<q-select 
                    		filled 
                    		v-model="form.vehicle_type" 
                    		:options="vehicles" 
                            label="Get Vehicle Type *"
                            lazy-rules
                            :dense="dense"
                            :readonly="readonly"
                        	:rules="[ val => val && val.length > 0 || 'Select a vehicle type']"
                    	/>
					</td>
					<td data-label="Quantity">{{item.quantity}}</td>
                    <td data-label="Unit">₦ {{item.amount}}</td>
                </tr>
                <tr>
					
                	<td colspan="2">
					   <q-btn color="primary" @click="vehicleDetails" label="Save Plate Number" />
                	</td>
                	<td colspan="3"></td>
                </tr>
                <tr>
                	<td colspan="4">
					    <b>Discount 
					    	<template v-if="transactionDetails.action == 'online-free-wash'"> - {{transactionDetails.action}}</template> 
					    </b>
                	</td>
                	<td><b v-if="transactionDetails.discount">₦ {{transactionDetails.discount}} </b></td>
                </tr>
                <tr>
                	<td colspan="4">
					    <b>Subtotal</b>
                	</td>
                	<td><b v-if="transactionDetails.sub_total">₦ {{transactionDetails.sub_total}}.00 </b></td>
                </tr>

                <tr>
                	<td colspan="4"><b>Total</b></td>
                	<td><h6>₦ {{transactionDetails.total}}.00</h6></td>
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

import { mapGetters, mapActions } from 'vuex'

export default {
	data () {
		return {
			form : {
				plate_number : '',
				vehicle_type : ''
			},
			dense: false,
			readonly: false,

			vehicles: [
		        'SALOON CAR', 
		        'SUV & SPACE BUS', 
		        'TRUCK', 
		        '14 SEATER BUS', 
		        '18 SEATER BUS', 
		        '32 SEATER BUS', 
		        '36 SEATER BUS', 
		        'PICKUP TRUCK', 
		        'CARGO TRUCK', 
		        'MOTOCYCLE', 
		    ],
		}
	},
	computed: {
        ...mapGetters({
			transactionDetails: 'onlineTransaction/transactionDetails',
        }),
    },

    methods: {

    	...mapActions({
			sendVehicleDetails: 'onlineTransaction/updateOrderPlateNumber',
        }),

    	vehicleDetails(){
    		this.sendVehicleDetails(this.form).then((res) => {
                this.readonly = true
            }).catch((error) => {
                this.errorMessages = error
                console.log(this.errorMessages)
                if(this.errorMessages){
                    this.negativeNotification(this.errorMessages)
                }
            }) 
    	}
    },

    mounted(){
    	if(this.transactionDetails.vehicle!=null){
    		this.form.plate_number = this.transactionDetails.vehicle ? this.transactionDetails.vehicle.plate_number : null;
    		this.readonly = true
    	}
    	if(this.transactionDetails.vehicle!=null){
    		this.form.vehicle_type = this.transactionDetails.vehicle ? this.transactionDetails.vehicle.vehicle_type : null;
    		this.readonly = true
    	}
    }
}
</script>