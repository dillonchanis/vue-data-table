<template>
  <div>
    <label for="group-select">Group By:</label>
    <select id="group-select" v-model="selected" @change="updateGrouping">
      <option v-for="group in groups" :value="group.value" :key="group.value">
        {{ group.value }}
      </option>
    </select>

    <template v-if="groupings.length > 0">
      <ul class="list-inline">
        <li v-for="(selectedGroup, index) in groupings" :key="selectedGroup">
          {{ selectedGroup }} <span @click="removeFromGrouping(selectedGroup)">&times;</span>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  name: 'grid-grouper',
  props: {
    groups: {
      required: true
    }
  },
  data () {
    return {
      selected: this.groups[0],
      groupings: []
    }
  },
  methods: {
    addToGrouping () {
      this.groupings.push(this.selected)
      this.$emit('change', this.groupings)
    },
    updateGrouping () {
      this.groupings.includes(this.selected)
        ? this.removeFromGrouping()
        : this.addToGrouping()
    },
    removeFromGrouping (value) {
      if (!value) {
        this.groupings = this.groupings.filter(group => group !== this.selected)
      } else {
        this.groupings = this.groupings.filter(group => group !== value)
      }

      this.$emit('change', this.groupings)
    }
  }
}
</script>

<style scoped>
.list-inline li {
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
