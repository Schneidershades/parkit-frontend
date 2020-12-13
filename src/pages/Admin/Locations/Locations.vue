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

        <div class="row" v-if="locations" > 
          <template v-for="locate in locations" >
            <q-card  :key="locate.id" class="col q-ma-sm bg-primary text-white my-card">
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

              <q-card-actions vertical>
                <q-btn unelevated color="blue" @click="viewAccount(locate)">Account</q-btn>
                <q-btn unelevated color="green" @click="viewExpense(locate)">Expenses </q-btn>
                <q-btn unelevated color="black" @click="viewSales(locate)">Income </q-btn>
                <q-btn unelevated color="orange" @click="viewEmployees(locate)">Employees</q-btn>
                <q-btn unelevated color="purple" @click="viewPlateNumbers(locate)">Plate Numbers </q-btn>
                <q-btn unelevated color="red" @click="viewPricelist(locate)">Price Lists</q-btn>
                <q-btn unelevated color="indigo" @click="viewUsers(locate)">Location Users </q-btn>
                <!-- <q-btn unelevated color="cyan" @click="viewLocation(locate)">Price Lists</q-btn> -->
                <!-- <q-btn unelevated color="pink" @click="viewLocation(locate)">Location Users </q-btn> -->
              </q-card-actions>
            </q-card>
          </template> 
            
        </div>

        <q-dialog v-model="createLocation" >
          <q-card>
            <q-card-section>
              <div class="text-h6">Create a new Location</div>
            </q-card-section>

            <q-separator />

            <q-card-section style="max-height: 500vh">
              <q-form
                @submit.prevent="saveModel"
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
                    type="email"
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

                  <!-- <div class="col-6 q-pa-sm">
                    <q-input
                    filled
                    v-model="form.overseer"
                    label="Contact Person *"
                    hint="Please a contact person"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type']"
                    />
                  </div> -->

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
                    <q-select filled v-model="form.type" :options="locationWashOptions" label="Type ?" />
                  </div>

                  <div class="col-6 q-pa-sm">
                    <q-select filled v-model="form.franchise" :options="franchiseOptions" label="Franchise?" />
                  </div>


                  <div class="col-6 q-pa-sm" >
                    <q-select filled v-model="form.origin_head_office" :options="franchiseOptions" label="Head Office?" />
                  </div>

                  <div class="col-6 q-pa-sm" v-if="form.origin_head_office == 'no'">
                    <q-select 
                        filled 
                        :options="locations" 
                        v-model="form.parent_id" 
                        :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
                        :option-label="opt => Object(opt) === opt && 'id' in opt ? opt.address : null"
                        :option-disable="opt => Object(opt) === opt ? opt.inactive === true : true"
                        emit-value
                        map-options
                        label="Select Parent Office *" />
                  </div>

                  <!-- <div class="col-6 q-pa-sm">
                    <q-input
                    filled
                    v-model="form.city_id"
                    label="Location City *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />
                  </div>

                  <div class="col-6 q-pa-sm">
                    <q-input
                    filled
                    v-model="form.state_id"
                    label="Location State *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />
                  </div>

                  <div class="col-6 q-pa-sm">
                    <q-input
                    filled
                    v-model="form.country_id"
                    label="Location Country *"
                    hint="Nigeria"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                    />
                  </div> -->
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
        origin_head_office: '',
        name: '',
        code: '',
        short_name: '',
        email: '',
        phone: '',
        web: '',
        address: '',
        camera_config: '',
        franchise: '',
        head: '',
        parent_id: '',
        state_id: '',
        country_id: '',
        city_id: '',
        manager_id: '',
        type: '',
      },
      franchiseOptions: [
        'yes', 'no'
      ],
      locationWashOptions: [
        'location-wash', 'home-service-wash'
      ],
    }
  },
  computed: {
      ...mapGetters({
          user: 'auth/user',
          locations: 'locationSettings/locations',
          accountLocationDetails: 'accountLocation/accountLocationDetails',
      })
  },

  methods:{
    ...mapActions({
        sendLocationsDetails: 'accountLocation/setAccountLocationSelected',
        getLocations: 'locationSettings/getLocations',
        postLocation: 'locationSettings/postLocation',
    }),

    viewAccount(location) {
      this.sendLocationsDetails(location).then((response) => {
        return this.$router.push({ path: `/web/admin/account/location` })   
      })  
    },

    viewExpense(location) {
      this.sendLocationsDetails(location).then((response) => {
        return this.$router.push({ path: `/web/admin/expense/order/location` })   
      })  
    },

    viewSales(location) {
      this.sendLocationsDetails(location).then((response) => {
        return this.$router.push({ path: `/web/admin/online/transactions/location` })   
      })  
    },

    viewEmployees(location) {
      this.sendLocationsDetails(location).then((response) => {
        return this.$router.push({ path: `/web/admin/employees/location` })   
      })  
    },


    viewPlateNumbers(location) {
      this.sendLocationsDetails(location).then((response) => {
        return this.$router.push({ path: `/web/admin/settings/platenumbers/location` })   
      })  
    },

    viewPricelist(location) {
      this.sendLocationsDetails(location).then((response) => {
        return this.$router.push({ path: `/web/admin/settings/rates/location` })   
      }).catch((error) => {
          console.log('not available')
      })  
    },

    viewUsers(location) {
      this.sendLocationsDetails(location).then((response) => {
        return this.$router.push({ path: `/web/admin/users/location` })   
      }).catch((error) => {
          console.log('not available')
      })  
    },

    saveModel(){
      if(this.form.origin_head_office == 'yes'){
        this.form.origin_head_office = true
        this.form.head = false
      }

      if(this.form.origin_head_office == 'no'){
        this.form.origin_head_office = true
        this.form.head = false
      }

      if(this.form.franchise == 'yes'){
        this.form.franchise = true
      }

      if(this.form.franchise == 'no'){
        this.form.franchise = true
      }

      this.postLocation(this.form).then((response) => {
        this.createLocation = false 
      }).catch((error) => {
          console.log('not available')
      }) 
    }
  },

  mounted(){
    this.getLocations()
  }
}
</script>