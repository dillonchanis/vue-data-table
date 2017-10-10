export default {
  methods: {
    createTableLoader () {
      return this.$createElement('thead', {
        staticClass: 'table__loader'
      }, [this.createLoaderCell()])
    },
    createLoaderCell () {
      return this.$createElement('th', {
        staticClass: 'table__loader-indicator',
        attrs: {
          colspan: '100%'
        }
      }, [])
    }
  }
}
