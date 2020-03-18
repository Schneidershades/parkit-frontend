<template>
    <q-page>
        <q-img src="statics/slider-bg.jpg" style="height:400px">
          <div class="absolute-full text-subtitle2 flex flex-center">
            <div class="text-h2">Gallery</div>
          </div>
        </q-img>

        <div class="q-pa-xl">
            <div class="q-gutter-y-md">
               <q-card>
                <q-tabs
                  v-model="tab"
                  dense
                  class="text-grey"
                  active-color="primary"
                  indicator-color="primary"
                  align="justify"
                  narrow-indicator
                >
                  <div class="cbs-vehicle-list">
                    <div class="col-md-3  vehicle-cbs" v-for="content in gallery.data" :key="content.name">
                      <q-tab :name="content.slug" :label="content.name"  />
                    </div>
                  </div>
                  
                </q-tabs>

                <q-separator />
                {{tab}}
                
                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel :name="content.slug"  v-for="content in gallery.data" :key="content.name">
                    <div class="text-h6">{{content.name}}</div>
                    <div class="row" style="justify-content: space-around;">
                      <!-- {{content}} -->

                      <silent-box :gallery="img.image"/>

                      <!-- <silentbox-group>
                          <silentbox-item v-for="img in content" :src="img.image" :description="content.name" :key="img.image">
                              <img :src="img.image" width="200px">
                          </silentbox-item>
                      </silentbox-group> -->

                       <!-- <silentbox-group>
                          <silentbox-item src="images/image001.jpg" description="Sunken dreams II. by Arbebuk">
                              <img src="images/image001.jpg" width="200px">
                          </silentbox-item>
                          <silentbox-item src="images/image002.jpg" description="Tunnel View Sunrise by Porbital">
                              <img src="images/image002.jpg" width="200px">
                          </silentbox-item>
                          <silentbox-item src="images/image005.jpg" description="Mythology by Nelleke">
                              <img src="images/image005.jpg" width="200px">
                          </silentbox-item>
                      </silentbox-group> -->
                    </div>
                  </q-tab-panel>
                </q-tab-panels>
              </q-card>
            </div>
        </div>


    </q-page>
</template>


<style  scoped>


  .image {
    /*float: left;*/
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: 1px solid #ebebeb;
    margin: 5px;
  } 

    .my-card{
    /*width: 300px;*/
  }

  .card-style{
    height: 200px;
  }

  .card-amount{
    padding: 0;
  }

  .card-style-action{
    bottom: 0;
  }

  .vehicle-cbs{
    flex-grow: 1;
    /*flex-basis: 140px;*/
    height: 80px;
    cursor: pointer;
    padding-top: 20px;
    /*border-width: 1px;*/
    /*border-style: solid;*/
    text-align: center;
    margin: 0px 6px 12px 6px; 
  }

  .cbs-vehicle-list{
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    padding: 10px 50px;
  }
</style>


<script>
  import TabList from 'components/Tabs/TabList.vue'
  import Animation from 'components/Website/Animation.vue'
  import { mapActions, mapGetters } from 'vuex'
  import VueSilentbox from 'vue-silentbox'
  
  export default {
    data () {
      return {
        tab: null,
        index: null
      }
    },
    components:{
      TabList,
      Animation,
      VueSilentbox
    },

    computed: {
      ...mapGetters({
        gallery: 'content/gallery',
      })
    },

    methods:{
      ...mapActions({
        getGallery: 'content/getGallery',
      })
    },

    mounted(){
      this.getGallery()
    }
  }
</script>