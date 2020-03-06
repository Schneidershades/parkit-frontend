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
                    <img src="statics/parkit_lm_logo.png" alt="Parkit Location Manager" width="300">
                </q-toolbar-title>
                <!-- <q-space /> -->
                <div class="gt-sm">
                    <template v-if="authenticated" class="gt-sm">
                        <!-- <q-btn color="primary" class="q-ma-sm"  icon="logout" @click.prevent="signOut" label="logout" /> -->
                        <q-btn color="purple" icon="home" class="q-ma-sm" label="Location" />
                        <q-btn color="red" icon="settings_power" class="q-ma-sm" label="Shutdown" />
                        <template v-if="cart.length">
                            <q-btn color="primary"  :label="carTotalLength"  />
                            <!-- <q-btn color="primary"  :label="carTotalLength" @click="right = !right" /> -->
                        </template>
                    </template>
                </div>
            </q-toolbar>
        </q-header>
        <q-drawer v-model="right" side="right" bordered>
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
                <q-item-label header>Menu</q-item-label>

                <q-item clickable to="/admin/dashboard">
                    <q-item-section avatar>
                        <!-- <q-icon name="home" /> -->
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Dashboard</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable to="/admin/invoice">
                    <q-item-section avatar>
                        <!-- <q-icon name="person" /> -->
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Invoice</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable to="/admin/history">
                    <q-item-section avatar>
                        <!-- <q-icon name="cart" /> -->
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>History</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable to="/admin/online/transactions">
                    <q-item-section avatar>
                        <!-- <q-icon name="shop" /> -->
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Online Transaction</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable to="/admin/personnel/requests">
                    <q-item-section avatar>
                        <!-- <q-icon name="lock" /> -->
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Personnel Request</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable to="/admin/purchase/order">
                    <q-item-section avatar>
                        <!-- <q-icon name="lock" /> -->
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Purchase Order</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable to="/admin/report/fault">
                    <q-item-section avatar>
                        <!-- <q-icon name="lock" /> -->
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Report Fault</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable to="/admin/requisition/order">
                    <q-item-section avatar>
                        <!-- <q-icon name="lock" /> -->
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Requistion Order</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable to="/admin/suggestions/complaints">
                    <q-item-section avatar>
                        <!-- <q-icon name="lock" /> -->
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Suggestions & Complaints</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable @click.prevent="signOut">
                    <q-item-section avatar>
                        <!-- <q-icon name="logout" /> -->
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
                cart: 'shopping/cart',
                cartItemCount: 'shopping/cartItemCount',
                cartTotal: 'shopping/cartTotal',
                authenticated: 'auth/authenticated',
            }),
            
            carTotalLength(){
                return "Cart (" + this.cartItemCount + ") - ₦" + this.cartTotal
            }
        },

        mounted(){
            this.authenticated
        },


        methods:{
            ...mapActions({
              removeProductFromCart: 'shopping/removeProductFromCart',
              removeAllProductFromCart: 'shopping/removeAllProductFromCart',
              signOutAction: 'auth/signOut'
            }),

            signOut(){
                this.signOutAction().then(() => {
                    return this.$router.push({name: 'adminLogin'})
                })
            }
        }
    }
</script>