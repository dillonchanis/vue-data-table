<template>
  <div id="app">
    <h1 class="title">Vue Data Table</h1>

    <grid :columns="columns" with-filter with-grouping :url="url" selectable>
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
  margin: 0 auto;
  max-width: 50em;
  padding: 1em;
}

#app {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #555;
}

a {
  color: #0071b9;
}

.title {
  color: #333;
  font-weight: 300;
  font-size: 2.5em;
  margin-top: 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}

/** TABLE STYLES */

.lunar-table-container {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 1px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px;

  .lunar__grid {
    background-color: #fff;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    border-radius: 2px;
    border-spacing: 0px;

    .grid__head {
      tr {
        height: 56px;
        border-bottom: 1px solid #d8dee9;
      }

      th {
        cursor: pointer;
        text-align: left;
        padding: 0 24px;
        font-weight: 500;
        font-size: 14px;
        white-space: nowrap;
        user-select: none;
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      }
    }

    .grid__body {
      tr {
        will-change: background;
        transition: background 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);

        // &:not(:last-child) {
        //   border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        // }

        &:hover {
          background: rgb(238, 238, 238);
        }
      }

      td {
        height: 48px;
        padding: 0 24px;
        font-weight: 400;
        font-size: 13px;
      }
    }
  }
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
