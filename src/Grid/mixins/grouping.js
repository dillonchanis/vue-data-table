import _ from 'lodash'

export default {
  methods: {
    createGroupingBody () {
      const records = []

      if (this.group.by.length) {
        records.push(this.createFilteredGroupings())
      } else {
        this.group.records = []
      }

      return this.$createElement('tbody', records)
    },
    createGroupHeaderTD (header) {
      const row = this.$createElement('td', {
        staticClass: 'grouped__header',
        attrs: {
          colspan: '100%'
        }
      }, header)

      return this.createTableRow([row])
    },
    createFilteredGroupings () {
      const rows = []

      this.filteredGroupings.forEach((record, index) => {
        if (_.isString(record)) {
          rows.push(this.createGroupHeaderTD(record))
        } else {
          record.forEach(data => {
            const props = this.createProps(data, index)
            const row = this.$scopedSlots.records ? this.$scopedSlots.records(props) : []
            const self = this

            if (this.editable) {
              row.push(this.$createElement('td', {
                on: {
                  click (e) {
                    self.handleFormEdit(record)
                  }
                }
              }, [this.createEditButton(record)]))

              data = _.mergeWith(data, {
                on: {
                  dblclick: () => {
                    self.editRow(record)
                  }
                }
              })
            }

            rows.push(
              this.needsTableRow(row)
                ? this.createTableRow(row)
                : row
            )
          })
        }
      })

      return rows
    }
  }
}
