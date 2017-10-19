<template>
  <div id="app">
    <h1 class="title">Vue Data Table</h1>

    <grid id="grid1" :columns="columns" :url="url" with-filter with-grouping multi-select editable>
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
      ]
    }
  }
}
</script>

<style lang="scss">
$brand-primary: #0071b9;

* {
  box-sizing: border-box;
}

html, body {
  background: #f8faff;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  max-width: 50em;
  padding: 1em;
  padding-bottom: 5em;
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
  color: $brand-primary;
}

.button {
  background: #fff;
  cursor: pointer;
  color: #333;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  box-shadow: none;
  display: block;
  font-size: 0.9em;
  height: 2.25em;
  padding: 0 12px;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.button {
  &--primary {
    background: $brand-primary;
    will-change: background;
  }

  &--edit {
    border-color: transparent;
    background: lighten($brand-primary, 10%);
    color: #fff;

    &:hover {
      background: lighten($brand-primary, 20%);
    }
  }

  &--save {
    border-color: transparent;
    background: darken(#23d160, 5%);
    color: #fff;
  }
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
  background: #fff;
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

    th,
    td {
      padding: 0 24px;
    }

    .grid__head {
      tr {
        height: 56px;
        border-bottom: 1px solid #d8dee9;
      }

      th {
        cursor: pointer;
        text-align: left;
        font-weight: 500;
        font-size: 14px;
        white-space: nowrap;
        user-select: none;
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
      }
    }

    tbody {
      tr {
        will-change: background;
        transition: background 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);

        &:hover {
          background: rgb(238, 238, 238);
        }
      }

      td {
        height: 48px;
        font-weight: 400;
        font-size: 13px;
      }
    }

    .grouped__header {
      color: #333;
      height: 48px;
      background-color: rgba(0, 0, 0, 0.12);
    }
  }
}

.grid__label {
  color: #777;
  font-size: 0.85em;
  margin-right: 5px;
}

.grid__select {
  display: block;
  height: 2.25em;
  outline: none;
  border: 1px solid #dbdbdb;
  padding-left: 1em;
  padding-right: 2.5em;
  line-height: 1.5;
  box-shadow: none;
  width: 100%;
  background-color: transparent;
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
