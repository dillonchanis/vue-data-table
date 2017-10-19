import _ from 'lodash'
import axios from 'axios'
import { warn, createFunctionalComponent, exportToCSV, exportToPDF } from '../helpers'

import GridFilter from './GridFilter'
import GridPageSize from './GridPageSize'
import GridGrouper from './GridGrouper'
import GroupList from './Grouping/GroupList'
import Action from './Actions/Button'
import Preview from './Preview'

import TableHead from './mixins/head'
import TableBody from './mixins/body'
import TableGrouping from './mixins/grouping'
import TableLoader from './mixins/loader'

export default {
  name: 'lunar-table',

  components: {
    'lunar-container': createFunctionalComponent('div', 'lunar-table-container', 'lunar-table-container')
  },

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
      default: false
    },
    limitOptions: {
      type: Array,
      default: () => [5, 50, 100, 'All']
    },
    multiSelect: {
      type: Boolean,
      default: false
    },
    noRecords: {
      type: String,
      default: 'No data available.'
    },
    noResults: {
      type: String,
      default: 'No results found.'
    },
    recordKey: {
      type: String,
      default: 'id'
    },
    records: {
      type: Array,
      default: () => []
    },
    selectable: {
      type: Boolean,
      default: false
    },
    tableID: {
      type: String,
      required: false
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
        by: [],
        records: []
      },
      limit: {
        pageSize: this.limitOptions[0]
      },
      loading: false,
      response: {
        records: [],
        errors: []
      },
      selected: {
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
    filteredGroupings () {
      let data = this.group.records[0]
      const keys = Object.keys(data)
      const groupedData = []

      for (let i = 0; i < keys.length; i++) {
        let items = data[keys[i]]

        items = items.filter(row => {
          return Object.keys(row).some(key => {
            return String(row[key]).toLowerCase().indexOf(this.filterQuery.toLowerCase()) > -1
          })
        })

        if (this.sort.key) {
          items = _.orderBy(items, item => {
            let value = item[this.sort.key]
            if (!isNaN(parseFloat(value))) {
              return parseFloat(value)
            }
            return String(value).toLowerCase()
          }, this.sort.order)
        }

        groupedData.push(keys[i])
        groupedData.push(items)
      }

      return groupedData
    },
    recordsLength () {
      return this.response.records.length
    }
  },

  mounted () {
    if (this.selectable && this.multiSelect) {
      this.warn('Only use selectable or multiselect options, not both.')
    }

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
    clearGrouping () {
      this.group.by = []
    },
    createTableRow (row, data = {}) {
      return this.$createElement('tr', data, row)
    },
    editRow (record) {
      this.edit.row = record.id
      this.edit.form = record
    },
    csv () {
      exportToCSV(this.$el, 'Example File', {
        editable: this.editable,
        multiSelect: this.multiSelect
      })
    },
    getRecords () {
      return axios.get(`${this.url}?_start=0&_limit=${this.limit.pageSize}`)
        .then((response) => {
          this.response.records = response.data
        })
        .catch((error) => {
          this.response.errors = error
        })
    },
    isSelected (id) {
      if (this.selected.records.length) {
        return this.selected.records[0].id === id
      }
      return false
    },
    needsTableRow (row) {
      return row.length && (row.find(r => r.tag === 'td') || row.find(r => r.tag.includes('grid-column')))
    },
    pdf () {
      exportToPDF(this.$el, 'Example PDF')
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
    selectRow (record) {
      if (!this.multiSelect) {
        this.selectSingleRow(record)
      } else {
        this.selectRows(record)
      }
    },
    setGrouping () {
      this.group.records = [_.groupBy(this.filteredRecords, records => records[this.group.by[0]])]
    },
    selectAll (event) {
      if (this.selected.records.length > 0) {
        this.selected.records = []
        return
      }

      const selected = []

      this.response.records.forEach(record => {
        selected.push(record)
      })

      this.selected.records = selected
    },
    selectSingleRow (record) {
      this.selected.records = []
      this.selected.records.push(record)
    },
    selectRows (record) {
      const index = _.findIndex(this.selected.records, record)

      if (index >= 0) {
        this.selected.records = _.remove(this.selected.records, r => r !== record)
        return
      }

      this.selected.records.push(record)
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

    const groupList = h(GroupList, {
      props: {
        group: self.group.by
      },
      on: {
        click () {
          self.clearGrouping()
        }
      }
    })

    const csvButton = h(Action, {
      props: {
        text: 'CSV',
        action: self.csv
      }
    })

    const pdfButton = h(Action, {
      props: {
        text: 'PDF',
        action: self.pdf
      }
    })

    const table = h('table', { staticClass: 'lunar__grid', attrs: { id: this.id || 'l-grid' } }, [
      this.createTableHead(),
      this.group.records.length > 0 ? this.createGroupingBody() : this.createTableBody()
    ])

    // Temporary, to view selected items
    const preview = h(Preview, {
      props: {
        record: self.selected.records
      }
    })

    const grid = h('lunar-container', {}, [
      this.withFilter ? filter : null,
      this.withGrouping ? grouper : null,
      this.withGrouping ? groupList : null,
      csvButton,
      pdfButton,
      table,
      this.withLimit ? pageSize : null
    ])

    const content = h('div', {}, [
      grid,
      preview
    ])

    return content
  }
}
