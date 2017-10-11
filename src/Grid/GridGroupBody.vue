<template>
  <div>
    <ul>
      <li v-for="(arr, key) in records" :key="key">
        {{ key }}: <br />
        <ul>
          <li v-for="(item, index) in arr" :key="index">
            <div v-for="(value, prop) in item" :key="value">
              <b>{{ prop }}</b> : {{ value }}
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    records: {
      default: () => []
    }
  }
}
</script>
