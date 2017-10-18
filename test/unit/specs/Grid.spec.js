import { mount } from 'vue-test-utils'
import Grid from '../../../src/Grid/Grid'

describe('Grid.js', () => {
  const columns = [
    { label: 'ID', value: 'id' },
    { label: 'Name', value: 'name' },
    { label: 'Email', value: 'email' }
  ]

  const props = {
    url: 'https://jsonplaceholder.typicode.com/comments',
    columns: columns
  }

  it('should have received a URL as a url property', () => {
    const wrapper = mount(Grid, {
      propsData: props
    })

    expect(wrapper.vm.url).toEqual('https://jsonplaceholder.typicode.com/comments')
  })

  it('should have correct aria-label for sorting on column header', () => {
    const wrapper = mount(Grid, {
      propsData: props
    })

    let header = wrapper.find('table th')
    expect(header.hasAttribute('aria-sort', wrapper.vm.sort.order)).toBe(true)

    let lastHeader = wrapper.find('table th:last-child')
    expect(lastHeader.hasAttribute('aria-sort', 'none')).toBe(true)
  })
})
