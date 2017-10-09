<template>
  <div class="grid__page-size">
    <select v-model="selected" @change="updateLimit">
      <option v-for="option in limitOptions"
              :key="option"
              :value="option === 'All' ? '' : option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    props: {
      limitOptions: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        selected: this.limitOptions[0]
      }
    },
    methods: {
      updateLimit () {
        this.$emit('change', this.selected)
      }
    }
  }
</script>
