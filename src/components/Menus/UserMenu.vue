<template>
	<q-list>
        <q-item-label header>Menu</q-item-label>
        
        <q-item clickable to="/user/dashboard">
            <q-item-section avatar>
                <q-icon name="home" />
            </q-item-section>
            <q-item-section>
                <q-item-label>Dashboard</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable to="/user/cart">
            <q-item-section avatar>
                <q-icon name="shopping_cart" />
            </q-item-section>
            <q-item-section>
                <q-item-label>Cart 
                    <q-badge transparent align="middle" color="orange">
                         {{ carTotalLength }}
                    </q-badge>
                </q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable to="/user/profile">
            <q-item-section avatar>
                <q-icon name="person" />
            </q-item-section>
            <q-item-section>
                <q-item-label>Profile</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable to="/user/orders">
            <q-item-section avatar>
                <q-icon name="list" />
            </q-item-section>
            <q-item-section>
                <q-item-label>Orders</q-item-label>
            </q-item-section>
        </q-item>

        <q-item clickable to="/user/security">
            <q-item-section avatar>
                <q-icon name="lock" />
            </q-item-section>
            <q-item-section>
                <q-item-label>Security</q-item-label>
            </q-item-section>
        </q-item>

        <q-item clickable @click.prevent="signOut">
            <q-item-section avatar>
                <q-icon name="logout" />
            </q-item-section>
            <q-item-section>
                <q-item-label>Logout</q-item-label>
            </q-item-section>
        </q-item>
    </q-list>
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
                // console.log('ko')
                this.signOutAction().then(() => {
                    this.$router.replace({
                        name: 'home'
                    })
                })
            }
        }
    }
</script>