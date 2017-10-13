<template>
  <div class="group__list" v-if="group.length">
    <button class="badge" @click="remove">{{ group[0] }} &times;</button>
  </div>
</template>

<script>
export default {
  props: {
    group: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    remove () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.group__list {
  padding: 0 24px;
}

button {
  cursor: pointer;
}

.badge {
  background-color: #0071b9;
  border: none;
  outline: none;
  box-shadow: none;
  color: #fff;
  font-size: 0.8em;
  font-weight: 300;
  min-width: 1.5em;
  text-align: center;
  height: 22px;
  line-height: 22px;
  padding: 0 6px;
  border-radius: 2px;
}
</style>
