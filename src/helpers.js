export const isEmpty = item => item.length <= 0

export const warn = message => {
  console.warn(message)
}

export const createFunctionalComponent = (element = 'div', name, className) => {
  return {
    name,
    functional: true,
    render: (h, {data, children}) => {
      data.staticClass = className

      return h(element, data, children)
    }
  }
}
