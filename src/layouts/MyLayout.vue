<template>
  <q-layout view="hHh lpR fff">

    <q-header elevated class="bg-white" height-hint="100">
      <q-toolbar class="q-pl-xl text-primary">
        <!-- <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-btn dense flat round icon="menu" @click="right = !right" /> -->
          <q-toolbar-title >
            <q-img src="statics/parkit_logo.png" spinner-color="white" style="height: 100px; max-width: 300px" @click="home"/>
          </q-toolbar-title>
          <!-- <q-space /> -->
          <div class="gt-sm">
              <template v-if="authenticated">
                  <q-btn flat color="primary" to="/user/dashboard" label="Dashboard" />
                  <q-btn flat color="primary" @click.prevent="signOut" label="Logout" />
              </template>
              <template v-else>
                  <q-btn flat color="primary" label="Sign In" @click="signInModal = true" />
                  <q-btn flat color="primary" label="Sign Up" @click="signUpModal = true" />
              </template>
          </div>

          <div  @click="right = !right" class="lt-md" id="total_charges_fab" style="display: block; position: fixed; top: 100px; right: 18px; z-index: 1;">
              <q-btn size="12px" unelevated class="q-px-xl" color="primary" :label="carTotalLength"/>
          </div>
          
          <div class="q-pa-md gt-sm" v-if="cart.length">
              <q-btn-dropdown color="primary" @click="right = !right"  :label="carTotalLength" v-model="menu" @mouseover.native="menuOver = true" @mouseout.native="menuOver = false"></q-btn-dropdown>
          </div>

          <q-btn
              flat
              dense
              round
              @click="left = !left"
              icon="menu"
              aria-label="Menu"
              class="lt-md"
              />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" behavior="mobile" bordered>
      <template v-if="authenticated">
          <UserMenu/>
      </template>

      <template v-else>
          <q-list>
              <q-item-label header>Menu</q-item-label>
              <hr>
              <q-item clickable to="/">
                  <q-item-section avatar>
                      <q-icon name="home" />
                  </q-item-section>
                  <q-item-section>
                      <q-item-label>Home</q-item-label>
                  </q-item-section>
              </q-item>
              <q-item clickable @click="signInModal = true">
                  <q-item-section avatar>
                      <q-icon name="school" />
                  </q-item-section>
                  <q-item-section>
                      <q-item-label>Sign In</q-item-label>
                  </q-item-section>
              </q-item>
              <q-item clickable @click="signUpModal = true" >
                  <q-item-section avatar>
                      <q-icon name="code" />
                  </q-item-section>
                  <q-item-section>
                      <q-item-label>Sign Up</q-item-label>
                  </q-item-section>
              </q-item>
              <q-item clickable to="/cart">
                  <q-item-section avatar>
                      <q-icon name="shopping_cart" />
                  </q-item-section>
                  <q-item-section>
                      <q-item-label> Cart
                          <q-badge transparent align="middle" color="orange">
                               {{ carTotalLength }}
                          </q-badge>
                      </q-item-label>
                  </q-item-section>
              </q-item>
          </q-list>
      </template>
    </q-drawer>

    <q-drawer v-model="right" side="right" behavior="mobile" bordered>
      <!-- drawer content -->
      <CartDrawer style="width:300px"/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="signInModal" v-if="!authenticated">
        <SignIn/>
    </q-dialog>

    <q-dialog v-model="signUpModal" v-if="!authenticated">
        <SignUp/>
    </q-dialog>

    <Footer/>

  </q-layout>
</template>


<style scoped>
    .header-box{
    position: absolute;
    top: 0;
    }
    .custom-caption{
    text-align: left;
    padding: 12px;
    color: white;
    background-color: rgba(0, 0, 0, .5);
    height: -webkit-fill-available;
    padding: 220px 80px 75px;
    }
</style>

<script>
    
    import CartDrawer from 'components/Cart/CartDrawer.vue'
    import Footer from 'components/Website/Footer.vue'
    import SignUp from 'components/Website/SignUp.vue'
    import SignIn from 'components/Website/SignIn.vue'
    import UserMenu from 'components/Menus/UserMenu.vue'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'MyLayout',

        components:{
            Footer,
            SignUp,
            SignIn,
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
                left: false,
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
            },
            home(){
              this.$router.replace({
                  name: 'home'
              })
            }
        }
    }
</script>