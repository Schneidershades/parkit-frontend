<template>
	<q-card flat>
        <h4 class="header-text">Select a Package (Home/Office Service)</h4>
		<q-tabs
          v-model="tab"
          vertical
          color="primary"
			>
			<div class="cbs-vehicle-list">
				<template v-for="product in products.data" >
					<q-tab :key="product.slug"  @click="dialog = true" class="col-md-3 vehicle-cbs" :name="product.slug" :label="product.type" :icon="product.svg_path" size="xl"  style="font-size:60px" v-if="product.slug == 'saloon_car' || product.slug == 'suv_space_bus' || product.slug == 'truck'">
			        </q-tab>
				</template>
			</div>
		</q-tabs>

		<q-dialog
	      v-model="dialog"
	      persistent
	      :maximized="maximizedToggle"
	      transition-show="slide-up"
	      transition-hide="slide-down"
	    >
	      <q-card class="bg-white">
	        <q-bar class="bg-primary text-white">
	          <q-space />
	          <q-btn dense flat icon="close" v-close-popup>
	            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
	          </q-btn>
	        </q-bar>

	        <q-card-actions align="around" class="q-px-md">
	          <q-btn dense size="20px" class="bg-primary text-white q-py-md q-my-md" icon="close" v-close-popup>Go Back</q-btn>
	          <q-btn dense size="20px" class="bg-green text-white q-py-md q-my-md" icon="shopping_cart" to="/cart">{{carTotalLength}}</q-btn>
	        </q-card-actions>

	        <q-card-section class="q-pt-none">
	          	<q-tab-panels bordered v-model="tab" animated class="row" id="items" >
					<q-tab-panel :name="product.slug" v-for="product in products.data" :key="product.id">
						<q-card-section>
				          <div class="text-h5 text-center">{{product.type}}</div>
				        </q-card-section>
						<div class="lt-md">
							<q-list class="rounded-borders">
								<template v-for="content in product.packages">
									<q-item :key="content.slug" v-if="content.venue=='home-office'">
										<q-item-section avatar top class="col-3">
											<q-icon name="account_tree" color="black" size="20px" />
											{{content.short_name}}
										</q-item-section>

										<q-item-section top class="col-7 q-pt-md">
											<q-item-label lines="1">
												<span class="text-weight-medium">[{{content.package}}]</span>
												<span class="text-grey-8"> @ {{content.venue}}</span>
											</q-item-label>

											<q-item-label caption lines="1" class="">
												<template v-if="content.services.length > 0" >
													<p v-for="service in content.services" :key="service.id">
														<b>{{service.service}}<span v-if ='!service.last'>, </span></b>
													</p>
												</template>
												<template v-else>
													<p>			
														No Service 
													</p>
												</template>
											</q-item-label>
											<q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
												<span class="cursor-pointer">₦{{content.amount}}</span>
											</q-item-label>
										</q-item-section>

										<q-item-section top side>
											<div class="text-grey-8 q-gutter-xs q-pt-md">
												<q-btn color="primary" icon="cart" size="10px" icon-right="shopping_cart" stack glossy label="Add to Cart" @click.prevent="addToCart(content)" />
											</div>
										</q-item-section>
									</q-item>
								</template>
							</q-list>
						</div>

						<div class="row wrap tab-card gt-sm">
							<template v-for="content in product.packages">
								<q-card class="my-card q-pa-sm col-3" :key="content.id" v-if="content.venue=='home-office'">
									<q-card-section class="bg-primary text-white card-style" >
										<div class="text-h6">{{content.package}}</div>
										<q-card-actions align="right" >
											<q-btn flat class="card-style-action">
												<div class="text-h6">₦{{content.amount}}</div>
											</q-btn>
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
														<template v-if="content.services.length > 0">
															<q-item clickable v-ripple v-for="service in content.services" :key="service.id">
																<q-item-section>{{service.service}}</q-item-section>
															</q-item>
													    </template>
													    <template v-else>
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
							</template>
						</div>
					</q-tab-panel>
				</q-tab-panels>
	        </q-card-section>
	      </q-card>
	    </q-dialog>
	</q-card>
</template>

<style scoped>

.header-text {
  	display: inline-block;
  	border: 0 solid #e91e63;
  	color: #c2185b;
  	border-top-width: 3px;
  	border-left-width: 10px;
  	padding: 4px;
  	font-weight: 700;
}

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
import { Notify } from 'quasar'

export default {
	data () {
		return {
			tab: null,
			name: 'mini-cart',
			dialog: false,
      		maximizedToggle: true
		}
	},
	computed: {
		...mapGetters({
			products: 'shopping/products',
			tabsProducts: 'shopping/products',
			cart: 'shopping/cart',
			cartItemCount: 'shopping/cartItemCount',
            cartTotal: 'shopping/cartTotal',
			packageLocationCount: 'shopping/packageLocationCount',
			packageHomeOfficeCount: 'shopping/packageHomeOfficeCount',
		}),

		carTotalLength(){
            return "Cart (" + this.cartItemCount + ") - ₦" + this.cartTotal 
        }
	},
	methods:{
		...mapActions({
			getProducts: 'shopping/getProducts',
			addProductToCart: 'shopping/addProductToCart'
		}),

		addToCart(vehiclePackage){
			// console.log(this.packageLocationCount, this.packageHomeOfficeCount)
			if(this.packageLocationCount > 0 && this.packageHomeOfficeCount > 0 ){
				return this.negativeNotification('sorry you can only group home-office and parkit-location at a time')
			}

			this.addProductToCart(vehiclePackage)
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
	},

	mounted (){
		this.getProducts()
	},
}
</script>