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

        <q-btn type="submit" unelevated color="primary" class="q-px-md" size="md" label="Create New Location" @click="createLocation = true" />

        <div class="row">  
          <q-card  v-if="locations" v-for="locate in locations.data" :key="locate.id" class="q-ma-sm my-card bg-primary text-white">
            <q-card-section>
              <div class="text-h6">{{locate.code}}</div>
              <div class="text-subtitle2">{{locate.locationName}}</div>
            </q-card-section>

            <q-card-section>
              <p >Users: {{user.location.numberOfUsers}}</p> 

              
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

        <q-dialog v-model="createLocation" >
          <q-card>
            <q-card-section>
              <div class="text-h6">Create a new Location</div>
            </q-card-section>

            <q-separator />

            <q-card-section style="max-height: 500vh">
              <q-form
                @submit.prevent="saveRole"
                ref="form"
                >
                <div class="row">
                  <div class="col-6 q-pa-sm">
                    <q-input
                    filled
                    v-model="form.name"
                    label="Location Name *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />
                  </div>
                  <div class="col-6 q-pa-sm">
                    <q-input
                    filled
                    v-model="form.code"
                    label="Location Code *"
                    hint="Please insert a role"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />
                  </div>

                  <div class="col-6 q-pa-sm">
                    <q-input
                    filled
                    v-model="form.short_name"
                    label="Abbrevation *"
                    hint="Maryland Mall"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />
                  </div>
                  <div class="col-6 q-pa-sm">
                    <q-input
                    filled
                    v-model="form.email"
                    label="Contact Email *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />
                  </div>

                  <div class="col-6 q-pa-sm">
                    <q-input
                    filled
                    v-model="form.phone"
                    label="Contact Phone *"
                    hint="Please insert a role"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type a phone number']"
                    />
                  </div>
                  <div class="col-12 q-pa-sm">
                    <q-input
                    v-model="form.address"
                    filled
                    type="textarea"
                    label="Contact Address *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type a contact address']"
                    />
                  </div>

                  <div class="col-6 q-pa-sm">
                    <q-select filled v-model="form.franchise" :options="franchiseOptions" label="Franchise?" />
                  </div>


                  <div class="col-6 q-pa-sm" v-if="form.franchise == 'yes'">
                    <q-select filled v-model="form.head" :options="franchiseOptions" label="Head Office?" />
                  </div>

                  <div class="col-6 q-pa-sm" v-if="form.franchise == 'yes' && form.head == 'no'">
                    <q-input
                    filled
                    v-model="form.parent_id"
                    label="Select Parent Office *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />
                  </div>

                  <div class="col-6 q-pa-sm">
                    <q-input
                    filled
                    v-model="form.country"
                    label="Location Country *"
                    hint="Nigeria"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />
                  </div>

                  <div class="col-6 q-pa-sm">
                    <q-input
                    filled
                    v-model="form.state"
                    label="Location State *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />
                  </div>

                  <div class="col-6 q-pa-sm">
                    <q-input
                    filled
                    v-model="form.town"
                    label="Location Town *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />
                  </div>
                </div>

                <q-btn
                  type="submit"
                  label="Save New Location"
                  class="q-mt-md"
                  color="primary"
                  >
                </q-btn>
              </q-form>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn flat label="Close" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>

  </q-page>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data(){
    return {
      createLocation: null,
      form:{
        name: '',
        code: '',
        short_name: '',
        email: '',
        phone: '',
        address: '',
        franchise: '',
        parent_id: '',
        town: '',
        state: '',
        country: '',
        head: '',
      },
      franchiseOptions: [
        'yes', 'no'
      ]
    }
  },
  computed: {
      ...mapGetters({
          user: 'auth/user',
          locations: 'location/locations',
      })
  },

  methods:{
    ...mapActions({
        sendLocationsDetails: 'accountLocation/setAccountLocationSelected',
        getLocations: 'location/getLocations',
    }),

    viewLocation(location) {
      this.sendLocationsDetails(location).then((response) => {
        return this.$router.push({ path: `/admin/account/location/${location.id}` })   
      }).catch((error) => {
          console.log('not available')
      })  
    },

    createNewLocation(){

    }
  },

  mounted(){
    this.getLocations()
  }
}
</script>