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
        <div class="row" v-if="user.location">  
          <q-card class="q-ma-sm my-card bg-primary  text-white">
            <q-card-section>
              <div class="text-h6">{{user.location.code}}</div>
              <div class="text-subtitle2">{{user.location.locationName}}</div>
            </q-card-section>

            <q-card-section>
              <p >Income: {{user.location.incomeAmount}}</p> 
              <p >Expense: {{user.location.expenseAmount}}</p> 
              <p >Carry Forward: {{user.location.carryForwardAmount}}</p> 
            </q-card-section>

            <q-separator dark />

            <q-card-actions>
              <q-btn flat @click="viewLocation(user.location)">View Account Details</q-btn>
            </q-card-actions>
          </q-card>

          <!-- children -->

          <q-card  v-if="user.location.childrenLocations" v-for="locate in user.location.childrenLocations" :key="locate.id" class="q-ma-sm my-card bg-primary text-white">
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
      })
  },

  methods:{
      ...mapActions({
          sendLocationsDetails: 'accountLocation/setAccountLocationSelected',
      }),

      viewLocation(location) {
        this.sendLocationsDetails(location).then((response) => {
          // console.log(`/admin/account/location/${locationId}`)
          return this.$router.push({ path: `/admin/account/location/${location.id}` })   
        }).catch((error) => {
            console.log('not available')
        })  
      },
  },

  mounted(){

  }
}
</script>