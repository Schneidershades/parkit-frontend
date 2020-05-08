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
          <q-card class="q-ma-sm my-card bg-primary text-white">
            <q-card-section>
              <div class="text-h6">{{user.location.code}}</div>
              <div class="text-subtitle2">{{user.location.locationName}}</div>
            </q-card-section>

            <q-card-section>
              <p >Users: {{user.location.numberOfUsers}}</p> 
            </q-card-section>

            <q-separator dark />

            <q-card-actions>
              <q-btn flat @click="viewLocation(user.location)">View Users in Location</q-btn>
            </q-card-actions>
          </q-card>

          <q-card  v-if="user.location.childrenLocations" v-for="locate in user.location.childrenLocations" :key="locate.id" class="q-ma-sm my-card bg-primary text-white">
            <q-card-section>
              <div class="text-h6">{{locate.code}}</div>
              <div class="text-subtitle2">{{locate.locationName}}</div>
            </q-card-section>

            <q-card-section>
              <p >Users: {{locate.numberOfUsers}}</p>
            </q-card-section>

            <q-separator dark />

            <q-card-actions>
              <q-btn flat @click="viewLocation(locate)">View Users in Location</q-btn>
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
  data(){
    return {

    }
  },

  computed: {
      ...mapGetters({
          user: 'auth/user',
      })
  },

  methods:{
    ...mapActions({
        sendLocationsDetails: 'users/getLocationUsers',
    }),

    viewLocation(location) {
      this.sendLocationsDetails(location.id).then((response) => {
        return this.$router.push({ path: `/admin/users/location/${location.id}` })   
      }).catch((error) => {
          console.log('not available')
      })  
    },
  },
}
</script>