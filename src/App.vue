<template>
  <div id="app">
    <grid :columns="columns" with-filter with-grouping :url="url" multi-select>
      <grid-checkbox />
      <template slot="records" scope="props">
        <grid-column v-model="props.record.id" />
        <grid-column v-model="props.record.name" :parent="props" :edit="props.edit" />
        <grid-column  v-model="props.record.email" :parent="props" :edit="props.edit" />
      </template>
    </grid>
  </div>
</template>

<script>
import Grid from './Grid/Grid'
import GridColumn from './Grid/GridColumn'

export default {
  name: 'app',
  components: {
    Grid,
    GridColumn
  },
  data () {
    return {
      url: 'https://jsonplaceholder.typicode.com/comments',
      columns: [
        { label: 'ID', value: 'id' },
        { label: 'Name', value: 'name' },
        { label: 'Email', value: 'email' }
      ],
      limit: [1, 2, 3, 'All']
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.red {
  color: red;
}

.grouped__header,
table tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.1)
}

table {
  width: 100%;
  margin: 10px auto;
  overflow: hidden;
}

th {
  text-align: left;
}

.table__loader {
  width: 100%;
  height: 2px;
  background: rgba(1, 113, 185, 0.2);
  overflow: hidden;

  &-indicator {
    height: 2px;
    background: rgba(1, 113, 185, 0.8);
    animation: 1.7s infinite loop ease-in-out;
  }
}

@keyframes loop {
  0% {
    transform: translateX(0%);
  }
  50% {
    transform: translateX(55%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
