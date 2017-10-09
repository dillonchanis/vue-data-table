<template>
  <div class="grid__filter">
    <label for="filter">Filter</label>
    <input id="filter" name="filter" type="text" v-model="query" />
  </div>
</template>

<script>
export default {
  props: {
    filterQuery: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      query: ''
    }
  },
  watch: {
    'query': function () {
      this.$emit('input', this.query)
    }
  },
  created () {
    this.query = this.filterQuery
  }
}
</script>

<style scoped>
</style>
