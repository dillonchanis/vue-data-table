<template>
  <td :class="classes">
    <template v-if="edit && edit.row === id">
      <input type="text" :value="value" @input="updateValue" />
    </template>
    <template v-else>
      {{ value }}
    </template>
  </td>
</template>

<script>
export default {
  props: {
    id: {
      required: false
    },
    edit: {
      required: false
    },
    value: {
      required: true
    },
    classes: {
      type: [String, Array]
    }
  },
  data () {
    return {
      item: ''
    }
  },
  methods: {
    updateValue (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>
