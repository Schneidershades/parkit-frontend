<template>
	<q-card flat>
        <h4 class="header-text">Select a Package </h4>
		
        <div class="q-gutter-sm lt-md" >
	      <q-radio v-model="tab" v-for="product in products.data" size="sm" :val="product.slug" :label="product.type" :key="product.slug" :icon="product.svg_path" />
	    </div>




		<q-tabs
          v-model="tab"
          vertical
          color="primary"
          class="gt-sm"
			>
			<div class="cbs-vehicle-list">
				<q-tab class="col-md-3 vehicle-cbs"  v-for="product in products.data" :name="product.slug" :label="product.type" 
				:icon="product.svg_path" size="xl" :key="product.slug" style="font-size:60px">
		        </q-tab>
			</div>
		</q-tabs>




		<q-tab-panels bordered v-model="tab" animated class="row">
			<q-tab-panel :name="product.slug" v-for="product in products.data" :key="product.id">
				<div class="lt-md">
					<q-list class="rounded-borders">
						<q-item class=" col-md-12" v-for="content in product.packages" v-if="content.venue=='parkit-location'" :key ="content.slug">
							<q-item-section avatar top class="col-3 ">
								<q-icon name="account_tree" color="black" size="20px" />
								{{content.short_name}}
							</q-item-section>

							<q-item-section top class="col-7 q-pt-md">
								<q-item-label lines="1">

									<span class="text-weight-medium">[{{content.package}}]</span>
									<span class="text-grey-8"> @ {{content.venue}}</span>

								</q-item-label>
								<q-item-label caption lines="1" class="">
									<p v-if="content.services.length > 0" v-for="service in content.services" :key="service.id">
										<b>{{service.service}}<span v-if ='!service.last'>, </span></b>
									</p>
									<p v-else>			
										No Service 
									</p>
									<!-- @rstoenescu in #3: > Generic type parameter for props -->
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
					</q-list>
				</div>
				<div class="row wrap tab-card gt-sm">
					<div class="q-pa-sm col-md-3" v-for="content in product.packages" v-if="content.venue=='parkit-location'">
					<!-- <div class="q-pa-sm col-md-3 " v-for="content in product.packages" v-if="content.package!='SINGLE WASH'"> -->
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
	/*width: 300px;*/
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

/*img.q-tab{_icon.q-icon.notranslate{
	height: 60px;
	width: 60px;
	font-size: 60px;
}*/

.q-icon, .material-icons, .material-icons-outlined, .material-icons-round, .material-icons-sharp{
	height: 60px;
	width: 60px;
	font-size: 60px;
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