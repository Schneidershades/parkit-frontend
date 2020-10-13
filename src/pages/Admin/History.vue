<template>
	<q-page padding>
      	<div class="q-pa-md q-gutter-sm print-hide">
	      	<q-breadcrumbs>
		        <q-breadcrumbs-el label="Home" />
		        <q-breadcrumbs-el label="Orders"/>
	      	</q-breadcrumbs>
	    </div>

	    <div class="q-pa-md q-gutter-sm print-hide row">
	    	<!-- {{dashboard}} -->
	    	<div class="col">
	    		<q-card
			      class="my-card text-white"
			      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
			    >	


			      	<q-card-section class="row">

			      		<div class="col-12">
				        	<div class="text-h5 q-mb-md">Recent Transactions</div>
				      	</div>

				      	<div class="col-3">
				        	<div class="text-subtitle2">Recent</div>
				      		<div class="text-h6">₦ {{todaysOrderTransaction ? todaysOrderTransaction : '0'}}.00</div>
				      	</div>

				      	<div class="col-3">
				        	<div class="text-subtitle2">CARS</div>
				      		<div class="text-h6">{{carTransactionToday ? carTransactionToday : '0'}}</div>
				      	</div>

				      	<div class="col-3">
				        	<div class="text-subtitle2">POS</div>
				      		<div class="text-h6">₦ {{posTransactionToday ? posTransactionToday : '0'}}.00</div>
				      	</div>

				      	<div class="col-3">
				        	<div class="text-subtitle2">CASH</div>
				      		<div class="text-h6">₦ {{cashTransactionToday ? cashTransactionToday : '0'}}.00</div>
				      	</div>

				      	<div class="col-3 q-pt-md">
				        	<div class="text-subtitle2">NOT PAID</div>
				      		<div class="text-h6">₦ {{notPaidTransactionToday ? notPaidTransactionToday : '0'}}.00</div>
				      	</div>
				      	<div class="col-3 q-pt-md">
				        	<div class="text-subtitle2">PENDING</div>
				      		<div class="text-h6">₦ {{pendingTransactionToday ? pendingTransactionToday : '0'}}.00</div>
				      	</div>
				      	<div class="col-3 q-pt-md">
				        	<div class="text-subtitle2">EDIT</div>
				      		<div class="text-h6">₦ {{editTransactionToday ? editTransactionToday : '0'}}.00</div>
				      	</div>
				      	<div class="col-3 q-pt-md">
				        	<div class="text-subtitle2">DELETE</div>
				      		<div class="text-h6">₦ {{deleteTransactionToday ? deleteTransactionToday : '0'}}.00</div>
				      	</div>
				      	<!-- <div class="col-3 q-pt-md">
				        	<div class="text-subtitle2">BALANCED</div>
				      		<div class="text-h6">no</div>
				      	</div> -->
			      	</q-card-section>

			        <!-- <div class="text-h5">₦ {{user.location.weeklyAmount}}.00</div> -->
			    </q-card>
	    	</div>
	    	<div class="col">
	    		<q-card
			      class="my-card text-white"
			      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
			    >

			      	<q-card-section class="row">

			      		<div class="col-12">
				        	<div class="text-h5 q-mb-md">Today's Transactions</div>
				      	</div>

				      	<div class="col-3">
				        	<div class="text-subtitle2">Today</div>
				      		<div class="text-h6">₦ {{dashboard.orders.today.transaction}}.00</div>
				      	</div>

				      	<div class="col-3">
				        	<div class="text-subtitle2">CARS</div>
				      		<div class="text-h6">{{dashboard.orders.today.cars}}</div>
				      	</div>

				      	<div class="col-3">
				        	<div class="text-subtitle2">POS</div>
				      		<div class="text-h6">₦ {{dashboard.orders.today.pos}}.00</div>
				      	</div>

				      	<div class="col-3">
				        	<div class="text-subtitle2">CASH</div>
				      		<div class="text-h6">₦ {{dashboard.orders.today.cash}}.00</div>
				      	</div>

				      	<div class="col-3 q-pt-md">
				        	<div class="text-subtitle2">NOT PAID</div>
				      		<div class="text-h6">₦ {{dashboard.orders.today.not_paid}}.00</div>
				      	</div>
				      	<div class="col-3 q-pt-md">
				        	<div class="text-subtitle2">PENDING</div>
				      		<div class="text-h6">₦ {{dashboard.orders.today.pending}}.00</div>
				      	</div>
				      	<div class="col-3 q-pt-md">
				        	<div class="text-subtitle2">EDIT</div>
				      		<div class="text-h6">₦ {{dashboard.orders.today.edit}}.00</div>
				      	</div>
				      	<div class="col-3 q-pt-md">
				        	<div class="text-subtitle2">DELETE</div>
				      		<div class="text-h6">₦ {{dashboard.orders.today.delete}}.00</div>
				      	</div>
				      	<!-- <div class="col-3 q-pt-md">
				        	<div class="text-subtitle2">BALANCED</div>
				        	{{dashboard.orders.today.transaction}}
				        	{{todaysOrderTransaction}}
				      		<div class="text-h6" 
				      			v-if="dashboard.orders.today.transaction == todaysOrderTransaction ? todaysOrderTransaction :0">yes</div>
				      		<div class="text-h6" v-else>no</div>
				      	</div> -->

			      	</q-card-section>
			    </q-card>
	    	</div>
	    </div>
	    <div id="ticketPrinter" v-if="orderDetails!=null">
			<div class="ticket print-only" v-if="orderDetails!=null">

				<q-card-actions align="center">
		            <img src="~assets/parkit_logo.png" alt="Parkit Home service" width="150">
		            <i>Welcome to parkit</i>
		        </q-card-actions>

		        <div class="q-py-sm">
		        	<b>Location : {{orderDetails.location ? orderDetails.location.code : ''}} -  {{orderDetails.location ? orderDetails.location.address : ''}}<br>
					Phone   : +234-903-152-6466 <br> 
					Email   : info@parkit.ng<br>
					Website   : www.parkit.ng<br></b>
				</div>
				<div class="q-py-sm">
					<b>Bill ID   : {{orderDetails.receipt_number}}<br>
					Date   : {{orderDetails.date}}<br>
					Time   : {{orderDetails.time}}<br>
					Cashier   : {{orderDetails.cashier}}<br>
					To   : {{orderDetails.vehicle.first_name ? orderDetails.vehicle.first_name : 'N/A'}} {{orderDetails.vehicle.last_name}}<br>
					Transaction ID   : {{orderDetails.vehicle.plate_number}}<br>
					Payment Method   : {{orderDetails.payment_method == 'not_paid' ? 'Not Paid' : ''}}
					{{orderDetails.payment_method == 'pos' ? 'POS' : ''}}
					{{orderDetails.payment_method == 'cash' ? 'Cash' : ''}}
					{{orderDetails.payment_method == 'transfer' ? 'Transfer' : ''}}

					<br></b>
		        </div>
		       		
				<div class="text-h6">Items</div>
				
				<div class="q-py-sm" v-for="item in orderDetails.packages" :key="item.id">
					<p>
						<b>{{item.package}} - {{item.vehicle}}  || {{item.quantity}} @ ₦ {{item.amount}} || Total: ₦ {{item.total}}</b>
					</p>
				</div>
				<div class="q-py-sm" >
					<b align="right">Sub-total: ₦{{orderDetails.sub_total}}<br>
					<template v-if="orderDetails.discount!=null">
						<template v-if="orderDetails.discount.amountDiscount != null">
							Net-Total: ₦ {{ orderDetails.discount.amountDiscount }}
						</template>
						<template v-if="orderDetails.discount.percentageDiscount != null">
							Net-Total: ₦ {{ orderDetails.percentageDiscount/100 * orderDetails.sub_total }}
						</template>
					</template>
					<template v-if="orderDetails.coupon!=null">
						<template v-if="orderDetails.coupon.amountDiscount != null">
							Net-Total: ₦ {{ orderDetails.coupon.amountDiscount }}
						</template>
						<template v-if="orderDetails.coupon.percentageDiscount != null">
							Net-Total: ₦ {{ orderDetails.coupon.percentageDiscount/100 * orderDetails.sub_total }}
						</template>
					</template>

					<template v-if="orderDetails.discount==null && orderDetails.coupon==null">
						Net-Total: ₦ 0.00
					</template>
					
					<br>
					Total: ₦ {{orderDetails.total ? orderDetails.total : '0.00'}}</b>
					<br><br><br>
		            	<i>Thank you for your patronage</i>
		            	<hr>
		            <b align="center"><i>Would you like to own a parkit car wash Franchise or be a parkit car wash mobile operator
						Call: 09031526466 or send a mail to franchise@parkit.ng
					</i></b>
					<br><br>
					<br>

					<hr>
				</div>
			</div>
	    </div>

	    <div id="ticketPrinter" v-if="onlineOrderDetails!=null">
			<div class="ticket print-only" v-if="onlineOrderDetails!=null">
				<q-card-actions align="center">
		            <img src="~assets/parkit_logo.png" alt="Parkit Home service" width="150">
		            <i>Welcome to parkit</i>
		        </q-card-actions>

		        <div class="q-py-sm">
		        	<b>Location : {{onlineOrderDetails.location ? onlineOrderDetails.location.code : ''}} -  {{onlineOrderDetails.location ? onlineOrderDetails.location.address : ''}}<br>
					Phone   : +234-903-152-6466 <br> 
					Email   : info@parkit.ng<br>
					Website   : www.parkit.ng<br></b>
				</div>
				<div class="q-py-sm">
					<b>Bill ID   : {{onlineOrderDetails.receipt_number}}<br>
					Date   : {{onlineOrderDetails.date}}<br>
					Time   : {{onlineOrderDetails.time}}<br>
					Cashier   : {{onlineOrderDetails.cashier}}<br>
					To   : {{onlineOrderDetails.customer ? onlineOrderDetails.customer.firstName : 'N/A'}} {{onlineOrderDetails.customer  ? onlineOrderDetails.customer.lastName : ''}}<br>
					Transaction ID   : {{onlineOrderDetails.vehicle ? onlineOrderDetails.vehicle.plateNumber : 'N/A'}}<br>
					Payment Method   : {{onlineOrderDetails.payment_method == 'not_paid' ? 'Not Paid' : ''}}
					{{onlineOrderDetails.payment_method == 'pos' ? 'POS' : ''}}
					{{onlineOrderDetails.payment_method == 'cash' ? 'Cash' : ''}}
					{{onlineOrderDetails.payment_method == 'transfer' ? 'Transfer' : ''}}

					<br></b>
		        </div>
		       		
				<div class="text-h6">Items</div>
				
				<div class="q-py-sm" v-for="item in onlineOrderDetails.products" :key="item.id">
					<p>
						<b>{{item.package}} - {{item.vehicle}}  || {{item.quantity}} @ ₦ {{item.amount}} || Total: ₦ {{item.total}}</b>
					</p>
				</div>
				<div class="q-py-sm" >
					<b align="right">Sub-total: ₦{{onlineOrderDetails.sub_total}}<br>
					<template v-if="onlineOrderDetails.discountDetails!=null">
						<template v-if="onlineOrderDetails.discountDetails.amount != null && onlineOrderDetails.discountDetails.amount > 0">
							Discount: ₦ {{ onlineOrderDetails.discountDetails.amount }}
						</template>
						<template v-if="onlineOrderDetails.discountDetails.percentage != null  && onlineOrderDetails.discountDetails.percentage > 0">
							Discount: ₦ {{ onlineOrderDetails.percentage/100 * onlineOrderDetails.sub_total }}
						</template>
					</template>
					<template v-if="onlineOrderDetails.discountCoupon!=null">
						<template v-if="onlineOrderDetails.discountCoupon.amount != null && onlineOrderDetails.discountCoupon.amount > 0">
							eee
							Discount: ₦ {{ onlineOrderDetails.discountCoupon.amount }}
						</template>
						<template v-if="onlineOrderDetails.discountCoupon.percentage != null  && onlineOrderDetails.discountCoupon.percentage > 0">
							Discount: ₦ {{ onlineOrderDetails.discountCoupon.percentage /100 * onlineOrderDetails.sub_total }}
						</template>
					</template>

					<template v-if="onlineOrderDetails.discountDetails==null && onlineOrderDetails.discountCoupon==null">
						Discount: ₦ 0.00
					</template>
					
					<br>
					Total: ₦ {{onlineOrderDetails.total ? onlineOrderDetails.total : '0.00'}}</b>
					<br><br><br>
		            	<i>Thank you for your patronage</i>
		            	<hr>
					<br><br>
					
					<hr>
				</div>
			</div>
	    </div>

	    <div class="q-pa-md print-hide">
		    <div class="q-gutter-y-md">
		        <q-table
				    title="Recent Transactions"
			      	:data="orders"
			      	:columns="columns"
			      	row-key="name"
		      		:filter="recentFilter"
		    		:pagination.sync="pagination"
				    >
				    <template v-slot:top-right>
				        <q-input borderless dense debounce="300" v-model="recentFilter" placeholder="Search">
				          <template v-slot:append>
				            <q-icon name="search" v-model="recentFilter"/>
				          </template> 
				        </q-input>
			      	</template>
				    <template slot="body" slot-scope="props">
				      	<q-tr :props="props">
				      		<q-td key="date" :props="props">{{ props.row.date }} - {{ props.row.time }}</q-td>
				      		<q-td key="receipt_number" :props="props">{{props.row.receipt_number}}</q-td>
				      		<q-td key="vehicle" :props="props">{{ props.row.vehicle.plate_number }}</q-td>
				      		<q-td key="packages" :props="props">{{ props.row.packages.length }}</q-td>

				      		<q-td key="sub_total" :props="props">{{ props.row.sub_total }}</q-td>
			
				      		<q-td key="discount" :props="props">
					      		<template v-if="props.row.discount">
					      			<template v-if="props.row.discount.amountDiscount > 0">
					      				{{ props.row.discount ? props.row.discount.amountDiscount : 0.00}}
					      			</template>

					      			<template v-if="props.row.discount.percentageDiscount > 0">
					      				{{ props.row.discount.percentageDiscount/100 * props.row.sub_total}}
					      			</template>
				      			</template>
				      			<template v-if="props.row.coupon">
					      			<template v-if="props.row.coupon.amountDiscount > 0">
					      				{{ props.row.coupon.amountDiscount ? props.row.coupon.amountDiscount : 0.00}}
					      			</template>

					      			<template v-if="props.row.coupon.percentageDiscount > 0">
					      				{{ props.row.coupon.percentageDiscount/100 * props.row.sub_total }}
					      			</template>
				      			</template>
				      			<template v-if="props.row.coupon ==null && props.row.discount==null">
					      			{{ props.row.discounted_amount ? props.row.discounted_amount : 0.00}}
				      			</template>
					      	</q-td>



				      		<q-td key="total" :props="props">{{ props.row.total ? props.row.total : '0.00' }}</q-td>

				      		<q-td key="payment_method" :props="props">{{ props.row.payment_method }}</q-td>

				      		<q-td key="action" :props="props">
				      			<template v-if="props.row.status == 'pending' || props.row.status == 'processing' ">
				      				<q-btn color="orange"  icon="edit" @click="editRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'complete' ? true : false"/>
					      			<q-btn color="red"  icon="delete"  @click="deleteRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'complete' ? true : false"/>
					      			<q-btn color="green"  icon="check" @click="completeRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'complete' ? true : false"/>
				      			</template>

				      			<template v-if="props.row.status == 'edit' ">
					      			<q-btn color="orange" icon="edit" @click="completeRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'edit' ? true : false"/>
				      			</template>

				      			<template v-if="props.row.status == 'delete' ">
					      			<q-btn color="red"  icon="delete" @click="completeRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'delete' ? true : false"/>
				      			</template>

				      			<template v-if="props.row.status == 'complete' ">
					      			<q-btn color="green"  icon="check" @click="completeRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'complete' ? true : false"/>
				      			</template>

				      			<q-btn color="purple" class="q-mx-sm" icon="print" @click="printOrderTransaction(props.row)"/>

				      		</q-td>
				      	</q-tr>
				    </template>
			    </q-table>

 				<q-table
				    title="All Transactions"
			      	:data="history"
			      	:columns="columns"
			      	row-key="name"
		      		:filter="filterExpense"
		      		v-if="history!=null"
		    		:pagination.sync="pagination"
				    >
				    <template v-slot:top-right>
				        <q-input borderless dense debounce="300" v-model="filterExpense" placeholder="Search">
				          <template v-slot:append>
				            <q-icon name="search" v-model="filterExpense"/>
				          </template> 
				        </q-input>
			      	</template>

				    <template slot="body" slot-scope="props">
				      	<q-tr :props="props">
				      		<q-td key="date" :props="props">{{ props.row.transaction_initiated }}</q-td>
				      		<q-td key="receipt_number" :props="props">{{ props.row.receipt_number }}</q-td>
				      		<q-td key="vehicle" :props="props">{{ props.row.vehicle ? props.row.vehicle.plateNumber : null }}</q-td>
				      		<q-td key="packages" :props="props">{{ props.row.packages }}</q-td>
				      		<q-td key="sub_total" :props="props">{{ props.row.sub_total }}</q-td>
				      		<q-td key="discount" :props="props">{{ props.row.discount }}</q-td>
				      		<q-td key="total" :props="props">{{ props.row.total ? props.row.total : '0.00'}}</q-td>

				      		<q-td key="payment_method" :props="props">{{ props.row.payment_method }}</q-td>

				      		<q-td key="action" :props="props">
				      			<template v-if="props.row.status == 'pending' || props.row.status == 'processing'">
				      				<q-btn color="purple" icon="swap_vertical_circle" @click="completeRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'pending' ? true : false"/>
				      				<!-- <q-btn color="orange"  icon="edit" @click="editRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'complete' ? true : false"/>
					      			<q-btn color="red"  icon="delete"  @click="deleteRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'complete' ? true : false"/>
					      			<q-btn color="green"  icon="check" @click="completeRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'complete' ? true : false"/> -->
				      			</template>

				      			<template v-if="props.row.status == 'edit' ">
					      			<q-btn color="orange" icon="edit" @click="completeRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'edit' ? true : false"/>
				      			</template>

				      			<template v-if="props.row.status == 'delete' ">
					      			<q-btn color="red"  icon="delete" @click="completeRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'delete' ? true : false"/>
				      			</template>

				      			<template v-if="props.row.status == 'complete' ">
					      			<q-btn color="green"  icon="check" @click="completeRequestOrderTransaction(props.row)" v-bind:disabled="props.row.status === 'complete' ? true : false"/>
				      			</template>

				      			<q-btn color="purple" class="q-mx-sm" icon="print" @click="printOnlineOrderTransaction(props.row)" />

				      		</q-td>
				      	</q-tr>
				    </template>
			    </q-table>

			    <q-dialog v-model="completeTransaction" width="500">
			    	<q-card>
			    		<q-card-section>
			    			<div class="text-h6">Complete Transaction Details</div>
			    		</q-card-section>

			    		<q-separator />
			    		<q-card-section style="width: 500px; max-height: 50vh; max-width: 80vw;" class="scroll" v-if="orderDetails">
			    			Are you sure you want to complete transaction
			    			<q-form
				                @submit.prevent="sendRequestBtn('complete')"
				                ref="form"
				                >
				                <div v-if="orderDetails.status=='pending'">
									<div class="q-gutter-sm" v-if="orderDetails.free_wash=='yes'">
								      	<q-radio v-model="action.payment_method" val="free" label="Free Wash" checked/>
								    </div>
								    <div class="q-gutter-sm" v-if="orderDetails.payment_method=='not_paid' || orderDetails.payment_method== null ">
							      		<q-radio v-model="action.payment_method" val="pos" label="POS Machine" />
							      		<q-radio v-model="action.payment_method" val="cash" label="Cash" />
								    </div>

						        	<div v-if="orderDetails.payment_status=='successful' && orderDetails.payment_method=='card' || orderDetails.payment_method=='online'">
						        		<q-radio v-model="action.payment_method" val="card" label="Card" checked/>
						        		User Paid Online (<i>Please proceed</i>)
						        	</div>
					        	</div>

				                <input type="hidden" v-model="action.action" value="complete">
				                
				                <q-btn
					                type="submit"
					                label="Complete Transaction"
					                class="q-mt-md"
					                color="primary" 
					                v-if="orderDetails.payment_method!='not_paid' && action.payment_method!='not_paid' ||action.payment_method!=null" 
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

			    <q-dialog v-model="editTransaction" width="500">
			    	<q-card v-if="editPrivilege==true">
			    		<q-card-section>
			    			<div class="text-h6">Edit Transaction</div>
			    		</q-card-section>

			    		<q-separator />

			    		<q-card-section style="width: 500px; max-height: 50vh; max-width: 80vw;" class="scroll" v-if="orderDetails">
			    			<q-form
				                @submit.prevent="sendRequestBtn('edit')"
				                ref="form"
				                
				                >
				                <div class="row">
				                  <div class="col-12 q-pa-sm">
				                    <q-input
				                    v-model="action.reason"
				                    filled
				                    type="textarea"
				                    label="State Reason *"
				                    lazy-rules
				                    :rules="[ val => val && val.length > 0 || 'Please type a contact address']"
				                    />
				                  </div>
				                  	<div class="col-12 q-pa-sm">
				                    	<div v-if="orderDetails.status=='pending'">
											<div class="q-gutter-sm" v-if="orderDetails.free_wash=='yes'">
										      	<q-radio v-model="action.payment_method" val="free" label="Free Wash" checked/>
										    </div>
										    <div class="q-gutter-sm" v-if="orderDetails.payment_method=='not_paid' || orderDetails.payment_method== null ">
									      		<q-radio v-model="action.payment_method" val="pos" label="POS Machine" />
									      		<q-radio v-model="action.payment_method" val="cash" label="Cash" />
										    </div>

								        	<div v-if="orderDetails.payment_status=='successful' && orderDetails.payment_method=='card' || orderDetails.payment_method=='online'">
								        		<q-radio v-model="action.payment_method" val="card" label="Card" checked/>
								        		User Paid Online (<i>Please proceed</i>)
								        	</div>
							        	</div>
				                  	</div>
					                  
				                </div>

				                <q-btn
				                  type="submit"
				                  label="Edit Request"
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
					<EditRequest v-else></EditRequest>		
			    </q-dialog>

			    <q-dialog v-model="deleteTransaction" width="500">
			    	<q-card v-if="deletePrivilege==true">
			    		<q-card-section>
			    			<div class="text-h6">Delete Transaction</div>
			    		</q-card-section>

			    		<q-separator />

			    		<q-card-section style="width: 500px; max-height: 50vh; max-width: 80vw;" class="scroll" v-if="orderDetails">
			    			<q-form
				                @submit.prevent="sendRequestBtn('delete')"
				                ref="form"
				                >
				                <div class="row">
				                  
					                <div class="col-12 q-pa-sm">
					                    <q-input
					                    v-model="action.reason"
					                    filled
					                    type="textarea"
					                    label="State Reason *"
					                    lazy-rules
					                    :rules="[ val => val && val.length > 0 || 'Please type a contact address']"
					                    />
					                  </div>

					                  <div class="col-12 q-pa-sm">
				                    	<div v-if="orderDetails.status=='pending'">
											<div class="q-gutter-sm" v-if="orderDetails.payment_method=='free'">
										      	<q-radio v-model="action.payment_method" val="free" label="Free Wash" checked/>
										    </div>
										    <div class="q-gutter-sm" v-if="orderDetails.payment_method=='not_paid'">
									      		<q-radio v-model="action.payment_method" val="pos" label="POS Machine" />
									      		<q-radio v-model="action.payment_method" val="cash" label="Cash" />
										    </div>

								        	<div v-if="orderDetails.payment_status=='successful' && orderDetails.payment_method=='card' || orderDetails.payment_method=='online'">
								        		<q-radio v-model="action.payment_method" val="card" label="Card" checked/>
								        		User Paid Online (<i>Please proceed</i>)
								        	</div>
							        	</div>
				                  	</div>
					            </div>

				                <q-btn				                		
				                  type="submit"
				                  label="Delete Request"
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
					<DeleteRequest v-else></DeleteRequest>
			    </q-dialog>
		    </div>
	    </div>
  	</q-page>
</template>


<style scoped>
	@page { margin: 0; }
	.ticket {
	    font-size: 11px;
	    margin:0;
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

import { mapActions, mapGetters } from 'vuex'
import Orders from 'components/Admin/Orders/Orders.vue'
import EditRequest from 'components/Admin/Modal/EditRequest.vue'
import DeleteRequest from 'components/Admin/Modal/DeleteRequest.vue'
import { date } from 'quasar'
import { Notify } from 'quasar'
const { remote } = require('electron')

export default {
	components: {
		// Orders,
		EditRequest,
		DeleteRequest
	},

	data () {
		return {
      		fixedIncomeDialog: false,
      		fixedExpenseDialog: false,
      		seeTransaction: false,
			// pagination: {
		 //        rowsPerPage: 1
		 //    },

		    filterExpense: '',
		    recentFilter: '',
		    action: {
		    	orderDetails: null,
		    	reason: null,
		    	action: null,
		    	payment_method: null,
		    },



			pagination: {
		        rowsPerPage: 10,
		        page: 1,
		        sortBy: 'desc',
        		descending: false,
        		// rowsNumber: 100
		    },

		    
		    editTransaction: false,
		    deleteTransaction: false,
		    completeTransaction: false,
		    filterIncome: '',

		    text: '',
		    columns: [
		       {
		          name: 'date',
		          align: 'left',
		          label: 'Date',
		          field: 'date',
		          sortable: true
		       },
		       {
		          name: 'receipt_number',
		          align: 'left',
		          label: 'No',
		          field: 'receipt_number',
		          sortable: true
		       },
		       {
		          name: 'vehicle',
		          align: 'left',
		          label: 'Plate No',
		          field: 'vehicle',
		          sortable: true
		       },
		       {
		          name: 'packages',
		          align: 'left',
		          label: 'Packages',
		          field: 'packages',
		          sortable: true
		       },
		       {
		          name: 'sub_total',
		          align: 'left',
		          label: 'SubTotal (₦)',
		          field: 'sub_total',
		          sortable: true
		       },
		       {
		          name: 'discount',
		          align: 'left',
		          label: 'Discount (₦)',
		          field: 'discount',
		          sortable: true
		       },
		       {
		          name: 'total',
		          align: 'left',
		          label: 'Total (₦)',
		          field: 'total',
		          sortable: true
		       },
		       {
		          name: 'payment_method',
		          align: 'left',
		          label: 'Method',
		          field: 'payment_method',
		          sortable: true
		       },
		       {
		          name: 'action',
		          align: 'left',
		          label: 'Action',
		          field: 'action',
		       }
		    ],
		}
	},
	computed: {
        ...mapGetters({
            orders: 'adminOrders/orders',
          	history: 'locationHistory/history',
          	user: 'auth/user',
          	orderDetails: 'adminOrders/orderDetails',
          	onlineOrderDetails: 'adminOrders/onlineOrderDetails',
          	orderTransactionDetails: 'adminOrders/orderTransactionDetails',
          	editPrivilege: 'adminOrders/editPrivilege',
          	deletePrivilege: 'adminOrders/deletePrivilege',

          	todaysOrderTransaction: 'adminOrders/totalTransactionToday',
          	posTransactionToday: 'adminOrders/posTransactionToday',
          	completeTransactionToday: 'adminOrders/completeTransactionToday',
          	editTransactionToday: 'adminOrders/editTransactionToday',
          	deleteTransactionToday: 'adminOrders/deleteTransactionToday',
          	cashTransactionToday: 'adminOrders/cashTransactionToday',
          	notPaidTransactionToday: 'adminOrders/notPaidTransactionToday',
          	carTransactionToday: 'adminOrders/carTransactionToday',
          	pendingTransactionToday: 'adminOrders/pendingTransactionToday',

          	todaysHistoryTransaction: 'locationHistory/totalTransactionToday',
		    dashboard: 'dashboard/dashboard',
        }),
    },

    methods: {
    	...mapActions({
          	sendOrder: 'adminOrders/sendOrder',
          	sendOnlineOrder: 'adminOrders/sendOnlineOrder',
          	processRequest: 'adminOrders/processRequest',
          	setCurrentEditRight: 'adminOrders/setCurrentUserEditRight',
          	setCurrentDeleteRight: 'adminOrders/setCurrentUserDeleteRight',
            getLocationDashboard: 'dashboard/getLocationDashboard',
        }),

    	editRequestOrderTransaction(data){
			this.sendOrder(data).then((response) => {
				this.editTransaction = true	
				this.action.orderDetails = this.orderDetails
            }).catch((error) => {
                console.log(error)
                if(this.errorMessage){
                    this.negativeNotification('cannot process order at the moment')
                }
            }) 
    	},

    	printOrderTransaction(data){
			this.sendOrder(data).then((response) => {
				this.action.orderDetails = this.orderDetails
				remote.getCurrentWebContents().print({silent:true, copies : 1})
            }).catch((error) => {
                console.log(error)
                if(this.errorMessage){
                    this.negativeNotification('cannot process order at the moment')
                }
            }) 
    	},

    	printOnlineOrderTransaction(data){
			this.sendOnlineOrder(data).then((response) => {
				// this.action.orderDetails = this.orderDetails
				remote.getCurrentWebContents().print({silent:true, copies : 1})
            }).catch((error) => {
                console.log(error)
                if(this.errorMessage){
                    this.negativeNotification('cannot process order at the moment')
                }
            }) 
    	},

    	deleteRequestOrderTransaction(data){
			this.sendOrder(data).then((response) => {
				this.deleteTransaction = true
				this.action.orderDetails = this.orderDetails	
            }).catch((error) => {
                console.log(error)
                if(this.errorMessage){
                    this.negativeNotification('cannot process order at the moment')
                }
            }) 
    	},

    	completeRequestOrderTransaction(data){
			this.sendOrder(data).then((response) => {
				this.completeTransaction = true	
				this.action.orderDetails = this.orderDetails
            }).catch((error) => {
                console.log(error)
                if(this.errorMessage){
                    this.negativeNotification('cannot process order at the moment')
                }
            }) 
    	},

    	sendRequestBtn(type){
    		this.action.action = type

    		console.log(this.action.payment_method)
    		if(this.action.payment_method == 'not_paid'){
    			return this.negativeNotification('select payment method')
    		}
    		this.processRequest(this.action).then((response) => {
    			this.editTransaction = false
		    	this.deleteTransaction = false
		    	this.completeTransaction = false	
            }).catch((error) => {
                console.log(error)
                if(this.errorMessage){
                    this.negativeNotification('cannot process order at the moment')
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

	    time(){
	    	var today = new Date();
	    	var time = today.getHours() + ":" + today.getMinutes() + ":" + 
        	today.getSeconds();
        	return time
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
    mounted(){

	  	this.getLocationDashboard()

    	if(this.$can('edit', 'orders')){
			this.setCurrentEditRight(true)
		}else{
			this.setCurrentEditRight(false)
		}

		if(this.$can('delete', 'orders')){
			this.setCurrentDeleteRight(true)
		}else{
			this.setCurrentDeleteRight(false)
		}

		this.filterExpense =  this.optionsFn()

    }
}
</script>