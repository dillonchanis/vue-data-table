<template>
  <div class="grid__page-size">
    <div class="control">
      <label class="grid__label">Rows Per Page</label>
      <select class="grid__select" v-model="selected" @change="updateLimit">
        <option v-for="option in limitOptions"
                :key="option"
                :value="option === 'All' ? '' : option">
          {{ option }}
        </option>
      </select>
    </div>
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

<style lang="scss" scoped>
.grid__label {
  font-size: 0.75em;
}
.grid__page-size {
  padding: 24px;
  display: flex;
  justify-content: flex-end;

  .grid__select {
    display: inline-block;
    width: initial;
  }
}
</style>
