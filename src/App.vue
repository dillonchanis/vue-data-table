<template>
  <div id="app">
    <grid :columns="apiColumns" with-filter :url="url">
      <template slot="records" scope="props">
        <grid-column class="red" v-model="props.record.id" />
        <grid-column v-model="props.record.name" :edit="props.edit" :id="props.record.id" />
        <grid-column  v-model="props.record.email" :edit="props.edit" :id="props.record.id" />
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
        { label: 'Email', value: 'email' },
        { label: 'Job', value: 'job' },
        { label: 'Age', value: 'age' }
      ],
      apiColumns: [
        { label: 'ID', value: 'id' },
        { label: 'Name', value: 'name' },
        { label: 'Email', value: 'email' }
      ],
      records: [
        { id: 1, name: 'Dillon', email: 'dillon@example.com', job: 'Web Developer', age: 25 },
        { id: 2, name: 'John', email: 'john@hotmail.com', job: 'Cashier', age: 17 },
        { id: 3, name: 'Gina', email: 'gina@gmail.com', job: 'Sonographer', age: 24 },
        { id: 4, name: 'Arthur', email: 'art@aol.com', job: 'Police Officer', age: 39 },
        { id: 5, name: 'Jane', email: 'jane@example.com', job: 'Marketing Director', age: 55 }
      ],
      limit: [1, 2, 3, 'All']
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.red {
  color: red;
}

table tbody tr:hover{
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
