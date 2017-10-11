import _ from 'lodash'
import axios from 'axios'
import { warn } from '../helpers'

import GridFilter from './GridFilter'
import GridPageSize from './GridPageSize'
import GridGrouper from './GridGrouper'
import GridGroupBody from './GridGroupBody'

import TableHead from './mixins/head'
import TableBody from './mixins/body'
import TableGrouping from './mixins/grouping'
import TableLoader from './mixins/loader'

export default {
  name: 'lunar-table',
  components: {},
  filters: {},
  mixins: [TableHead, TableBody, TableGrouping, TableLoader],
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    columnText: {
      type: String,
      default: 'label'
    },
    editable: {
      type: Boolean,
      default: true
    },
    limitOptions: {
      type: Array,
      default: () => [25, 50, 100, 'All']
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
      default: () => []
    },
    url: {
      type: String,
      default: null
    },
    withGrouping: {
      type: Boolean,
      default: false
    },
    withLimit: {
      type: Boolean,
      default: true
    },
    withFilter: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      edit: {
        row: null,
        form: {}
      },
      filterQuery: '',
      group: {
        by: null,
        map: [],
        records: []
      },
      limit: {
        pageSize: this.limitOptions[0]
      },
      loading: false,
      response: {
        records: []
      },
      sort: {
        key: 'id',
        order: 'asc'
      }
    }
  },
  computed: {
    filteredRecords () {
      let data = this.response.records

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
      return this.response.records.length
    }
  },
  mounted () {
    this.response.records = this.records

    if (!this.recordsLength && !this.url) {
      this.warn('You must provide an array of data or an API endpoint to fetch data from.')
    } else if (this.recordsLength && this.url) {
      this.response.records = []
      this.warn('Only provide an API endpoint or an array of data not both.')
    } else if (this.url) {
      this.getRecords()
    }
  },
  methods: {
    clearEdit () {
      this.edit.row = null
      this.edit.form = {}
    },
    createTableRow (row, data = {}) {
      return this.$createElement('tr', data, row)
    },
    editRow (record) {
      this.edit.row = record.id
      this.edit.form = record
    },
    getRecords () {
      return axios.get(`${this.url}?_start=0&_limit=${this.limit.pageSize}`).then((response) => {
        this.response.records = response.data
      })
    },
    needsTableRow (row) {
      return row.length && (row.find(r => r.tag === 'td') || row.find(r => r.tag.includes('grid-column')))
    },
    saveRow (record) {
      axios.patch(`${this.url}/${this.edit.row}`, this.edit.form).then((response) => {
        // Placeholder for inline editing until actual server is setup
        const newValue = this.response.records.map((record) => {
          let columnValue = record

          if (response.data.id === record.id) {
            columnValue = response.data
          }
          return columnValue
        })

        this.response.records = newValue
        this.clearEdit()
      })
    },
    setGrouping () {
      this.group.records = [_.groupBy(this.filteredRecords, records => records[this.group.by[0]])]
      this.createGroupingList()
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
        input (queryText) {
          self.filterQuery = queryText
        }
      }
    })

    const pageSize = h(GridPageSize, {
      props: {
        limitOptions: self.limitOptions
      },
      on: {
        change (pageSize) {
          self.limit.pageSize = pageSize
          self.getRecords()
        }
      }
    })

    const grouper = h(GridGrouper, {
      props: {
        groups: self.columns
      },
      on: {
        change (grouping) {
          self.group.by = grouping
          self.setGrouping()
        }
      }
    })

    const groupBody = h(GridGroupBody, {
      props: {
        records: this.group.records[0]
      }
    })

    const table = h('table', {}, [
      this.createTableHead(),
      // this.createTableLoader(),
      this.createTableBody()
    ])

    const grid = h('div', {}, [
      this.withFilter ? filter : null,
      this.withGrouping ? grouper : null,
      this.group.records.length > 0 ? groupBody : table,
      this.withLimit ? pageSize : null
    ])

    return grid
  }
}
