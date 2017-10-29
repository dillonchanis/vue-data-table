export default {
  methods: {
    createTableHead () {
      if (!this.columns) return

      const row = this.columns.map(c => this.createHeader(c))

      if (this.editable) {
        row.push(this.$createElement('th', {}, []))
      }

      if (this.multiSelect) {
        row.unshift(this.$createElement('th', {}, [
          this.$createElement('input', {
            domProps: {
              type: 'checkbox'
            },
            on: { change: this.selectAll }
          })
        ]))
      }

      return this.$createElement('thead', {
        staticClass: 'grid__head',
        'class': {
          'head--fixed': this.fixedHead // TODO
        }
      }, [this.createTableRow(row)])
    },

    createHeader (column) {
      return this.$createElement('th', ...this.createHeaderData(column, [column[this.columnText]]))
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

        const icon = this.$createElement('i', {
          attrs: {
            'aria-hidden': true,
            class: this.getSortingClass(this.sort.order)
          },
          style: {
            marginLeft: '5px'
          }
        })

        children.push(icon)
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

      if (column.title) {
        data.attrs.title = column.title
      }

      this.createSortingData(column, children, data)

      return [data, children]
    },

    getSortingClass (order) {
      const classes = {
        asc: 'fa fa-sort-amount-asc',
        desc: 'fa fa-sort-amount-desc'
      }

      return classes[order]
    }
  }
}
