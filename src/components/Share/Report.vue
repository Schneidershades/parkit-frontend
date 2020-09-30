<template>
	<div class="q-pa-sm">
        <q-form @submit="sendReport" ref="form">
            <div class="row ">
            	<div class="col q-pa-sm">
            		<h5>Start Date</h5>
	                <q-input filled v-model="form.start_date" mask="date" :value="form.start_date" :rules="['date']">
	                    <template v-slot:append>
	                      <q-icon name="event" class="cursor-pointer">
	                          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
	                            <q-date v-model="form.start_date" />
	                          </q-popup-proxy>
	                      </q-icon>
	                    </template>
	                </q-input>
            	</div>

            	<div class="col q-pa-sm">
            		<h5>End Date</h5>
	                <q-input filled v-model="form.end_date" mask="date" :value="form.end_date" :rules="['date']">
	                    <template v-slot:append>
	                      <q-icon name="event" class="cursor-pointer">
	                          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
	                            <q-date v-model="form.end_date"  />
	                          </q-popup-proxy>
	                      </q-icon>
	                    </template>
	                </q-input>
            	</div>
            </div>
            
          	<q-card-actions>
            	<q-btn type="submit" unelevated color="primary" class="q-px-md" size="lg" label="Send Report" />
          	</q-card-actions>
        </q-form>
	</div>	
</template>


<script>

import { date } from 'quasar'
import { mapActions, mapGetters } from 'vuex'

export default {
	components: {
    },
	data () {
		return {
			form: {
		        start_date: '',
				end_date: '',
				locations: null,
		    },
		    options: null,
		}
	},

	computed: {
        ...mapGetters({
            orders: 'orders/orders',
            authenticated: 'auth/user',
            locations: 'location/locations',
        }),
    },

	methods:{
		...mapActions({
			sendReportAction: 'shareReport/sendReport',
        	getLocations: 'location/getLocations',
		}),

	 //    viewOrder(orderId) {
	 //      	return this.$router.push({ path: `/user/order/${orderId}` })
		// },

		sendReport(){
			this.sendReportAction(this.form).then((response) => {
				this.positiveNotification('your request has been sent')
            }).catch((error) => {
                console.log(error)
                if(this.errorMessage){
                    this.negativeNotification('cannot process request at the moment')
                }
            })
		},	

		optionsFn () {
     		var today = new Date();
  			var bu = today.getDate();
	      	
     		console.log(new Date())
     		var timeStamp = Date.now()
			var formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')
			return formattedString
	    },

	},
	mounted (){
		this.form.start_date =  this.optionsFn()
		this.form.end_date =  this.optionsFn()
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
}
</script>