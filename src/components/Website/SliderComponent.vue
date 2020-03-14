<template>
  <div class="absolute-bottom custom-caption">
      <template v-if="user!=null">
        <div class="text-h2 text-weight-bolder" >Car Wash & Vehicle Care </div>
        <div class="text-h6">A Car Wash & Vehicle Care Service like never before!</div>
      </template>
      <template v-else>
        <div class="gt-xs">
          <div class="text-h6">Welcome</div>
          <div class="text-h2 text-weight-bolder q-pb-md">Sign up to get a free car wash</div>
          
          <q-card-actions align="left">
            <q-btn size="18px" unelevated rounded class="q-py-xs q-px-md" color="primary" @click="signUpModal = true" label="Sign Up"/>
            <q-btn size="18px" unelevated rounded class="q-py-xs q-px-md" color="primary" @click="signInModal = true" label="Book Now"/>
          </q-card-actions>
        </div>

        <div class="lt-sm">
          <div class="text-h6">Welcome</div>
          <div class="text-h4 text-weight-bolder q-pb-md">Sign up to get a free car wash</div>
          
          <q-card-actions align="center">
            <q-btn size="10px" unelevated rounded class="q-py-xs q-px-md" color="primary" @click="signUpModal = true" label="Sign Up"/>
            <q-btn size="10px" unelevated rounded class="q-py-xs q-px-md" color="primary" @click="signInModal = true" label="Book Now"/>
          </q-card-actions>
        </div>
        
      </template>
      <q-dialog v-model="signInModal">
          <SignIn/>
      </q-dialog>

      <q-dialog v-model="signUpModal">
          <SignUp/>
      </q-dialog>
  </div>
</template>


<style  scoped>
    .custom-caption{
      text-align: left;
      padding: 12px;
      color: white;
      background-color: rgba(0, 0, 0, .5);
      height: -webkit-fill-available;
      padding: 200px 80px 75px;
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