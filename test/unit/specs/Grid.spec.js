import { mount, shallow } from 'vue-test-utils'
import Grid from '../../../src/Grid/Grid'

describe('Grid.js', () => {
  let component
  const columns = [
    { label: 'ID', value: 'id' },
    { label: 'Name', value: 'name' },
    { label: 'Email', value: 'email' }
  ]

  const props = {
    url: 'https://jsonplaceholder.typicode.com/comments',
    columns: columns
  }

  beforeEach(() => {
    component = shallow(Grid, {
      propsData: props
    })
  })

  it('has received a URL as a url property', () => {
    expect(component.vm.url).toEqual('https://jsonplaceholder.typicode.com/comments')
  })

  it('should have correct aria-label for sorting on column header', () => {
    const wrapper = mount(Grid, {
      propsData: props
    })

    console.log(wrapper.find('th'))
  })
})
