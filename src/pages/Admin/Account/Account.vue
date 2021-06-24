<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="All Account Locations" />
      </q-breadcrumbs>
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <div class="row" v-if="locations">  
          <template v-if="locations">
            <q-card   v-for="locate in locations" :key="locate.id" class="q-ma-sm my-card bg-primary text-white">
              <q-card-section>
                <div class="text-h6">{{locate.code}}</div>
                <div class="text-subtitle2">{{locate.locationName}}</div>
              </q-card-section>

              <q-card-section>
                <p >Income: {{locate.incomeAmount}}</p> 
                <p >Expense: {{locate.expenseAmount}}</p> 
                <p >Carry Forward: {{locate.carryForwardAmount}}</p> 
              </q-card-section>

              <q-separator dark />

              <q-card-actions>
                <q-btn flat @click="viewLocation(locate)">View Account Details</q-btn>
              </q-card-actions>
            </q-card>
          </template>
            
        </div>
      </div>
    </div>

  </q-page>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'

export default {
 
  computed: {
      ...mapGetters({
          user: 'auth/user',
          locations: 'locationSettings/locations',
      })
  },

  methods:{
      ...mapActions({
          sendLocationsDetails: 'accountLocation/setAccountLocationSelected',
          getLocations: 'locationSettings/getLocations',
      }),

      viewLocation(location) {
        this.sendLocationsDetails(location).then((response) => {
          // console.log(`/admin/account/location/${locationId}`)
          return this.$router.push({ path: `/web/admin/account/location/${location.id}` })   
        }).catch(() => {
            console.log('not available')
        })  
      },
  },

  mounted(){
    this.getLocations()
  }
}
</script>