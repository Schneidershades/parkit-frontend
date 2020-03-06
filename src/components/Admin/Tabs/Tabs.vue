<template>
	<q-card flat>

		<h5 style="margin:0 0 30px 0;"><strong>SELECT VEHICLE PACKAGES</strong></h5>
		<div class="m">
			<q-splitter
				v-model="splitterModel"
				style="height: auto"
				>
				<template v-slot:before>
					<q-tabs
						v-model="tab"
						vertical
			      		color="primary"
						v-for="product in products.data" :key="product.id"
						>
						<q-tab :name="product.slug" v-html="product.svg_path" :label="product.type" />
						<q-tab :name="product.slug" :label="product.type"/>
					</q-tabs>
				</template>

				<template v-slot:after>
					<template v-if="!tab">
						<h3 class="text-center">>SELECT VEHICLE PACKAGE</h3>
					</template>
					<q-tab-panels bordered v-model="tab" animated class="row">
						<q-tab-panel :name="product.slug" v-for="product in products.data" :key="product.type">
							<div class="row wrap justify-around tab-card">
								<div class="q-pa-sm col-md-6 " v-for="content in product.packages" :key="content.id">
									<q-card class="my-card col-md-6">
										<q-card-section class="bg-primary text-white card-style" >
											<div >{{content.package}}</div>
											<q-card-actions align="right" >
												<q-btn flat class="card-style-action">
													<h6 class="card-amount
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
						</q-tab-panel>
					</q-tab-panels>
				</template>

			</q-splitter>
		</div>
	</q-card>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	data () {
		return {
			tab: null,
			name: 'mini-cart',
      		splitterModel: 20,
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