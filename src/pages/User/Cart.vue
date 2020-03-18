<template>
  <q-page padding>
      <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="Cart" />
      </q-breadcrumbs>
    </div>

    <div class="q-pa-md">
        <div class="q-gutter-y-md">
          <CartPage/>
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
    import CartPage from 'components/Cart/CartPage.vue'
    
    export default {
      components:{
        CartPage
      },

    }

</script>