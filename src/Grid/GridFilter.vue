<template>
  <div class="grid__filter">
    <label class="sr-only" for="filter">Filter</label>
    <div class="control">
      <input tabindex="0"
             aria-label="Search"
             placeholder="Filter..."
             class="grid__input" id="filter" name="filter" type="text"
             :class="{ 'active': isActive }"
             :query="query"
             @click="isActive = !isActive"
             @blur="isActive = !isActive"
             @input="updateQuery" />
      <i aria-hidden="true" :class="{ 'is-active': isActive }" class="material-icons icon">search</i>
    </div>
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
      query: '',
      isActive: false
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

<style lang="scss" scoped>
.grid__filter {
  display: inline-flex;
  width: 65%;
  align-items: center;
  justify-content: flex-start;
  padding: 1em 24px;

  .control {
    position: relative;
    text-align: left;
    font-size: 1em;
    margin-right: -1px;
  }

  .icon {
    vertical-align: middle;
    font-size: 1.5em;
    color: #dbdbdb;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

    &.is-active {
      color: #0071b9;
    }
  }

  .grid__input {
    display: inline-flex;
    font-size: 1em;
    height: 2.25em;

    align-items: center;
    border: 1px solid transparent;
    border-radius: 0;
    border-bottom: 1px solid #dbdbdb;
  }
}
</style>
