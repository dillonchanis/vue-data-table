<template>
  <div class="grid__grouper">
    <label class="grid__label" for="group-select">Group By:</label>
    <select class="grid__select" id="group-select" v-model="selected" @change="update">
      <option v-for="group in groups" :value="group.value" :key="group.value">
        {{ group.value }}
      </option>
    </select>

    <div class="grouper__chosen" v-if="selected">
      <button class="button button--pill" @click="remove">{{ selected }} &times;</button>
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
