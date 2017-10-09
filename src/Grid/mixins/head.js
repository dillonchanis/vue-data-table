export default {
  methods: {
    createTableHead () {
      const row = this.columns.map(c => this.createHeader(c))

      if (this.editable) {
        row.push(this.$createElement('th', {}, []))
      }

      return this.$createElement('thead', [this.createTableRow(row)])
    },
    createHeader (column) {
      return this.$createElement('th', ...this.createHeaderData(column, column[this.columnText]))
    },
    createSortingData (column, children, data) {
      if (!('value' in column)) {
        this.warn('Columns must have a value property.')
      }

      data.attrs.tabIndex = 0
      data.on = {
        click: () => {
          this.sortBy(column)
        },
        keydown: e => {
          if (e.keyCode === 32 || e.keyCode === 13) {
            e.preventDefault()
            this.sortBy(column)
          }
        }
      }

      if (this.sort.key === column.value) {
        data.attrs['aria-sort'] = this.sort.order
      }
    },
    createHeaderData (column, children) {
      const data = {
        attrs: {
          role: 'columnheader',
          'aria-label': column[this.columnText] || '',
          'aria-sort': 'none'
        }
      }

      this.createSortingData(column, children, data)

      return [data, children]
    }
  }
}
