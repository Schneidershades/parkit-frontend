<template>
  <div id="q-app">
  	<q-ajax-bar ref="bar" size="3px" :delay="delay"/>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
   data: () => {
    return {
      delay: 0
    }
  },
}
</script>
