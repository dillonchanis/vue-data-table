<template>
  <div class="grid__grouper">
    <label class="grid__label" for="group-select">Group: </label>
    <select class="grid__select" id="group-select" v-model="selected" @change="update">
      <option v-for="group in groups" :value="group.value" :key="group.value">
        {{ group.value }}
      </option>
    </select>
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

<style lang="scss" scoped>
.grid__grouper {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1em 24px;
  width: 30%;

  .grid__label {
    color: #777;
    font-size: 0.85em;
    margin-right: 5px;
  }

  .grid__select {
    display: block;
    height: 2.25em;
    outline: none;
    border: 1px solid #dbdbdb;
    padding-left: 1em;
    padding-right: 2.5em;
    line-height: 1.5;
    box-shadow: none;
    width: 90%;
  }
}
</style>
