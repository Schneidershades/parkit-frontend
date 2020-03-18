<template>
  <q-page padding>
      <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="Dashboard" />
        <q-breadcrumbs-el label="Welcome Back" />
      </q-breadcrumbs>
    </div>

    <div class="q-pa-md">
        <div class="q-gutter-y-md">
            <tab-list></tab-list>
        </div>
    </div>
    
  </q-page>
  
</template>

<style  scoped>
    .absolute-bottom{
      text-align: left;
      padding: 12px;
      color: white;
      background-color: rgba(0, 0, 0, .5);
      height: -webkit-fill-available;
      padding: 220px 80px 75px;
    }
</style>

<script>
  import TabList from 'components/Tabs/TabList.vue'
  import auth from '../../router/middleware/auth.js'
    
    export default {
      data () {
        return {
          tab: 'mails'
        }
      },
      components:{
        TabList
      },

      middleware: [
        auth
      ]
    }

</script>