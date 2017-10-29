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

    createTD (children) {
      return this.$createElement('td', {}, [children])
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
          'class': {
            'grid__row--selected': self.isSelected(record.id)
          },
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

      if (this.multiSelect) {
        row.unshift(this.createBodyCheckbox(record))
      }

      data.staticClass = 'grid__row'

      return this.createTableRow(row, data)
    },

    createBodyCheckbox (record) {
      const self = this
      const checkbox = this.$createElement('input', {
        domProps: {
          type: 'checkbox',
          checked: self.isSelected(record.id)
        },
        on: {
          click: (event) => {
            self.selectRow(event, record)
          }
        }
      })

      return this.createTD(checkbox)
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
