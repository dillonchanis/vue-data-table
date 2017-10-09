import { isEmpty } from '../../helpers'

export default {
  methods: {
    createTableBody () {
      const records = []

      if (!this.recordsLength) {
        records.push(this.createEmptyBody(this.noRecords))
      } else if (!this.filteredRecords.length) {
        records.push(this.createEmptyBody(this.noResults))
      } else {
        records.push(this.createFilteredRecords())
      }

      return this.$createElement('tbody', records)
    },
    createEmptyBody (text) {
      const row = this.$createElement('td', {
        attrs: { colspan: '100%' }
      }, text)

      return this.createTableRow([row])
    },
    createProps (record, index) {
      return { record, index }
    },
    createTD (record, data = {}) {
      const td = []

      for (let i = 0; i < this.columns.length; i++) {
        let value = this.columns[i].value

        td.push(record[value])
      }

      return td.map(item => this.$createElement('td', data, item))
    },
    createFilteredRecords () {
      const rows = []

      this.filteredRecords.forEach((record, index) => {
        const props = this.createProps(record, index)

        const row = this.$scopedSlots.records
          ? this.$scopedSlots.records(props)
          : []

        rows.push(
          this.needsTableRow(row)
            ? this.createTableRow(row)
            : row
        )
      })

      if (!rows.every(isEmpty)) {
        return rows
      }

      return this.filteredRecords.map(record => this.createTableRow(this.createTD(record)))
    }
  }
}
