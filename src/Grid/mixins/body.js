import { isEmpty } from '../../helpers'
import * as buttons from '../../constants'

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
      return { record, index, edit: this.edit }
    },
    // createTD (record, data = {}) {
    //   const td = []

    //   for (let i = 0; i < this.columns.length; i++) {
    //     let value = this.columns[i].value

    //     td.push(record[value])
    //   }

    //   return td.map(item => this.$createElement('td', data, item))
    // },
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

      if (this.editable) {
        row.push(this.$createElement('td', {
          on: {
            click (e) {
              self.handleFormEdit(record)
            }
          }
        }, [this.createEditButton(record)]))

        data = {
          on: {
            dblclick: () => {
              self.editRow(record)
            }
          }
        }
      }

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

      if (!rows.every(isEmpty)) return rows

      return this.filteredRecords.map(record => this.createTableRow(this.createTD(record)))
    }
  }
}
