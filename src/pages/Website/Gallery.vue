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
                    <div class="col-md-3 vehicle-cbs" v-for="content in gallery.data" :key="content.slug">
                      <q-tab :name="content.slug" :label="content.name"  />
                    </div>
                  </div>
                  
                </q-tabs>

                <q-separator />
                <!-- {{tab}} -->
                
                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel :name="content.slug"  v-for="content in gallery.data" :key="content.name">
                    <div class="text-h6">{{content.name}}</div>
                    <div class="row" align="center">
                        <q-img rounded class="col-md-3 q-ma-sm rounded-borders" v-for="(image, i) in content.images" :src="image.image" :key="i" @click="index = i" style="width:250px"></q-img>
                        <vue-gallery-slideshow :images="images" :index="index" @close="index = null"></vue-gallery-slideshow>

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
  import { mapActions, mapGetters } from 'vuex'
  import VueGallerySlideshow from 'vue-gallery-slideshow';
  
  export default {
    data () {
      return {
        tab: null,
        index: null,
        images: [],
        index: null
      }
    },
    components:{
      VueGallerySlideshow
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