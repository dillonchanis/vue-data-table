<template>
  <td :class="classes">
    <template v-if="isEditable">
      <input type="text"
             class="grid__input"
             :value="value"
             @input="updateValue"
             @keydown.esc="parent.grid.clearEdit"
             @keydown.enter="saveValue" />
    </template>
    <template v-else>
      {{ value }}
    </template>
  </td>
</template>

<script>
export default {
  props: {
    classes: {
      type: [String, Array]
    },
    edit: {
      required: false
    },
    parent: {
      required: false
    },
    value: {
      required: true
    }
  },
  computed: {
    isEditable () {
      return this.edit && this.parent && this.edit.row === this.parent.record.id
    }
  },
  methods: {
    updateValue (e) {
      this.$emit('input', e.target.value)
    },
    saveValue () {
      this.parent.grid.saveRow(this.edit.form)
    }
  }
}
</script>

<style scoped>
.column--fixed {
  display: block;
  position: absolute;
  width: 200px;
  overflow: auto;
  box-shadow: 2px 0px 3px 0px #333;
}
</style>
