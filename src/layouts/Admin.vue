<template>
	<q-layout view="hHh lpR lfr">
        <q-header bordered  style="background-color:white; height:100px; " class="print-hide">
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


                <div class="gt-sm">
                    <template v-if="authenticated" class="gt-sm">
                        <q-btn color="purple" unelevated icon="home" class="q-ma-sm" :label="presentLocation" />
                        <q-btn color="red" unelevated icon="settings_power" @click="shutDown" class="q-ma-sm" label="Shutdown"/>
                        <q-btn color="green" unelevated align="right" @click="checkOnline">check internet status</q-btn>                        

                        <!-- <q-btn color="black"  v-if="connectedOnline==false">Offline</q-btn>
                        <q-btn color="grey"  v-if="connectedOnline==null">Connecting</q-btn>
                        <q-btn color="green"  v-if="connectedOnline==true">Online</q-btn> -->
                                                
                        <template v-if="cart.length">
                            <q-btn color="primary"  :label="carTotalLength"  />
                        </template>
                    </template>
                </div>

                <div  @click="right = !right" class="lt-md" id="total_charges_fab" style="display: block; position: fixed; top: 100px; right: 18px; z-index: 1;">
                    <q-btn size="12px" unelevated class="q-px-xl" color="primary" :label="carTotalLength"/>
                </div>
            </q-toolbar>
        </q-header>



        <q-drawer v-model="right" side="right"  behavior="mobile" bordered class="print-hide">
          <CartDrawer/>
        </q-drawer>


        <q-drawer
            v-model="leftDrawerOpen"
            behavior="mobile"
            bordered
            content-class="bg-white-2"
            class="lt-xl print-hide"
            >
            
            <q-list>
                <template>
                    <q-item-label header>Menu</q-item-label>

                    <q-item clickable to="/admin/dashboard">
                        <q-item-section avatar>
                            <q-icon name="home" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Dashboard</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable to="/admin/invoice">
                        <q-item-section avatar>
                            <q-icon name="receipt" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Invoice</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable to="/admin/history">
                        <q-item-section avatar>
                            <q-icon name="history" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>History</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item clickable to="/admin/online/transactions">
                        <q-item-section avatar>
                            <q-icon name="confirmation_number" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Online Transaction</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable to="/admin/personnel/requests">
                        <q-item-section avatar>
                            <q-icon name="person_add" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Personnel Request</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable to="/admin/purchase/order">
                        <q-item-section avatar>
                            <q-icon name="shopping_basket" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Purchase Order</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable to="/admin/report/fault">
                        <q-item-section avatar>
                            <q-icon name="build" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Report Fault</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable to="/admin/requisition/order">
                        <q-item-section avatar>
                            <q-icon name="reorder" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Requistion Order</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable to="/admin/suggestions/complaints">
                        <q-item-section avatar>
                            <q-icon name="contact_support" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Suggestions & Complaints</q-item-label>
                        </q-item-section>
                    </q-item>

                    
                </template>

                

                <template v-if="$can('access', 'allAccounts')">
                    <q-item-label header>Locations</q-item-label>

                    <q-item clickable to="/admin/locations">
                        <q-item-section avatar>
                            <q-icon name="house" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Location</q-item-label>
                        </q-item-section>
                    </q-item>
                </template>

                <template v-if="$can('access', 'allAccounts') || $can('access', 'oneAccounts')">

                    <q-item-label header>Accounts</q-item-label>

                    <q-item clickable to="/admin/account">
                        <q-item-section avatar>
                            <q-icon name="account_balance" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Account</q-item-label>
                        </q-item-section>
                    </q-item>


                    <q-item-label header>Users</q-item-label>

                    <q-item clickable to="/admin/users">
                        <q-item-section avatar>
                            <q-icon name="people" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Users</q-item-label>
                        </q-item-section>
                    </q-item>


                    <q-item-label header>Roles</q-item-label>

                    <q-item clickable to="/admin/roles">
                        <q-item-section avatar>
                            <q-icon name="scatter_plot" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>Roles & Permissions</q-item-label>
                        </q-item-section>
                    </q-item>
                </template>
            </q-list>
        </q-drawer>
        <q-page-container class="page-con">
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<style>
    .offline {
      background-color: #fc9842;
      background-image: linear-gradient(315deg, #fc9842 0%, #fe5f75 74%);
    }
    .online {
      background-color: #00b712;
      background-image: linear-gradient(315deg, #00b712 0%, #5aff15 74%);
    }
</style>

<script>
    import CartDrawer from 'components/Cart/CartDrawer.vue'
    import { getPersistedState } from '../store/modules/auth/statemapper.js';
    import { mapActions, mapGetters } from 'vuex'
    import { Notify } from 'quasar'
    import VOffline from 'v-offline'
    const isOnline = require('is-online');
    const shutdown = require('electron-shutdown-command')

    export default {
        name: 'Admin',

        components:{
            CartDrawer,
            VOffline
        },
        
        data () {
            return {
                leftDrawerOpen: false,
                menu: false,
                menuOver: false,
                listOver: false,
                signInModal: false,
                signUpModal: false,
                right: false,
                onLine: null,
                onlineSlot: 'online',
                offlineSlot: 'offline',
            }
        },

        computed: {
            ...mapGetters({
                cart: 'adminShopping/cart',
                cartItemCount: 'adminShopping/cartItemCount',
                cartTotal: 'adminShopping/cartTotal',
                authenticated: 'auth/user',
                user: 'auth/user',
                online: 'auth/onlineStatus',
                connectedOnline: 'internetStatus/connected',
            }),
            
            carTotalLength(){
                return "Cart (" + this.cartItemCount + ") - ₦" + this.cartTotal
            }, 

            presentLocation(){
                return 'Hello '+this.user.firstName + " - " + this.user.location.locationName
            }
        },

        methods:{
            ...mapActions({
                removeProductFromCart: 'adminShopping/removeProductFromCart',
                removeAllProductFromCart: 'adminShopping/removeAllProductFromCart',
                signOutAction: 'auth/signOut',
                connectOnline: 'auth/onlineStatus',
                clearOfflineOrders: 'adminOrders/clearofflineOrders',
                checkOnlineStatus: 'internetStatus/checkOnline',
            }),

            amIOnline(e) {
                this.onLine = e;
                if(e){
                    return this.positiveNotification('You are now online')
                }
            },

            signOut(){

                if(this.online === false ){
                    return this.negativeNotification('you must be connected to the internet to proceed')
                }
                
                this.signOutAction().then(() => {
                    return this.$router.push({name: 'adminLogin'})
                })
            },

            handleConnectivityChange(status) {
                console.log(status);

                if(status == true){                    
                    this.positiveNotification('You are now online')
                }
                if(status == false){
                    this.negativeNotification('You are offline. Please connect to an available internet')
                }

            },

            amIOnline(e) {
              this.onLine = e;
            },

            shutDown(){
                shutdown.shutdown()
            },


            checkOnline(){
                (async () => {
                    var check = await isOnline()
                    this.checkOnlineStatus(check).then((res) => {
                        if(check == false){
                            return this.negativeNotification('You are offline. Please connect to an available internet')
                        }
                        if(check == true){
                            return this.positiveNotification('You are online')
                        }
                    })
                })();
            },

            positiveNotification(message){
                Notify.create({
                    type: 'positive',
                    color: 'positive',
                    timeout: 10000,
                    position: 'bottom',
                    message: message
                })
            },

            negativeNotification(error){
                Notify.create({
                    type: 'negative',
                    color: 'negative',
                    timeout: 10000,
                    position: 'bottom',
                    message: error
                })
            },
        },

        mounted(){
            this.authenticated
            // console.log('cwcw', getPersistedState())
            if (!this.$store.initialized) {
                getPersistedState().then(persistedState => {
                    this.$store.commit('initialize', persistedState);
                    console.log('hooooooooooo', persistedState)
                })
                .catch(error => {
                    // tsk tsk... handle this error too
                });
            }

            if(this.user==null){
                return this.$router.push({name: 'adminLogin'})
            }

            // (async () => {
            //     var check = await isOnline()
            //     console.log(check);
            //     this.connectOnline(check).then((res) => {
            //         if(check === false){
            //             return this.negativeNotification('You are offline. Please connect to an available internet')
            //         }
            //     })
                
            // })();
        },
    }
</script>