<template>
  <div>
    <label for="group-select">Group By:</label>
    <select id="group-select" v-model="selected" @change="update">
      <option v-for="group in groups" :value="group.value" :key="group.value">
        {{ group.value }}
      </option>
    </select>

    <div v-if="selected">
      <strong>{{ selected }} <span @click="remove">&times;</span></strong>
    </div>
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
      selected: null,
      groupings: []
    }
  },
  methods: {
    update () {
      this.groupings = []
      this.groupings.push(this.selected)
      this.$emit('change', this.groupings)
    },
    remove () {
      this.groupings = []
      this.selected = null
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
