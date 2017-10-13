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
  margin-bottom: 6em;
}

pre {
  color: #555;
  background: #eee;
  padding: 1em;
  border-left: 2px solid #0071b9;
  border-bottom: 1px solid #d8dee9;
  overflow-x: auto;
}
</style>
