<template>
	<q-card flat>
		<template v-if="!tab">
	        <h3 class="text-center">Kindly Select your Vehicle</h3>
	    </template>
		<q-tabs
          v-model="tab"
          vertical
          color="primary"
			>
			<div class="cbs-vehicle-list">
				<q-tab class="col-md-3 vehicle-cbs"  v-for="product in products.data" :name="product.slug" :label="product.type" 
				:icon="product.svg_path" size="xl" :key="product.slug" style="font-size:60px" v-if="product.slug == 'saloon_car' || product.slug == 'suv_space_bus' || product.slug == 'truck'">
		        </q-tab>
			</div>
		</q-tabs>


		<q-tab-panels bordered v-model="tab" animated class="row">
			<q-tab-panel :name="product.slug" v-for="product in products.data" :key="product.id">
				<div class="row wrap justify-around tab-card">
					<!-- <div class="q-pa-sm col-md-3 " v-for="content in product.packages" v-if="content.venue=='location' && content.package!='SINGLE WASH PACKAGE'"> -->

					<div class="q-pa-sm col-md-3 " v-for="content in product.packages" v-if="content.venue == 'home-office'">

						<q-card class="my-card" >
							<q-card-section class="bg-primary text-white card-style" >
								<div class="text-h6">{{content.package}}</div>
								<q-card-actions align="right" >
									<q-btn flat class="card-style-action"><h6 class="card-amount
										">₦{{content.amount}}</h6></q-btn>
								</q-card-actions>
							</q-card-section>

							<q-separator />

							<div class="q-pa-sm">
								<q-expansion-item
									dense
									dense-toggle
									expand-separator
									label="View Service Details"
									class="text-center"
									>
									<q-card>
										<q-card-section>
											<q-list separator>
												<template v-if="content.services.length">
													<q-item clickable v-ripple v-for="service in content.services" :key="service.id">
														<q-item-section>{{service.service}}</q-item-section>
													</q-item>
											    </template>
											    <template v-else="!content.services.length">
											        No Service Delivery
											    </template>
											</q-list>
										</q-card-section>
									</q-card>
								</q-expansion-item>
							</div>
							<q-card-actions align="right">
								<q-btn flat outline @click.prevent="addToCart(content)">
									Add to cart
								</q-btn>
							</q-card-actions>
						</q-card>
					</div>
				</div>
			</div>
			</q-tab-panel>
		</q-tab-panels>
	</q-card>
</template>

<style scoped>

.my-card{
	width: 300px;
}

.card-style{
	height: 200px;
}

.card-amount{
	padding: 0;
}

.card-style-action{
	bottom: 0;
}

.vehicle-cbs{
	flex-grow: 1;
	flex-basis: 140px;
	height: 147px;
	cursor: pointer;
	padding-top: 20px;
	border-width: 1px;
	border-style: solid;
	text-align: center;
	margin: 0px 6px 12px 6px;	
}

.cbs-vehicle-list{
	display: flex;
	flex-wrap: wrap;
	margin: auto;
	padding: 10px 50px;
}

</style>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	data () {
		return {
			tab: null,
			name: 'mini-cart',
		}
	},
	computed: {
		...mapGetters({
			products: 'shopping/products',
			tabsProducts: 'shopping/products',
			cart: 'shopping/cart',
		}),

		parsedTabInput() {
			return this.tab = this.products.data[0].slug
		}
	},
	methods:{
		...mapActions({
			getProducts: 'shopping/getProducts',
			addProductToCart: 'shopping/addProductToCart'
		}),

		addToCart(vehiclePackage){
			this.addProductToCart(vehiclePackage)
		}
	},

	mounted (){
		this.getProducts()
	},
}
</script>