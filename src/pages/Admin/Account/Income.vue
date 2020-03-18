<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="Income Transactions" />
      </q-breadcrumbs>
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <q-form @submit="submitTransactions" ref="form">
          <div v-for="(line, index) in lines" :key="index" class="row q-py-md">
            <div class="col-md-4 q-pa-sm">
                <q-input filled v-model="line.date" mask="date" :value="optionsFn" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="qDateProxy[index]" transition-show="scale" transition-hide="scale">
                            <q-date v-model="line.date" :options="optionsFn" @input="() => $refs.qDateProxy[index].hide()" />
                          </q-popup-proxy>
                      </q-icon>
                    </template>
                </q-input>
            </div>

            <div class="col-md-4 q-pa-sm">
                <q-input
                    filled
                    v-model="line.title"
                    label="Description *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type a transaction description']"
                />
            </div>

            <div class="col-md-4 q-pa-sm">
                <q-input
                    filled
                    v-model="line.type"
                    label="Transaction Type *"
                    readonly
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please insert a type']"
                />
            </div>

            <div class="col-md-4 q-pa-sm">
                <q-input
                    filled
                    v-model="line.reference"
                    label="Receipt/Reference *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please insert a reference']"
                />
            </div>

            <div class="col-md-4 q-pa-sm">
                <q-input
                    filled
                    v-model="line.amount"
                    label="Amount *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please insert an amount']"
                />
            </div>
             <div class="col-md-4 q-pa-sm">
                <q-input
                    filled
                    v-model="line.location"
                    label="Location *"
                    readonly
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please insert a type']"
                />
            </div>

            <div class="col-12" align="right">
              <div class="block float-right">
                <q-btn round @click="removeLine(index)" icon="delete" />
                <q-btn round v-if="index + 1 === lines.length" @click="addLine" icon="playlist-plus"/>
              </div>
            </div>
          </div>

          <q-card-actions>
            <q-btn type="submit" unelevated color="primary" class="q-px-md" size="lg" label="Post Transaction" />
          </q-card-actions>

        </q-form>

      </div>
    </div>

  </q-page>
</template>


<script>

import { mapActions, mapGetters } from 'vuex'
import { date } from 'quasar'

export default {
  // name: 'PhoneNumberLine',
  props :[
    'locationId'
  ],
  data () {
    return {
      lines: [],

      date: '',
      blockRemoval: true,
      phoneUsageTypes: [
        {
          label: 'Home', value: 'home'
        }, {
          label: 'Work', value: 'work'
        }, {
          label: 'Mobile', value: 'mobile'
        }, {
          label: 'Fax', value: 'fax'
        }
      ],
      countryPhoneCodes: [
        {
          label: '+90',
          value: '+90'
        }, {
          label: '+1',
          value: '+1'
        }
      ]
    }
  },
  computed: {
      ...mapGetters({
          location: 'accountLocation/accountLocationDetails',
      }),
  },
  watch: {
    lines () {
      this.blockRemoval = this.lines.length <= 1
    }
  },
  methods: {
    addLine () {
      let checkEmptyLines = this.lines.filter(line => line.title === null)

      if (checkEmptyLines.length >= 1 && this.lines.length > 0) {
         return
      } 

      this.lines.push({
        title: null,
        type: 'income',
        reference: null,
        location: this.location.locationName,
        location_id: this.location.id,
        amount: null,
        date: '',
      })
    },

    removeLine (lineId) {
      if (!this.blockRemoval) {
         this.lines.splice(lineId, 1)
      }
    },

    optionsFn (mon) {
      var today = new Date();
      var bu = today.getDate();
        
      console.log(new Date())
      var timeStamp = Date.now()
      var formattedString = date.formatDate(timeStamp, 'YYYY/MM/DD')
        return mon >= formattedString
    },

    submitTransactions(){

    }
  },
  mounted () {
    this.addLine()
  }
}
</script>