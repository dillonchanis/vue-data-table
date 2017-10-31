<template>
  <nav class="pagination__container" aria-label="Data table pagination">
    <ul class="pagination">
      <li class="pagination__item"
          :class="{ 'disabled': pagination.current - 1 === 0 }">
        <a class="pagination__link"
           @click.prevent="switchPage(pagination.current - 1)"
           href="#"
           aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="pagination__item"
        v-for="page in links"
        :key="page"
        :class="{ 'active': pagination.current === page }"
      >
        <a @click.prevent="switchPage(page)"
          class="pagination__link"
          href="#">
          {{ page }}
        </a>
      </li>
      <li class="pagination__item"
          :class="{ 'disabled': pagination.current === totalPages }">
        <a class="pagination__link"
           @click.prevent="switchPage(pagination.current + 1)"
           href="#"
           aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { chunk, last, range } from 'lodash'

  export default {
    name: 'lunar-pagination',
    props: {
      pagination: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        totalPages: 0,
        pageLinks: [],
        chunk: 0
      }
    },
    computed: {
      links () {
        return this.pageLinks[this.chunk]
      }
    },
    created () {
      const totalPages = Number(Math.ceil(this.pagination.total / this.pagination.pageSize))
      this.totalPages = totalPages

      if (totalPages > 5) {
        this.pageLinks = chunk(range(1, totalPages), 5)
      } else {
        this.pageLinks = range(1, totalPages)
      }
    },
    methods: {
      nextChunk () {
        if (this.chunk >= this.pageLinks.length - 1) return
        this.chunk++
      },
      previousChunk () {
        if (this.chunk - 1 < 0) return
        this.chunk--
      },
      switchPage (page) {
        if (page === this.links[0] - 1) {
          this.previousChunk()
        } else if (page === last(this.links) + 1) {
          this.nextChunk()
        }

        this.$emit('pageSwitch', page)
      }
    }
  }
</script>

<style lang="scss" scoped>
.pagination__container {
  display: inline-flex;
  margin-right: 24px;
}

.pagination {
  display: flex;
  padding-left: 0;
  margin-top: 24px;
  border-radius: 4px;
  list-style: none;

  &__item {
    display: list-item;

    &.active .pagination__link {
      z-index: 2;
      color: #fff;
      background-color: #007bff;
      border-color: #007bff;
    }

    &.disabled {
      cursor: not-allowed;

      .pagination__link {
        color: #868e96;
        cursor: not-allowed;
        pointer-events: none;
        background-color: #fff;
        border-color: #ddd;
      }
    }

    &:first-child .pagination__link {
      margin-left: 0;
      border-top-left-radius: .25rem;
      border-bottom-left-radius: .25rem;
    }

    &:last-child .pagination__link {
      border-top-right-radius: .25rem;
      border-bottom-right-radius: .25rem;
    }
  }

  &__link {
    position: relative;
    display: block;
    padding: 2px 8px;
    margin-left: -1px;
    line-height: 1.25;
    color: #007bff;
    background-color: #fff;
    border: 1px solid #ddd;
    text-decoration: none;
  }
}
</style>
