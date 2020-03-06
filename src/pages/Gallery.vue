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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-tab-panel>

                  <q-tab-panel name="alarms">
                    <div class="text-h6">Alarms</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-tab-panel>

                  <q-tab-panel name="movies">
                    <div class="text-h6">Movies</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-tab-panel>
                </q-tab-panels>
              </q-card>
            </div>
        </div>
    </q-page>
</template>
<style  scoped>
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
    
    export default {
      data () {
        return {
          slide: 'first',
          tab: 'mails'
        }
      },
      components:{
        TabList,
        Animation
      }
    }
</script>