<template>
  <td :class="classes">
    <template v-if="edit && edit === id">
      <input type="text" :value="value" />
    </template>
    <template v-else>
      {{ value }}
    </template>
  </td>
</template>

<script>
export default {
  props: {
    value: {
      required: true
    },
    id: {
      required: true
    },
    edit: {
      required: true
    },
    classes: {
      type: [String, Array]
    }
  }
}
</script>
