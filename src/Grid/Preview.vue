<template>
  <div v-if="record.length">
    <p>Your selection(s):</p>
    <pre>{{ record | pretty }}</pre>
  </div>
</template>

<script>
export default {
  props: ['record'],
  filters: {
    pretty: json => JSON.stringify(json, null, 4)
  }
}
</script>

<style scoped>
div {
  width: 100%;
  padding: 10px;
  overflow: scroll;
  margin-top: 30px;
  border: 1px solid brown;
}
</style>
