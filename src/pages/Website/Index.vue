<template>
    <q-page>
        <q-carousel
            arrows
            animated
            v-model="slide"
            height="550px"
            >
            <q-carousel-slide name="first" img-src="~assets/selected/slider1.jpg" class="column no-wrap flex-center">
              <SliderComponent/>
            </q-carousel-slide>
            <q-carousel-slide name="second" img-src="~assets/slider-bg2.jpg" class="column no-wrap flex-center">
              <SliderComponent/> 
            </q-carousel-slide>
            <q-carousel-slide name="third" img-src="~assets/selected/slider2.jpg" class="column no-wrap flex-center">
              <SliderComponent/>  
            </q-carousel-slide>
            <q-carousel-slide name="fourth" img-src="~assets/selected/slider3.jpg" class="column no-wrap flex-center">
              <SliderComponent/>  
            </q-carousel-slide>
        </q-carousel>
        <div class="q-pa-xl">
            <div class="row justify-around">
                <div class="col-md-6">
                    <img class="responsive-img" src="~assets/car.png" width="100%" alt="Parkit Home service">
                </div>
                <div class="col-md-6 text-center align-center">
                    <h5 class="center-align"><strong>Rather have us come over instead?<br>Home or Office</strong></h5>
                    <q-btn unelevated size="20px" class="q-px-md" rounded color="primary"  to="/home-service" label="Book Now" />
                </div>
            </div>
        </div>
        <div class="q-pa-md">
            <div class="q-px-lg">
                <tab-list></tab-list>
            </div>

            <div class="q-px-lg">
              <h4>Interested in owning a parkit franchise ?</h4>
              <img class="responsive-img" src="~assets/CAR00.png" width="100%" alt="Parkit Home service" @click="corporate">
            </div>
        </div>
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
</style>
<script>
    import TabList from 'components/Tabs/TabList.vue'
    import SliderComponent from 'components/Website/SliderComponent.vue'
    import { mapActions, mapGetters } from 'vuex'
    
    export default {
      data () {
        return {
          slide: 'first',
          tab: 'mails',
        }
      },
      components:{
        TabList,
        SliderComponent,
      },
      computed: {
        ...mapGetters({
          user: 'auth/user',
        })
      },
      methods :{
        corporate(){
          this.$router.replace({
              name: 'franchise'
          })
        }
      }     
    }
</script>