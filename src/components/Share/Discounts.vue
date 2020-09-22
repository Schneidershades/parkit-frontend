<template>
	<div class="q-pa-sm"  v-if="discounts">
		<q-btn type="submit" unelevated color="primary" class="q-my-md" size="md" label="Create New" @click="createModel = true" />
		
        <q-table
		    title="Discount"
		    :columns="columns"
		    row-key="type"
		    :data="discounts"
		    :grid="$q.screen.xs"
		    :pagination.sync="pagination"
	      	:filter="filterModel"
		    >
	    	<template v-slot:top-right>
		        <q-input borderless dense debounce="300" v-model="filterModel" placeholder="Search">
		          <template v-slot:append>
		            <q-icon name="search" v-model="filterModel"/>
		          </template> 
		        </q-input>
	      	</template>

		    <template slot="body" slot-scope="props">
		      	<q-tr :props="props">
		      		<q-td key="code" :props="props">{{props.row.code}}</q-td>
		      		<q-td key="type" :props="props">{{props.row.type ? props.row.type : 'N/A'}}</q-td>
		      		<q-td key="percentage" :props="props">{{props.row.percentage ? props.row.percentage : 'N/A'}}</q-td>
		      		<q-td key="amount" :props="props">{{props.row.amount ? props.row.amount : 'N/A'}}</q-td>
		      		<q-td key="actions" :props="props">nxu</q-td>
		      	</q-tr>
		    </template>
	    </q-table> 

	    <q-dialog v-model="createModel">
          	<q-card>
	            <q-card-section>
	              <div class="text-h6">Create a new type</div>
	            </q-card-section>

	            <q-separator />

	            <q-card-section style="max-height: 500vh">
	              	<q-form
		                @submit.prevent="saveModel"
		                ref="form"
		                >
		                <div class="row">
		                  	<div class="col-12 q-pa-sm">
			                    <q-input
			                    filled
			                    v-model="form.code"
			                    label="Discount Code *"
			                    mask="XXXXXXXXXXXXXXX"
			                    lazy-rules
			                    :rules="[ val => val && val.length > 0 || 'Please type a discount code']"
			                    />
			                </div>

			                <div class="col-12 q-pa-sm">
							    <div class="q-gutter-sm">
							      	<q-radio v-model="percentage" val="yes" label="Discount in Percentage" />
							      	<q-radio v-model="percentage" val="no" label="Discount in Amount" />
							    </div>
							</div>


		                	<div class="col-12 q-pa-sm" v-if="percentage=='yes'">
			                    <q-input
			                    filled
			                    v-model="form.percentage"
			                    label="Discount Percentage *"
			                    lazy-rules
			                    :rules="[ val => val && val.length > 0 || 'Please type a discount percentage']"
			                    />
			                </div>

			                <div class="col-12 q-pa-sm"  v-if="percentage=='no'">
			                    <q-input
			                    filled
			                    v-model="form.amount"
			                    label="Discount Amount *"
			                    lazy-rules
			                    :rules="[ val => val && val.length > 0 || 'Please type a discount amount']"
			                    />
		                	</div>

			                <div class="col-12 q-pa-sm">
			                    <q-select 
					                filled 
					                v-model="form.type" 
					                :options="discountLists" 
					                label="Select Discount Type *"
					                lazy-rules
					            />
			                </div>
		                </div>

		                <q-btn
		                  	type="submit"
		                  	label="Create Discount"
		                  	class="q-mt-md"
		                  	color="primary"
		                  	>
		                </q-btn>
	              	</q-form>
	            </q-card-section>

	            <q-separator />

	            <q-card-actions align="right">
	              <q-btn flat label="Close" color="primary" v-close-popup />
	            </q-card-actions>
          	</q-card>
        </q-dialog>
	</div>	
</template>


<script>

import { mapActions, mapGetters } from 'vuex'

export default {
	data () {
		return {
			form:{
		        code: '',
		        type: '',
                percentage: '',
                amount: '',
		    },

		    discountLists : [
		    	'online-discounts',
		    	'home-office'
		    ],

      		createModel: null,

		    filterModel: '',

			separator: 'cell',

			percentage: null,

			pagination: {
		        rowsPerPage: 30,
		        page: 1
		    },

		    text: '',
		    columns: [
		       {
		          name: 'type',
		          align: 'left',
		          label: 'Type',
		          field: 'type',
		          sortable: true
		       },
		       {
		          name: 'code',
		          align: 'left',
		          label: 'Code',
		          field: 'code',
		          sortable: true
		       },
		       {
		          name: 'percentage',
		          align: 'left',
		          label: 'Percentage',
		          field: 'percentage',
		          sortable: true
		       },
		       {
		          name: 'amount',
		          align: 'left',
		          label: 'Amount',
		          field: 'amount',
		          sortable: true
		       },


		       {
		          name: 'action',
		          align: 'left',
		          label: 'Action(s)',
		          field: 'action',
		          sortable: true
		       },
		    ],
		}
	},
	computed: {
        ...mapGetters({
            discounts: 'discounts/discounts',
        }),
    },

	methods:{
		...mapActions({
			getDiscounts: 'discounts/getDiscounts',
			postDiscount: 'discounts/postDiscount',
			updateDiscount: 'discounts/updateDiscount',
		}),

		saveModel(){
			this.postDiscount(this.form).then((response) => {
				this.createModel = false
            })
		},

		editModel(){
			this.updateDiscount(this.form).then((response) => {
				this.createModel = false
            })
		},


	},
	mounted (){
		this.getDiscounts()
	},
}
</script>