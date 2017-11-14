<template>
  <div id="app">
    <navbar :title="title"></navbar>
      <trade-records></trade-records>
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar.vue'
import TradeRecords from './components/TradeRecords.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    TradeRecords
  },
  data () {
    return {
      title: 'TradeRecords',
      subHeader: 'Fill Records'
    }
  }
}
</script>

<style>
body {
  margin:0;
  padding:0
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
a {
  color: #42b983;
}
</style>
