<template>
    <q-page>
        <q-carousel
            arrows
            animated
            v-model="slide"
            height="550px"
            >
            <q-carousel-slide name="first" img-src="statics/selected/slider1.jpg" class="column no-wrap flex-center">
                <div class="absolute-bottom custom-caption">
                    <template v-if="user!=null">
                      <div class="text-h2 text-weight-bolder" >Car Wash & Vehicle Care </div>
                      <div class="text-h6">A Car Wash & Vehicle Care Service like never before!</div>
                    </template>
                    <template v-else>
                      <div class="text-h6">Welcome</div>
                      <div class="text-h2 text-weight-bolder q-pb-md">Sign up to get a free car wash</div>
                      
                      <q-card-actions align="left">
                        <q-btn size="18px" unelevated rounded class="q-py-xs q-px-md" color="primary" @click="signUpModal = true" label="Sign Up"/>
                        <q-btn size="18px" unelevated rounded class="q-py-xs q-px-md" color="primary" @click="signInModal = true" label="Book Now"/>
                      </q-card-actions>
                    </template>
                </div>
            </q-carousel-slide>
            <q-carousel-slide name="second" img-src="statics/slider-bg2.jpg" class="column no-wrap flex-center">
                <div class="absolute-bottom custom-caption">
                    <template v-if="user!=null">
                      <div class="text-h2 text-weight-bolder">Car Wash & Vehicle Care </div>
                      <div class="text-h6">A Car Wash & Vehicle Care Service like never before!</div>
                    </template>
                    <template v-else>
                      <div class="text-h6">Welcome</div>
                      <div class="text-h2 text-weight-bolder q-pb-md">Sign up to get a free car wash</div>
                      
                      <q-card-actions align="left">
                        <q-btn size="18px" unelevated rounded class="q-py-xs q-px-md" color="primary" @click="signUpModal = true" label="Sign Up"/>
                        <q-btn size="18px" unelevated rounded class="q-py-xs q-px-md" color="primary" @click="signInModal = true" label="Book Now"/>
                      </q-card-actions>
                    </template>
                </div>
            </q-carousel-slide>
            <q-carousel-slide name="third" img-src="statics/selected/slider2.jpg" class="column no-wrap flex-center">
                <div class="absolute-bottom custom-caption">
                    <template v-if="user!=null">
                      <div class="text-h2 text-weight-bolder">Car Wash & Vehicle Care </div>
                      <div class="text-h6">A Car Wash & Vehicle Care Service like never before!</div>
                    </template>
                    <template v-else>
                      <div class="text-h6">Welcome</div>
                      <div class="text-h2 text-weight-bolder q-pb-md">Sign up to get a free car wash</div>
                      
                      <q-card-actions align="left">
                        <q-btn size="18px" unelevated rounded class="q-py-xs q-px-md" color="primary" @click="signUpModal = true" label="Sign Up"/>
                        <q-btn size="18px" unelevated rounded class="q-py-xs q-px-md" color="primary" @click="signInModal = true" label="Book Now"/>
                      </q-card-actions>
                    </template>
                </div>
            </q-carousel-slide>
            <q-carousel-slide name="fourth" img-src="statics/selected/slider3.jpg" class="column no-wrap flex-center">
                <div class="absolute-bottom custom-caption">
                    <template v-if="user!=null">
                      <div class="text-h2 text-weight-bolder">Car Wash & Vehicle Care </div>
                      <div class="text-h6">A Car Wash & Vehicle Care Service like never before!</div>
                    </template>
                    <template v-else>
                      <div class="text-h6">Welcome</div>
                      <div class="text-h2 text-weight-bolder q-pb-md">Sign up to get a free car wash</div>
                      
                      <q-card-actions align="left">
                        <q-btn size="18px" unelevated rounded class="q-py-xs q-px-md" color="primary" @click="signUpModal = true" label="Sign Up"/>
                        <q-btn size="18px" unelevated rounded class="q-py-xs q-px-md" color="primary" @click="signInModal = true" label="Book Now"/>
                      </q-card-actions>
                    </template>
                </div>
            </q-carousel-slide>
        </q-carousel>
        <div class="q-pa-xl">
            <div class="row justify-around">
                <div class="col-md-6">
                    <img class="responsive-img" src="statics/car.png" width="100%" alt="Parkit Home service">
                </div>
                <div class="col-md-6 text-center align-center">
                    <h5 class="center-align"><strong>Rather have us come over instead?<br>Home or Office</strong></h5>
                    <q-btn unelevated rounded color="primary"  to="/home-service" label="Book Now" />
                </div>
            </div>
        </div>
        <div class="q-pa-md">
            <div class="q-gutter-y-xl">
                <tab-list></tab-list>
            </div>

            <div class=" q-pl-xl">
              <h4>Interested in owning a parkit franchise ?</h4>
              <img class="responsive-img" src="statics/CAR00.png" width="100%" alt="Parkit Home service">
            </div>
            <!-- <div class="q-gutter-y-md gt-sm">
                <Animation/>
            </div> -->
        </div>

        <q-dialog v-model="signInModal">
            <SignIn/>
        </q-dialog>

        <q-dialog v-model="signUpModal">
            <SignUp/>
        </q-dialog>
    </q-page>
</template>
<style  scoped>
  h4 {
      display: inline-block;
      border: 0 solid #e91e63;
      color: #c2185b;
      border-top-width: 3px;
      border-left-width: 10px;
      padding: 4px;
      font-weight: 700;
  }

    .custom-caption{
      text-align: left;
      padding: 12px;
      color: white;
      background-color: rgba(0, 0, 0, .5);
      height: -webkit-fill-available;
      padding: 200px 80px 75px;
    }
    #footer {
      background-color: #151c1f;
      color: #eceff1;
      padding-top: 60px;
      padding-bottom: 60px;
    }

    #footer a{
      text-decoration: none;
      color: #039be5;
    }
</style>
<script>
    import TabList from 'components/Tabs/TabList.vue'
    import Animation from 'components/Website/Animation.vue'
    import SignUp from 'components/Website/SignUp.vue'
    import SignIn from 'components/Website/SignIn.vue'
    import { mapActions, mapGetters } from 'vuex'
    
    export default {
      data () {
        return {
          slide: 'first',
          tab: 'mails',
          signInModal: false,
          signUpModal: false,
        }
      },
      components:{
        TabList,
        Animation,
        SignUp,
        SignIn,
      },
      computed: {
        ...mapGetters({
          user: 'auth/user',
        })
      }       
    }
</script>