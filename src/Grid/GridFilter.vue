<template>
  <div class="grid__filter">
    <label class="grid__label" for="filter">Filter</label>
    <input class="grid__input" id="filter" name="filter" type="text" :query="query" @input="updateQuery" />
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
  methods: {
    updateQuery (e) {
      this.query = e.target.value
      this.$emit('input', e.target.value)
    }
  },
  created () {
    this.query = this.filterQuery
  }
}
</script>
