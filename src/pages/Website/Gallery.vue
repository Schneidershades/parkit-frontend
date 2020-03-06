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
                    <div class="col-md-3 vehicle-cbs">
                      <q-tab name="mails" label="Mails" />
                    </div>
                    <div class="col-md-3 vehicle-cbs">
                      <q-tab name="alarms" label="Alarms" />
                    </div>

                    <div class="col-md-3 vehicle-cbs">
                      <q-tab name="movies" label="Movies" />
                    </div>
                  </div>
                  
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                  <q-tab-panel name="mails">
                    <div class="text-h6">Mails</div>
                    <div class="row" style="justify-content: space-around;">
                      <gallery :images="images" :index="index" @close="index = null"></gallery>
                      <div
                        class="image col-md-3"
                        v-for="(image, imageIndex) in images"
                        :key="imageIndex"
                        @click="index = imageIndex"
                        :style="{ backgroundImage: 'url(' + image + ')', width: '230px', height: '150px' }"
                      ></div>
                    </div>
                  </q-tab-panel>

                  <q-tab-panel name="alarms">
                    <div class="text-h6">Alarms</div>
                    <div class="row" style="justify-content: space-around;">
                      <gallery :images="images" :index="index" @close="index = null"></gallery>
                      <div
                        class="image col-md-3"
                        v-for="(image, imageIndex) in images"
                        :key="imageIndex"
                        @click="index = imageIndex"
                        :style="{ backgroundImage: 'url(' + image + ')', width: '230px', height: '150px' }"
                      ></div>
                    </div>
                  </q-tab-panel>

                  <q-tab-panel name="movies">
                    <div class="text-h6">Movies</div>
                    <div class="row" style="justify-content: space-around;">
                      <gallery :images="images" :index="index" @close="index = null"></gallery>
                      <div
                        class="image col-md-3"
                        v-for="(image, imageIndex) in images"
                        :key="imageIndex"
                        @click="index = imageIndex"
                        :style="{ backgroundImage: 'url(' + image + ')', width: '230px', height: '150px' }"
                      ></div>
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
    import VueGallery from 'vue-gallery'
    
    export default {
      data () {
        return {
          slide: 'first',
          tab: 'mails',
          images: [
            'https://dummyimage.com/800/ffffff/000000',
            'https://dummyimage.com/1600/ffffff/000000',
            'https://dummyimage.com/1280/000000/ffffff',
            'https://dummyimage.com/400/000000/ffffff',
            'https://dummyimage.com/800/ffffff/000000',
            'https://dummyimage.com/1600/ffffff/000000',
            'https://dummyimage.com/1280/000000/ffffff',
            'https://dummyimage.com/400/000000/ffffff',
          ],

          index: null
        }
      },
      components:{
        TabList,
        Animation,
        'gallery': VueGallery,
      }
    }
</script>