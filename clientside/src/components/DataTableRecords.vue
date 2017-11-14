<template>
  <div id="data-sheet">
    <table class="u-full-width table condensed bordered">
      
      <thead>
        <tr>
          <th class="table-headers" v-for="column in columns" key="column.header">
            {{ column.label }} &#8593
          </th>
        </tr>
      </thead>

      <tbody v-if="isLoaded">
        <tr v-for="record in rows">
          <td v-for="val, field in record">{{ record[field] }}</td>
        </tr>
      </tbody>

      <tbody v-else>
        <table-row/>
        <table-row/>
        <table-row/>
        <table-row/>
        <table-row/>
        <table-row/>
        <table-row/>
        <table-row/>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getRecords } from '../utils/dataservice'
import TableRow from './TableRow.vue'

export default {
  components: {
    TableRow
  },
  data () {
    return {
      isLoaded: false,
      filterKey: '',
      rows: [],
      columns: [
        {
          header: 'createdAt',
          label: 'Date'
        },
        {
          header: 'tradeId',
          label: 'Trade ID'
        },
        {
          header: 'product',
          label: 'Product'
        },
        {
          header: 'orderType',
          label: 'Order Type'
        },
        {
          header: 'time',
          label: 'Time'
        },
        {
          header: 'currency',
          label: 'Currency'
        },
        {
          header: 'size',
          label: 'Size'
        },
        {
          header: 'sizeUnit',
          label: 'Unit'
        },
        {
          header: 'price',
          label: 'Price'
        },
        {
          header: 'fee',
          label: 'Fee'
        },
        {
          header: 'total',
          label: 'Total'
        }
      ]
    }
  },
  computed: {

  },
  mounted () {
    getRecords().then(result => {
      this.setRecords(result.data)
    })
  },
  methods: {
    hasRecords () {
      return tradeRecords.length >= 0
    },
    setRecords (records) {
      this.rows = records
      this.isLoaded = true
      console.log('records set')
    }
  }
}
    //   {
    //   tradeId: 'Trade ID',
    //     product: 'Product',
    //       orderType: 'Order Type',
    //         createdAt: 'Date',
    //           currency: 'Currency',
    //             size: 'Size',
    //               sizeUnit: 'Unit Size',
    //                 price: 'Price',
    //                   fee: 'Fee',
    //                     total: 'Total'
    // }
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  /*table-layout: fixed;*/
}

table th,
table td {
  padding: 10px 10px 9px;
  font-size: 13px;
  line-height: 18px;
  text-align: left;
}

table td {
  vertical-align: top;
  border-top: solid 1px #ddd;
}

table th {
  padding-top: 9px;
  font-weight: bold;
  vertical-align: middle;
  text-align: center;
}

table.condensed th,
table.condensed td {
  padding: 5px 5px 4px;
}

table.bordered {
  border-collapse: separate;
  border: solid 1px #ddd;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}

table.bordered th+th,
table.bordered th+td,
table.bordered td+td {
  border-left: solid 1px #ddd;
}

.zebra-striped tbody tr:nth-child(odd) td,
.zebra-striped tbody tr:nth-child(odd) th {
  background: #f5f5f5;
}
</style>
