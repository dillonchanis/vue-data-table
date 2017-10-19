import * as jsPDF from 'jspdf'
import 'jspdf-autotable'

export const isEmpty = item => item.length <= 0

export const warn = message => {
  console.warn(message)
}

export const exportToCSV = (table, filename, settings) => {
  const csv = []
  const rows = table.querySelectorAll('tr')

  for (let i = 0; i < rows.length; i++) {
    const row = []
    const cols = Array.from(rows[i].querySelectorAll('td, th'))

    if (settings.editable) {
      cols.splice(cols.length - 1, 1)
    }

    if (settings.multiSelect) {
      cols.splice(0, 0)
    }

    for (let j = 0; j < cols.length; j++) {
      row.push(cols[j].innerText)
    }

    csv.push(row.join(','))
  }

  const csvFile = new Blob([csv.join('\n')], {type: 'text/csv'})

  window.location = window.URL.createObjectURL(csvFile)
}

export const exportToPDF = (component, filename) => {
  const document = new jsPDF('p', 'pt') // eslint-disable-line new-cap
  const table = component.querySelector('table')
  const res = document.autoTableHtmlToJson(table)

  document.autoTable(res.columns, res.data, {startY: 20})
  document.save(filename)
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
