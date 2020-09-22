<template>
	<q-layout view="hHh lpR lfr">
        <q-header bordered  style="background-color:white; height:100px;">
            <q-toolbar class="q-pl-xl text-primary">
            	<q-btn
                    flat
                    dense
                    round
                    @click="leftDrawerOpen = !leftDrawerOpen"
                    icon="menu"
                    aria-label="Menu"
                    class="lt-xl"
                    />
                <q-toolbar-title>
                    <img src="~assets/parkit_lm_logo.png" alt="Parkit Location Manager" width="300">
                </q-toolbar-title>
                
                <div class="gt-sm">

                    <template v-if="authenticated" class="gt-sm">

                        <q-btn flat color="primary" class="q-mr-sm" to="/" label="Home" />
                        <q-btn color="purple" unelevated icon="home" class="q-mr-sm" :label="presentLocation" />
                        <template v-if="cart.length">
                            <q-btn color="primary" unelevated :label="carTotalLength"  />
                        </template>
                    </template>
                </div>
                <div @click="right = !right" class="lt-md" id="total_charges_fab" style="display: block; position: fixed; top: 100px; right: 18px; z-index: 1;">
                    <q-btn size="12px" unelevated class="q-px-xl" color="primary" :label="carTotalLength"/>
                </div>
            </q-toolbar>
        </q-header>


        <q-drawer v-model="right" side="right"  behavior="mobile" bordered>
          <CartDrawer/>
        </q-drawer>

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            content-class="bg-white-2"
            class="lt-xl"
            >
            
            <q-list>
                <template v-if="authenticated">
                    <q-item-label header>Menu</q-item-label>
                    <q-item clickable to="/">
                        <q-item-section avatar>
                            <q-icon name="subdirectory_arrow_left" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Back to Website</q-item-label>
                        </q-item-section>
                    </q-item>

                    <template>
                        <q-item clickable to="/user/dashboard">
                            <q-item-section avatar>
                                <q-icon name="switch_right" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Switch To User Dashboard</q-item-label>
                            </q-item-section>
                        </q-item>
                    </template>

                    <q-item clickable to="/web/admin/dashboard">
                        <q-item-section avatar>
                            <q-icon name="business" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Dashboard</q-item-label>
                        </q-item-section>
                    </q-item>

                    <template v-if="authenticated.role == 'Super Admin'">
                        <q-item clickable to="/web/admin/invoice">
                            <q-item-section avatar>
                                <q-icon name="location_on" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Invoice</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable to="/web/admin/history">
                            <q-item-section avatar>
                                <q-icon name="history" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>History</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable to="/web/admin/online/transactions">
                            <q-item-section avatar>
                                <q-icon name="confirmation_number" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Online Transaction</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable to="/web/admin/await/bookings">
                            <q-item-section avatar>
                                <q-icon name="date_range" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Pending Orders</q-item-label>
                            </q-item-section>
                        </q-item>  


                        <q-item-label header>Service Setup</q-item-label>

                        <q-item clickable to="/web/admin/settings/vehicles">
                            <q-item-section avatar>
                                <q-icon name="directions_car" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Vehicles</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable to="/web/admin/settings/packages">
                            <q-item-section avatar>
                                <q-icon name="backpack" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Packages</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable to="/web/admin/settings/rates">
                            <q-item-section avatar>
                                <q-icon name="money" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Pricing Settings</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item-label header>Users & Plate Number</q-item-label>

                        <!-- <q-item clickable to="/web/admin/settings/users">
                            <q-item-section avatar>
                                <q-icon name="house" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Users</q-item-label>
                            </q-item-section>
                        </q-item> -->

                        <q-item clickable to="/web/admin/settings/platenumbers">
                            <q-item-section avatar>
                                <q-icon name="subject" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Plate Numbers</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item-label header>Discount & Coupons Settings</q-item-label>


                        <q-item clickable to="/web/admin/discounts">
                            <q-item-section avatar>
                                <q-icon name="calculate" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Discounts</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable to="/web/admin/coupons">
                            <q-item-section avatar>
                                <q-icon name="vertical_align_bottom" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Coupons</q-item-label>
                            </q-item-section>
                        </q-item>  

                        <q-item-label header>Users</q-item-label>

                        <q-item clickable to="/web/admin/users">
                            <q-item-section avatar>
                                <q-icon name="people" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Users</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable to="/web/admin/employees">
                            <q-item-section avatar>
                                <q-icon name="people" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Employees</q-item-label>
                            </q-item-section>
                        </q-item>


                        <q-item-label header>Roles</q-item-label>

                        <q-item clickable to="/web/admin/roles">
                            <q-item-section avatar>
                                <q-icon name="scatter_plot" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Roles & Permissions</q-item-label>
                            </q-item-section>
                        </q-item> 

                        <q-item-label header>Locations</q-item-label>

                        <q-item clickable to="/web/admin/locations">
                            <q-item-section avatar>
                                <q-icon name="house" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Location</q-item-label>
                            </q-item-section>
                        </q-item>


                        <q-item-label header>Report</q-item-label>

                        <q-item clickable to="/web/admin/send/report">
                            <q-item-section avatar>
                                <q-icon name="account_balance" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>Send Report</q-item-label>
                            </q-item-section>
                        </q-item>

                    </template>                                  
                </template>
                
                <template v-if="$can('access', 'allAccounts') || $can('access', 'oneAccounts')">

                    <q-item-label header>Accounts</q-item-label>

                    <q-item clickable to="/web/admin/account">
                        <q-item-section avatar>
                            <q-icon name="account_balance" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Account</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable to="/web/admin/income-expense-category">
                        <q-item-section avatar>
                            <q-icon name="account_balance" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Income & Expense Categories</q-item-label>
                        </q-item-section>
                    </q-item>
                </template>

                <q-item clickable @click.prevent="signOut">
                    <q-item-section avatar>
                        <q-icon name="logout" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Logout</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>
        <q-page-container class="page-con">
            <router-view />
        </q-page-container>
    </q-layout>
</template>


<script>
    import CartDrawer from 'components/Cart/CartDrawer.vue'

    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'Admin',

        components:{
           CartDrawer
        },
        
        data () {
            return {
                leftDrawerOpen: false,
                menu: false,
                menuOver: false,
                listOver: false,
                signInModal: false,
                signUpModal: false,
                right: false
            }
        },
        computed: {
            ...mapGetters({
                cart: 'webAdminShopping/cart',
                cartItemCount: 'webAdminShopping/cartItemCount',
                cartTotal: 'webAdminShopping/cartTotal',
                authenticated: 'auth/user',
            }),
            
            carTotalLength(){
                return "Cart (" + this.cartItemCount + ") - ₦" + this.cartTotal
            },

            presentLocation(){
                return 'Hello '+this.authenticated.firstName + " - " + this.authenticated.role
            }
        },

        mounted(){
            this.authenticated
        },


        methods:{
            ...mapActions({
              removeProductFromCart: 'webAdminShopping/removeProductFromCart',
              removeAllProductFromCart: 'webAdminShopping/removeAllProductFromCart',
              signOutAction: 'auth/signOut'
            }),

            signOut(){
                this.signOutAction().then(() => {
                    return this.$router.push({name: 'login'})
                })
            }
        }
    }
</script>