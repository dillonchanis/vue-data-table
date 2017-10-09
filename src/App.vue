<template>
  <div id="app">
    <!-- <grid :records="records" :columns="columns" /> -->

    <hr>

    <grid :records="records" :columns="columns" with-filter>
      <template slot="records" scope="props">
        <td class="red">{{ props.record.id }}</td>
        <td>{{ props.record.name }}</td>
        <td>{{ props.record.email }}</td>
        <td>{{ props.record.job }}</td>
        <td>{{ props.record.age }}</td>
      </template>
    </grid>
  </div>
</template>

<script>
import Grid from './Grid/Grid'

export default {
  name: 'app',
  components: {
    Grid
  },
  data () {
    return {
      columns: [
        { label: 'ID', value: 'id' },
        { label: 'Name', value: 'name' },
        { label: 'Email', value: 'email' },
        { label: 'Job', value: 'job' },
        { label: 'Age', value: 'age' }
      ],
      records: [
        { id: 1, name: 'Dillon', email: 'dillon@example.com', job: 'Web Developer', age: 25 },
        { id: 2, name: 'John', email: 'john@hotmail.com', job: 'Cashier', age: 17 },
        { id: 3, name: 'Gina', email: 'gina@gmail.com', job: 'Sonographer', age: 24 },
        { id: 4, name: 'Arthur', email: 'art@aol.com', job: 'Police Officer', age: 39 },
        { id: 5, name: 'Jane', email: 'jane@example.com', job: 'Marketing Director', age: 55 }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.red {
  color: red;
}
</style>
