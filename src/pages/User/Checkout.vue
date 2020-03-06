<template>
	<q-page padding>
      <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="Checkout" />
      </q-breadcrumbs>
    </div>

    <div class="q-pa-md">
        <div class="q-gutter-y-md">
          <CheckoutPage/>
        </div>
    </div>
    
  </q-page>
</template>

<script>
    import CheckoutPage from 'components/Checkout/CheckoutPage.vue'
    
    export default {
      components:{
        CheckoutPage
      },

    }

</script>