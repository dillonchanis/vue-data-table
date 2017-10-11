export default {
  methods: {
    createGroupingList () {
      const groupingObject = this.group.records[0]
      this.group.map = Object.keys(groupingObject).map(key => groupingObject[key])
      console.log(this.group.records[0])
      console.log(this.group.map)
    }
  }
}
