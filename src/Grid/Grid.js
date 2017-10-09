import _ from 'lodash'
import { warn } from '../helpers'

import GridFilter from './GridFilter'
import TableHead from './mixins/head'
import TableBody from './mixins/body'

export default {
  name: 'lunar-table',
  components: {},
  filters: {},
  mixins: [
    TableHead,
    TableBody
  ],
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    columnText: {
      type: String,
      default: 'label'
    },
    noRecords: {
      type: String,
      default: 'No data available.'
    },
    noResults: {
      type: String,
      default: 'No results found.'
    },
    records: {
      type: Array,
      required: true,
      default: () => []
    },
    url: {
      type: String
    },
    withFilter: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      filterQuery: '',
      sort: {
        key: 'id',
        order: 'asc'
      }
    }
  },
  computed: {
    filteredRecords () {
      let data = this.records

      data = data.filter(row => {
        return Object.keys(row).some(key => {
          return String(row[key]).toLowerCase().indexOf(this.filterQuery.toLowerCase()) > -1
        })
      })

      if (this.sort.key) {
        data = _.orderBy(data, item => {
          let value = item[this.sort.key]
          if (!isNaN(parseFloat(value))) {
            return parseFloat(value)
          }
          return String(value).toLowerCase()
        }, this.sort.order)
      }

      return data
    },
    recordsLength () {
      return this.records.length
    }
  },
  mounted () {
    if (!this.recordsLength && !this.url) {
      this.warn('You must provide an array of data or an API endpoint to fetch data from.')
    }
  },
  methods: {
    createTableRow (row, data = {}) {
      return this.$createElement('tr', data, row)
    },
    needsTableRow (row) {
      return row.length && row.find(r => r.tag === 'td')
    },
    sortBy (column) {
      this.sort.key = column.value
      this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc'
    },
    warn
  },
  render (h) {
    const self = this

    const filter = h(GridFilter, {
      props: {
        filterQuery: self.filterQuery
      },
      on: {
        input (text) {
          self.filterQuery = text
        }
      }
    })

    const table = h('table', {}, [
      this.createTableHead(),
      this.createTableBody()
    ])

    const grid = h('div', {}, [
      this.withFilter ? filter : null,
      table
    ])

    return grid
  }
}
