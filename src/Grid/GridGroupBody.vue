<template>
  <div>
    <ul>
      <li v-for="(arr, key) in records">
        {{ key }}: <br />
        <ul>
          <li v-for="item in arr">
            <template v-for="(value, prop) in item">
              <div>
              <b>{{ prop }}</b> : {{ value }}
              </div>
            </template>
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
