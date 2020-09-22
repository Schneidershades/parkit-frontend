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
                <q-toolbar-title clickable to="/" >
                    <q-img src="~assets/parkit_logo.png" spinner-color="white" style="height: 120px; max-width: 300px" @click="home"/>
                </q-toolbar-title>
                <!-- <q-space /> -->
                <div class="gt-sm">
                    <template v-if="authenticated" class="gt-sm">
                        <q-btn flat color="primary" to="/" label="Home" />
                        <q-btn flat color="primary" to="/user/dashboard" label="Dashboard" />
                        <q-btn flat color="primary" @click.prevent="signOut" label="Logout" />
                        <template v-if="cart.length">
                            <q-btn color="primary"  :label="carTotalLength" @click="right = !right" />
                        </template>
                    </template>
                </div>
                <div  @click="right = !right" class="lt-md" id="total_charges_fab" style="display: block; position: fixed; top: 100px; right: 18px; z-index: 1;">
                    <q-btn size="12px" unelevated class="q-px-xl" color="primary" :label="carTotalLength"/>
                </div>
            </q-toolbar>
        </q-header>
        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            content-class="bg-white-2"
            class="lt-xl"
            >
            <UserMenu/>
        </q-drawer>

        <q-drawer v-model="right" side="right" behavior="mobile" bordered>
          <CartDrawer/>
        </q-drawer>


        <q-page-container class="page-con">
            <router-view />
        </q-page-container>
    </q-layout>
</template>


<script>
    import CartDrawer from 'components/Cart/CartDrawer.vue'
    import UserMenu from 'components/Menus/UserMenu.vue'

    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'User',

        components:{
           CartDrawer,
           UserMenu
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
                authenticated: 'auth/user',
            }),
            
            carTotalLength(){
                return "Cart (" + this.cartItemCount + ") - ₦" + this.cartTotal
            }
        },

        methods:{
            ...mapActions({
              removeProductFromCart: 'shopping/removeProductFromCart',
              removeAllProductFromCart: 'shopping/removeAllProductFromCart',
              signOutAction: 'auth/signOut',
              getCart: 'shopping/getCart',
            }),

            signOut(){
                this.signOutAction().then(() => {
                    this.$router.replace({
                        name: 'home'
                    })
                })
            },
            
            home(){
              this.$router.replace({
                  name: 'home'
              })
            }
        },

        mounted(){
            if(this.authenticated){
                this.getCart()
            }
        },
    }
</script>