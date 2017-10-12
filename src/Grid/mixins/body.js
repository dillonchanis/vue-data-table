import * as buttons from '../../constants'
import { mergeWith } from 'lodash'

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

      return this.$createElement('tbody', { staticClass: 'grid__body' }, records)
    },
    createEmptyBody (text) {
      const row = this.$createElement('td', {
        attrs: { colspan: '100%' }
      }, text)

      return this.createTableRow([row])
    },
    createProps (record, index) {
      return { record, index, edit: this.edit, grid: this }
    },
    handleFormEdit (record) {
      if (this.isBeingEdited(record)) {
        this.saveRow(record)
      } else {
        this.editRow(record)
      }
    },
    isBeingEdited (record) {
      return this.edit.row === record.id
    },
    createEditButton (record) {
      return this.edit.row === record.id ? buttons.SAVE_BUTTON(this) : buttons.EDIT_BUTTON(this)
    },
    createBodyRow (row, record) {
      const self = this
      let data = {}

      if (this.selectable) {
        data = mergeWith(data, {
          on: {
            click: () => {
              self.selectRow(record)
            }
          }
        })
      }

      if (this.editable) {
        row.push(this.$createElement('td', {
          on: {
            click (e) {
              self.handleFormEdit(record)
            }
          }
        }, [this.createEditButton(record)]))

        data = mergeWith(data, {
          on: {
            dblclick: () => {
              self.editRow(record)
            }
          }
        })
      }

      data.staticClass = 'grid__row'

      return this.createTableRow(row, data)
    },
    createFilteredRecords () {
      const rows = []

      this.filteredRecords.forEach((record, index) => {
        const props = this.createProps(record, index)
        const row = this.$scopedSlots.records ? this.$scopedSlots.records(props) : []

        rows.push(
          this.needsTableRow(row)
            ? this.createBodyRow(row, record)
            : row
        )
      })

      return rows
    }
  }
}
