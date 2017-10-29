<template>
  <div>
    <button class="button button--edit" type="button" @click.prevent="action">
      Export to {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      required: true,
      type: String
    },
    action: {
      required: true,
      type: Function
    }
  }
}
</script>

<style scoped>
div {
  display: inline-flex;
  flex-direction: row;
  margin: 0 10px;
}
</style>
