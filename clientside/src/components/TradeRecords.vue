<template>
  <div id='trade-records' class="container">
    <div class="row">
      <uploader></uploader>
    </div>
    <div class="row">
      <data-table-records></data-table-records>
    </div>
  </div>
</template>

<script>
import DataTableRecords from './DataTableRecords.vue'
import Uploader from './Uploader.vue'

export default {
  components: {
    Uploader,
    DataTableRecords
  }
}
</script>

<style>

</style>
